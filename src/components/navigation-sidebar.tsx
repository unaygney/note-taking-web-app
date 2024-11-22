import { ArchiveIcon, Home, Tag } from 'lucide-react'
import React from 'react'

import { LogoWithText } from './icons'
import { ScrollArea } from './ui/scroll-area'
import { SidebarItem } from './ui/sidebar-item'
import { api } from '@/trpc/server'

export default async function NavigationSidebar() {
  const tags = await api.note.getTags()

  return (
    <section
      id="navigation-sidebar"
      className="hidden w-[272px] flex-col gap-4 border-r border-neutral-200 bg-white px-4 py-3 text-neutral-700 dark:border-r-neutral-800 dark:bg-[#0e121b] dark:text-neutral-200 lg:flex"
    >
      <NavigationHeader />
      <TopItems />
      <Tags tags={tags} />
    </section>
  )
}

function NavigationHeader() {
  return (
    <div className="py-3">
      <LogoWithText />
    </div>
  )
}

function TopItems() {
  return (
    <div className="flex flex-col gap-1 border-b border-b-neutral-200 pb-2 dark:border-b-neutral-800">
      <SidebarItem icon={<Home />} text="All Notes" href="/all-notes" />
      <SidebarItem
        icon={<ArchiveIcon />}
        text="Archived Notes"
        href="/archived-notes"
      />
    </div>
  )
}
function Tags({ tags }: { tags: string[] }) {
  return tags.length < 1 ? null : (
    <div className="flex h-full max-h-[436px] flex-col gap-1 py-2">
      <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
        Tags
      </h3>
      <ScrollArea className="flex flex-col gap-1">
        {tags.map((tag, index) => (
          <SidebarItem
            key={index}
            text={tag}
            icon={<Tag />}
            href={`/tag/${tag}`}
          />
        ))}
      </ScrollArea>
    </div>
  )
}
