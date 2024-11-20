import {
  createTRPCRouter,
  publicProcedureWithRateLimit,
} from '@/server/api/trpc'

export const testRouter = createTRPCRouter({
  test: publicProcedureWithRateLimit.query(({ ctx }) => {
    return `Remaining : ${ctx.remainingRequests}`
  }),
})
