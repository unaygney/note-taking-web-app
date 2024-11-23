import React from 'react'

import HeaderSearchBar from '@/components/header-search-bar'
import SidebarNotes from '@/components/sidebar-notes'

export default function SearchPage() {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-neutral-950 dark:text-white lg:hidden">
        Search
      </h2>
      <HeaderSearchBar
        className="my-4 flex w-full lg:hidden"
        isShowSettingPage={false}
        inputClassName="w-full"
      />
      <SidebarNotes className="flex w-full border-none px-0 lg:hidden" />
    </div>
  )
}
