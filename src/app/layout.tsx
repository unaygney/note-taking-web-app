import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'

import { cn } from '@/lib/utils'

import { env } from '@/env'
import '@/styles/globals.css'
import { TRPCReactProvider } from '@/trpc/react'

export const metadata: Metadata = {
  title: 'Note Taking Web App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable}`}>
      <body
        className={cn('antialiased', {
          'debug-screens': env.NODE_ENV === 'development',
        })}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}