import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator(
  (name) => `note-taking-web-app_${name}`
)

export const posts = createTable(
  'post',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    name: varchar('name', { length: 256 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index('name_idx').on(example.name),
  })
)

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const userRelations = relations(user, ({ many }) => ({
  notes: many(note),
}))

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  expiresAt: timestamp('expiresAt'),
  password: text('password'),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
})
export const noteStatusEnum = pgEnum('note_status', ['archived', 'active'])

export const note = pgTable(
  'note',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id),
    title: varchar('title', { length: 256 }).notNull(),
    tags: text('tags')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    status: noteStatusEnum('status').notNull().default('active'),
    content: text('content'),
    createdAt: timestamp('createdAt')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updatedAt')
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  },
  (note) => ({
    userIdIndex: index('userId_idx').on(note.userId),
    titleIndex: index('title_idx').on(note.title),
    tagsGinIndex: index('tags_gin_idx').using('gin', sql`${note.tags}`),
    statusIndex: index('status_idx').on(note.status),
  })
)

export const noteRelations = relations(note, ({ one }) => ({
  user: one(user, {
    fields: [note.userId],
    references: [user.id],
  }),
}))
