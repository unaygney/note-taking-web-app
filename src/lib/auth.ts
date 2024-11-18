import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@/server/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    //   sendResetPassword: async (user, url) => {
    //     await fetch(`${baseUrl}/api/send-email`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key': process.env.API_KEY as string,
    //       },
    //       body: JSON.stringify({
    //         to: user.email,
    //         subject: 'Reset your password',
    //         text: `Click the link to reset your password: ${url}`,
    //       }),
    //     })
    //   },
  },
})
