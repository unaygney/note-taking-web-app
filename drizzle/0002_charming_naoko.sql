CREATE INDEX IF NOT EXISTS "userId_idx" ON "note" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "note" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_gin_idx" ON "note" USING gin ("tags");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "status_idx" ON "note" USING btree ("status");