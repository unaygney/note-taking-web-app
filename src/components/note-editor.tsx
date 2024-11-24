'use client'

import { ChevronLeft, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { api } from '@/trpc/react'

export default function NoteEditor() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')

  const router = useRouter()

  const utils = api.useUtils()
  const createNote = api.note.create.useMutation({
    onSuccess: async (data) => {
      await utils.note.invalidate()
      await utils.note.getTags.invalidate()
      await utils.note.getAll.invalidate()
      await utils.note.getTags.fetch()
      toast.success('Note saved successfully!')
      router.push(`/all-notes/${data?.id}`)
    },
  })

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required!')
      return
    }

    const tagsArray = tags.split(',').map((tag: string) => tag.trim())

    createNote.mutate({
      title,
      tags: tagsArray,
      content,
    })
  }

  const handleCancel = () => {
    setTitle('')
    setTags('')
    setContent('')
    toast.success('Changes discarded.')
  }

  return (
    <div className="flex h-full w-full flex-col">
      <NoteTopHeader onCancel={handleCancel} onSave={handleSave} />
      <Separator className="my-4 lg:hidden" />
      <div className="flex flex-1 flex-col gap-4 pb-24">
        {/* Title */}
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title..."
          className="border-none px-0 font-bold tracking-[-0.5px] shadow-none placeholder:text-2xl/7 placeholder:text-neutral-950 dark:text-white dark:placeholder:text-white"
        />

        {/* Tags */}
        <div className="flex flex-col gap-3 text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center">
            <div className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              <h6 className="text-xs font-normal">Tags</h6>
            </div>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags separated by commas (e.g. Work,Planning)"
              className="flex-1 border-none text-base font-normal capitalize shadow-none"
            />
          </div>
          {/* Last Edited */}

          <div className="flex">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <h6 className="w-[115px] text-xs font-normal">Last edited</h6>
            </div>
            <p className="text-sm font-normal text-neutral-400">
              Not yet saved
            </p>
          </div>
        </div>

        <Separator className="my-4 text-neutral-200 dark:text-neutral-800" />

        {/* Content */}
        <div className="h-full text-neutral-800 dark:text-neutral-100">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your note here..."
            className="h-full resize-none text-sm font-normal"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 hidden gap-4 lg:flex">
          <Button onClick={handleSave}>Save Note</Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

function NoteTopHeader({
  onCancel,
  onSave,
}: {
  onCancel: () => void
  onSave: () => void
}) {
  const pathname = usePathname()

  const rootPath = pathname.split('/')[1]

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-white pb-3 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 lg:hidden">
      <Link className="inline-flex items-center gap-1" href={`/${rootPath}`}>
        <ChevronLeft className="h-4 w-4" />
        Go Back
      </Link>
      <div className="flex items-center gap-4">
        {/* Cancel Button */}
        <button
          className="text-sm text-neutral-600 dark:text-neutral-300"
          onClick={onCancel}
        >
          Cancel
        </button>

        {/* Save Note Button */}
        <button className="text-sm text-blue-500" onClick={onSave}>
          Save Note
        </button>
      </div>
    </div>
  )
}
