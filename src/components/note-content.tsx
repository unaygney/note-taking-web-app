'use client'

import {
  Archive,
  ChevronLeft,
  Clock,
  RotateCcw,
  Tag,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { type Note } from '@/server/db/schema'

export default function NoteContent({ note }: { note: Note }) {
  return (
    <div className="flex h-full w-full flex-col">
      <NoteTopHeader />
      <Separator className="my-4 lg:hidden" />
      <div className="flex flex-1 flex-col gap-4 pb-24">
        <h2 className="text-2xl font-bold tracking-[-0.5px] text-neutral-950 dark:text-white">
          {note.title}
        </h2>
        <div className="flex flex-col gap-3 text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center">
            <div className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              <h6 className="min-w-[115px] text-xs font-normal">Tags</h6>
            </div>
            <p className="flex-1 text-xs font-normal capitalize">
              {note?.tags.join(', ')}
            </p>
          </div>
          <div className="flex">
            <div className="flex gap-1.5">
              <Clock className="h-4 w-4" />
              <h6 className="w-[115px] text-xs font-normal">Last edited</h6>
            </div>
            <p className="text-xs font-normal">
              {note.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <Separator className="my-4 text-neutral-200 dark:text-neutral-800" />
        <div className="h-full text-neutral-800 dark:text-neutral-100">
          <Textarea
            value={note.content ?? ''}
            readOnly
            className="h-full resize-none text-sm font-normal"
          />
        </div>
        <div className="mt-4 hidden gap-4 lg:flex">
          <Button>Save Not</Button>
          <Button disabled variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

function NoteTopHeader() {
  const pathname = usePathname()
  const rootPath = pathname.split('/')[1]

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-white pb-3 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 lg:hidden">
      <Link className="inline-flex items-center gap-1" href={`/${rootPath}`}>
        <ChevronLeft className="h-4 w-4" />
        Go Back
      </Link>

      <div className="flex items-center gap-4">
        <button>
          <Trash2 className="h-[18px] w-[18px]" />
        </button>

        {rootPath === 'archived-notes' ? (
          <button>
            <RotateCcw className="h-[18px] w-[18px]" />
          </button>
        ) : (
          <button>
            <Archive className="h-[18px] w-[18px]" />
          </button>
        )}

        <button className="text-sm font-normal">Cancel</button>
        <button className="text-sm font-normal text-blue-500">Save Note</button>
      </div>
    </div>
  )
}
