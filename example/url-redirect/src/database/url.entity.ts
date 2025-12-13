import { sql } from 'drizzle-orm';
import { integer, text, pgTable } from 'drizzle-orm/pg-core';

export const urls = pgTable('urls', {
  id: integer('id').primaryKey(),
  target: text('target').notNull(),
  slug: text('slug').unique().notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type UrlEntity = typeof urls;

export type CreateUrl = typeof urls.$inferInsert;

export type SelectUrl = typeof urls.$inferSelect;
