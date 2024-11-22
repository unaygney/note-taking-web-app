import React from 'react'

import SidebarNotes from '@/components/sidebar-notes'

export default function AllNotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full w-full">
      <SidebarNotes />
      <div className="h-screen flex-1">{children}</div>
    </div>
  )
}
