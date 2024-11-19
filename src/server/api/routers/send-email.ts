/* eslint-disable */
import { z } from 'zod'

import { env } from '@/env'
import {
  createTRPCRouter,
  publicProcedureWithRateLimit,
} from '@/server/api/trpc'

interface SendEmailResponse {
  messageId: string
  success: boolean
}

export const sendEmailRouter = createTRPCRouter({
  send: publicProcedureWithRateLimit
    .input(
      z.object({
        to: z.string().email(),
        subject: z.string().min(1),
        text: z.string().min(1),
        from: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await fetch('http://localhost:3000/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.EMAIL_API_KEY,
          },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error('Failed to send email')
        }

        const data = await response.json()

        return {
          success: true,
          messageId: data.messageId,
        }
      } catch (error) {
        console.error('Error when sending email:', error)
        throw new Error('Failed to send email')
      }
    }),
})
/* eslint-enable */
