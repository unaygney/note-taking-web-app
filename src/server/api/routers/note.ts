import { and, eq, like, sql } from 'drizzle-orm'
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
      const noteData = await ctx.db.insert(note).values({
        id: crypto.randomUUID(),
        userId: ctx.user.user.id,
        title: input.title,
        tags: input.tags,
        status: input.status,
        content: input.content ?? '',
      })
      return noteData
    }),

  delete: authProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(note)
        .where(and(eq(note.id, input.id), eq(note.userId, ctx.user.user.id)))
      return { success: true }
    }),

  update: authProcedure
    .input(
      z.object({
        id: z.string().uuid(),
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
        .where(and(eq(note.id, input.id), eq(note.userId, ctx.user.user.id)))

      return updatedNote
    }),

  get: authProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const noteData = await ctx.db
        .select()
        .from(note)
        .where(and(eq(note.id, input.id), eq(note.userId, ctx.user.user.id)))

      return noteData[0]
    }),

  getAll: authProcedure
    .input(
      z.object({
        title: z.string().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(note.userId, ctx.user.user.id)]

      if (input.title) {
        conditions.push(like(note.title, `%${input.title}%`))
      }

      if (input.tags && input.tags.length > 0) {
        conditions.push(
          sql`${note.tags} && ARRAY[${sql.join(input.tags)}]::text[]`
        )
      }

      const notes = await ctx.db
        .select()
        .from(note)
        .where(and(...conditions))

      return notes
    }),

  getTags: authProcedure.query(async ({ ctx }) => {
    const tags = await ctx.db
      .select({
        tag: sql<string>`unnest(${note.tags})`.as('tag'),
      })
      .from(note)
      .where(eq(note.userId, ctx.user.user.id))

    const uniqueTags = [...new Set(tags.map((row) => row.tag))]
    return uniqueTags
  }),
})
