import {
  authProcedure,
  createTRPCRouter,
  publicProcedureWithRateLimit,
} from '@/server/api/trpc'

export const testRouter = createTRPCRouter({
  test: publicProcedureWithRateLimit.query(({ ctx }) => {
    return `Remaining : ${ctx.remainingRequests}`
  }),
  testauth: authProcedure.query(({ ctx }) => {
    return `User : ${JSON.stringify(ctx.user.user.email)} | Headers : ${JSON.stringify(ctx.headers)}`
  }),
})
