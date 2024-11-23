ALTER TABLE "account" ADD COLUMN "accessTokenExpiresAt" timestamp;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "refreshTokenExpiresAt" timestamp;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "scope" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "createdAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "updatedAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "token" text NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "createdAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "updatedAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "expiresAt";--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_token_unique" UNIQUE("token");