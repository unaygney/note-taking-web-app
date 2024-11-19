import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { env } from '@/env'
import { db } from '@/server/db'
import { api } from '@/trpc/server'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    /* eslint-disable @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions */
    sendResetPassword: async (user, url) => {
      await api.email.send({
        from: env.EMAIL_USER,
        subject: 'Reset your password',
        to: user.user.email,
        text: `Click the link to reset your password: ${url}`,
      })
    },
    minPasswordLength: 8,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await api.email.send({
        from: env.EMAIL_USER,
        subject: 'Verify your email',
        to: user.email,
        text: `Click the link to verify your email: ${url}`,
      })
    },
  },
})

export const isRequestedAuthPage = (pathname: string) => {
  const authPages = [
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/reset-password',
  ]
  return authPages.some((page) => pathname.startsWith(page))
}
export const securedPages = (pathname: string) => {
  const securedPaths = ['/dashboard', '/profile', '/settings', '/']
  return securedPaths.some((page) => pathname.startsWith(page))
}
