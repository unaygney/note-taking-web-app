import React from 'react'

import Header from '@/components/header'
import MenuBar from '@/components/menu-bar'
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
      <div className="flex min-h-screen flex-col bg-neutral-100 text-white dark:bg-neutral-700 lg:h-screen lg:flex-row lg:overflow-hidden">
        <NavigationSidebar />
        <div className="flex-1">
          <Header />
          {children}
        </div>
        <VerificationBar />
        <MenuBar />
      </div>
    </HydrateClient>
  )
}
