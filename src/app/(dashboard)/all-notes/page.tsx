import React from 'react'

import SidebarNotes from '@/components/sidebar-notes'

export default async function AllNotesPages() {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-neutral-950 dark:text-white lg:hidden">
        All Notes
      </h2>
      <SidebarNotes className="flex w-full border-none px-0 lg:hidden" />
    </div>
  )
}
