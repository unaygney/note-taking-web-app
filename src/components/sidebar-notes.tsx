'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { api } from '@/trpc/react'

export default function SidebarNotes() {
  const pathname = usePathname()
  const [notes] = api.note.getAll.useSuspenseQuery({})

  return (
    <div className="hidden h-screen w-[290px] flex-col gap-4 border-r border-neutral-200 bg-white px-8 py-5 dark:border-neutral-800 dark:bg-[#0e121b] lg:flex">
      <Link
        className={cn(buttonVariants({ variant: 'primary' }))}
        href={'/all-notes/create'}
      >
        + Create New Note
      </Link>
      <ScrollArea className="flex flex-col gap-1 pb-16">
        {notes.map((note, i) => (
          <div key={note.id}>
            <Link
              href={`/all-notes/${note.id}`}
              className={cn('flex w-full flex-col gap-3 rounded-[6px] p-2', {
                'bg-neutral-100 dark:bg-neutral-800':
                  pathname === `/all-notes/${note.id}`,
                'hover:bg-neutral-100 dark:hover:bg-neutral-800':
                  pathname !== `/all-notes/${note.id}`,
              })}
            >
              <h3 className="text-base font-semibold tracking-[-0.3px] text-neutral-950 dark:text-white">
                {note.title}
              </h3>
              <div className="flex gap-1">
                {note.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <p className="text-xs/normal font-normal text-neutral-700 dark:text-neutral-200">
                {note.createdAt.toLocaleDateString()}
              </p>
            </Link>
            {i !== notes.length - 1 && <Separator className="my-1" />}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
