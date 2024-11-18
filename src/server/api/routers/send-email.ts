import nodemailer from 'nodemailer'
import { z } from 'zod'

import { env } from '@/env'
import {
  createTRPCRouter,
  publicProcedureWithRateLimit,
} from '@/server/api/trpc'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
})

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
    .mutation(async ({ input, ctx }) => {
      const apiKey = ctx.headers.get('x-api-key')

      if (apiKey !== process.env.API_KEY) {
        throw new Error('Unauthorized')
      }

      try {
        const info = await transporter.sendMail({
          from: input.from ?? process.env.EMAIL_USER,
          to: input.to,
          subject: input.subject,
          text: input.text,
        })

        return {
          success: true,
          messageId: info.messageId,
        }
      } catch (error) {
        console.error('Error when sending email:', error)
        throw new Error('Failed to send email')
      }
    }),
})
