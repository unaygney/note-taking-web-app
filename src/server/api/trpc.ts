/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { betterFetch } from '@better-fetch/fetch'
import { TRPCError, initTRPC } from '@trpc/server'
import { type Session } from 'better-auth'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { rateLimiter } from '@/lib/redis'
import { getBaseUrl } from '@/lib/utils'

import { db } from '@/server/db'

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: getBaseUrl(),
      headers: {
        cookie: opts.headers.get('cookie') ?? '',
      },
    }
  )
  return {
    db,
    session,
    ...opts,
  }
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now()

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }

  const result = await next()

  const end = Date.now()
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

  return result
})

/**
 * RATE LIMITING MIDDLEWARE
 *
 * This middleware implements rate limiting using Upstash Redis. It restricts
 * the number of requests a client can make to the API within a specific time window.
 *
 * The middleware uses the client's IP address or a custom identifier for rate limiting.
 * It is useful for preventing abuse and controlling the API usage.
 *
 * Prerequisites:
 * - Redis instance configured with Upstash (https://upstash.com/)
 * - @upstash/redis package installed
 * - Redis initialized and available in the context
 *
 * Example:
 * - Sliding window: 5 requests per minute per client.
 */

const rateLimitMiddleware = t.middleware(async ({ ctx, next, path }) => {
  // Extract client IP from headers (use a fallback if not available)
  const clientIp = ctx.headers.get('x-forwarded-for') ?? 'unknown_client'

  // Check rate limit
  const { success, remaining } = await rateLimiter.limit(clientIp)

  if (!success) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: `Rate limit exceeded for ${path}. Please try again later.`,
    })
  }

  const updatedCtx = {
    ...ctx,
    remainingRequests: remaining,
  }

  return next({
    ctx: updatedCtx,
  })
})

/**
 * AUTHENTICATION MIDDLEWARE
 *
 * This middleware ensures that the procedure is only accessible to authenticated users.
 * It checks if the user is logged in by validating the session or token information.
 *
 * If the user is not authenticated, it throws an error.
 */

const authMiddleware = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource.',
    })
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  })
})

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware)

export const publicProcedureWithRateLimit = publicProcedure
  .use(timingMiddleware)
  .use(rateLimitMiddleware)
export const authProcedure = publicProcedure.use(authMiddleware)
