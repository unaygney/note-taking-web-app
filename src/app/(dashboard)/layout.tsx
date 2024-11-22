import React from 'react'

import NavigationSidebar from '@/components/navigation-sidebar'
import VerificationBar from '@/components/verification-bar'

import { HydrateClient } from '@/trpc/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HydrateClient>
      <div className="flex h-screen flex-col bg-neutral-100 text-white dark:bg-neutral-700 lg:flex-row">
        <NavigationSidebar />
        <div className="flex-1">
          <header className="w h-10 border">header</header>
          {children}
        </div>
        <VerificationBar />
      </div>
    </HydrateClient>
  )
}
