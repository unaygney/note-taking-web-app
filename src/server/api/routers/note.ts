import { and, eq, ilike, sql } from 'drizzle-orm'
import { z } from 'zod'

import { authProcedure, createTRPCRouter } from '@/server/api/trpc'
import { note } from '@/server/db/schema'

export const noteRouter = createTRPCRouter({
  create: authProcedure
    .input(
      z.object({
        title: z.string().min(1),
        tags: z.array(z.string()).default([]),
        status: z.enum(['archived', 'active']).default('active'),
        content: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const noteData = await ctx.db
        .insert(note)
        .values({
          id: crypto.randomUUID(),
          userId: ctx.session.userId,
          title: input.title,
          tags: input.tags,
          status: input.status,
          content: input.content ?? '',
        })
        .returning()
      return noteData[0]
    }),

  delete: authProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(note)
        .where(and(eq(note.id, input.id), eq(note.userId, ctx.session.userId)))
      return { success: true }
    }),

  update: authProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        tags: z.array(z.string()).optional(),
        status: z.enum(['archived', 'active']).optional(),
        content: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedNote = await ctx.db
        .update(note)
        .set({
          ...(input.title && { title: input.title }),
          ...(input.tags && { tags: input.tags }),
          ...(input.status && { status: input.status }),
          ...(input.content && { content: input.content }),
          updatedAt: new Date(),
        })
        .where(and(eq(note.id, input.id), eq(note.userId, ctx.session.userId)))

      return updatedNote
    }),

  get: authProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const noteData = await ctx.db
        .select()
        .from(note)
        .where(and(eq(note.id, input.id), eq(note.userId, ctx.session.userId)))

      return noteData[0]
    }),

  getAll: authProcedure
    .input(
      z.object({
        title: z.string().optional(),
        tags: z.array(z.string()).optional(),
        content: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [
        eq(note.userId, ctx.session.userId),
        eq(note.status, 'active'),
      ]

      if (input.title) {
        conditions.push(ilike(note.title, `%${input.title.toLowerCase()}%`))
      }

      if (input.tags && input.tags.length > 0) {
        conditions.push(
          sql`${note.tags} && ARRAY[${sql.join(input.tags)}]::text[]`
        )
      }

      if (input.content) {
        conditions.push(ilike(note.content, `%${input.content.toLowerCase()}%`))
      }

      const notes = await ctx.db
        .select()
        .from(note)
        .where(and(...conditions.filter(Boolean)))

      return notes
    }),

  getTags: authProcedure.query(async ({ ctx }) => {
    const tags = await ctx.db
      .select({
        tag: sql<string>`unnest(${note.tags})`.as('tag'),
      })
      .from(note)
      .where(eq(note.userId, ctx.session.userId))

    const uniqueTags = [...new Set(tags.map((row) => row.tag))]
    return uniqueTags
  }),

  getArchived: authProcedure.query(async ({ ctx }) => {
    const archivedNotes = await ctx.db
      .select()
      .from(note)
      .where(
        and(eq(note.userId, ctx.session.userId), eq(note.status, 'archived'))
      )

    return archivedNotes
  }),
})
