import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

import { env } from '@/env'

export const redis = new Redis({
  url: env.REDIS_URL,
  token: env.REDIS_TOKEN,
})

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'trpc_rate_limit',
})
