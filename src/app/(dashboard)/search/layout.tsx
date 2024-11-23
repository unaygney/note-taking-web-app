import React from 'react'

import SidebarNotes from '@/components/sidebar-notes'
import SidebarRightMenu from '@/components/sidebar-right-menu'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full w-full">
      <SidebarNotes />
      <div className="h-screen flex-1 bg-white px-6 py-5 dark:bg-[#0e121b]">
        {children}
      </div>
      <SidebarRightMenu />
    </div>
  )
}
