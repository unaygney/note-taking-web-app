'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { api } from '@/trpc/react'

export default function SidebarNotes({ className }: { className?: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get('q') ?? undefined

  const rootPage = pathname.split('/')[1]
  const isArchivedPage = rootPage === 'archived-notes'
  const isTagPage = rootPage === 'tag'
  const isSearchPage = rootPage === 'search'
  const tag = isTagPage ? pathname.split('/')[2] : undefined

  const tags = tag ? [tag] : undefined

  const [notes] = isSearchPage
    ? api.note.getAll.useSuspenseQuery()
    : isArchivedPage
      ? api.note.getArchived.useSuspenseQuery()
      : api.note.getAll.useSuspenseQuery()

  return (
    <div
      className={cn(
        'hidden h-screen w-[290px] flex-col gap-4 border-r border-neutral-200 bg-white px-8 py-5 dark:border-neutral-800 dark:bg-[#0e121b] lg:flex',
        className
      )}
    >
      {/* Desktop Create New Note */}
      <Link
        className={cn(
          buttonVariants({ variant: 'primary' }),
          'hidden lg:inline-flex'
        )}
        href={`/all-notes/create`}
      >
        + Create New Note
      </Link>
      {/* Mobile Create New Note */}
      <Link
        className={cn(
          buttonVariants({ variant: 'primary', size: 'icon' }),
          'fixed bottom-[106px] right-[45px] z-20 h-16 w-16 shrink-0 rounded-full lg:hidden'
        )}
        href={`/all-notes/create`}
      >
        <Plus />
      </Link>

      <Description />

      <ScrollArea className="flex flex-col gap-1 pb-16">
        {notes.length === 0 ? (
          <EmptySidebarNotes />
        ) : (
          notes.map((note, i) => (
            <div key={note.id}>
              <Link
                prefetch={true}
                href={
                  isTagPage
                    ? `/tag/${tag}/${note.id}`
                    : `/${rootPage}/${note.id}`
                }
                className={cn('flex w-full flex-col gap-3 rounded-[6px] p-2', {
                  'bg-neutral-100 dark:bg-neutral-800':
                    pathname ===
                    (isTagPage
                      ? `/tag/${tag}/${note.id}`
                      : `/${rootPage}/${note.id}`),
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800':
                    pathname !==
                    (isTagPage
                      ? `/tag/${tag}/${note.id}`
                      : `/${rootPage}/${note.id}`),
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
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </Link>
              {i !== notes.length - 1 && <Separator className="my-1" />}
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  )
}
function EmptySidebarNotes() {
  const pathname = usePathname().split('/')[1]

  let message = 'No notes found'

  if (pathname === 'all-notes') {
    message =
      'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.'
  } else if (pathname === 'archived-notes') {
    message =
      'No notes have been archived yet. Move notes here for safekeeping, or create a new note.'
  } else if (pathname === 'search') {
    message =
      'No notes match your search. Try a different keyword or create a new note.'
  } else if (pathname === 'tag') {
    message =
      'No notes are tagged yet. Add tags to organize your notes or create a new note with tags.'
  }

  return (
    <div className="w-full rounded-[8px] border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-800">
      <p className="text-sm font-normal text-neutral-950 dark:text-white">
        {message}
      </p>
    </div>
  )
}

function Description() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const rootPage = pathname.split('/')[1]
  const tag = rootPage === 'tag' ? pathname.split('/')[2] : undefined
  const query = searchParams.get('q')

  let message = ''

  if (rootPage === 'archived-notes') {
    message =
      'All your archived notes are stored here. You can restore or delete them anytime.'
  } else if (rootPage === 'tag' && tag) {
    message = `All notes with the “${tag}” tag are shown here.`
  } else if (rootPage === 'search' && query) {
    message = `All notes matching the search term “${query}” are shown here.`
  }

  if (!message) {
    return null
  }

  return (
    <p className="text-sm font-normal tracking-[-0.2px] text-neutral-700 dark:text-neutral-200">
      {message}
    </p>
  )
}
