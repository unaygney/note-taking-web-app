'use client'

import { Clock, Tag } from 'lucide-react'
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
  return <div className="flex lg:hidden">note top header</div>
}
