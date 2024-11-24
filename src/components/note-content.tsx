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
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from './ui/button'
import { Modal } from './ui/modal'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { type Note } from '@/server/db/schema'
import { api } from '@/trpc/react'

export default function NoteContent({ note }: { note: Note }) {
  const [content, setContent] = useState(note.content ?? '')
  const [originalContent, setOriginalContent] = useState(note.content ?? '')
  const [isEditing, setIsEditing] = useState(false)

  const utils = api.useUtils()

  const handleSave = () => {
    if (content.trim() !== originalContent.trim()) {
      updateNote.mutate({
        id: note.id,
        content,
      })
      setOriginalContent(content)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setContent(originalContent)
    setIsEditing(false)
  }

  const updateNote = api.note.update.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate()
      toast.success('Note updated successfully!')
    },
  })

  return (
    <div className="flex h-full w-full flex-col">
      <NoteTopHeader id={note.id} onCancel={handleCancel} onSave={handleSave} />

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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={() => setIsEditing(true)} // Kullanıcı ilk tıkladığında edit moduna geç
            readOnly={!isEditing} // Sadece edit modunda düzenlenebilir
            placeholder="Start typing your note here..."
            className={`h-full resize-none text-sm font-normal ${
              isEditing ? 'border border-blue-500' : 'border-none'
            }`}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <Button
            onClick={handleSave}
            disabled={!isEditing || content.trim() === originalContent.trim()}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={content.trim() === originalContent.trim()} // Değişiklik yoksa disabled
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

function NoteTopHeader({
  id,
  onSave,
  onCancel,
}: {
  id: string
  onSave: () => void
  onCancel: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  const rootPath = pathname.split('/')[1]

  const [showDeleteModal, setDeleteModal] = useState(false)
  const [showArchiveModal, setArchiveModal] = useState(false)
  const [showRestoreModal, setRestoreModal] = useState(false)

  const utils = api.useUtils()

  const updateNote = api.note.update.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate()
      toast.success('Note updated successfully!')
    },
  })

  const deleteNote = api.note.delete.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate()
      router.push(`/${rootPath}`)
    },
  })

  const handleDeleteNote = () => {
    if (!id) {
      toast.error('Note not found')
      return
    }
    deleteNote.mutate({ id })
    toast.success('Note Deleted!')
    setDeleteModal(false)
  }

  const handleArchiveNote = () => {
    if (!id) {
      toast.error('Note not found')
      return
    }
    updateNote.mutate({ id, status: 'archived' })
    toast.success('Note archived')
    setArchiveModal(false)
  }

  const handleRestoreNote = () => {
    if (!id) {
      toast.error('Note not found')
      return
    }
    updateNote.mutate({ id, status: 'active' })
    toast.success('Note restored')
    setRestoreModal(false)
  }

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-white pb-3 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 lg:hidden">
      <Link className="inline-flex items-center gap-1" href={`/${rootPath}`}>
        <ChevronLeft className="h-4 w-4" />
        Go Back
      </Link>

      <div className="flex items-center gap-4">
        {/* Delete Note Button */}
        <button onClick={() => setDeleteModal(true)}>
          <Trash2 className="h-[18px] w-[18px]" />
        </button>

        {/* Archive or Restore Note Button */}
        {rootPath === 'archived-notes' ? (
          <button onClick={() => setRestoreModal(true)}>
            <RotateCcw className="h-[18px] w-[18px]" />
          </button>
        ) : (
          <button onClick={() => setArchiveModal(true)}>
            <Archive className="h-[18px] w-[18px]" />
          </button>
        )}

        <button className="text-sm font-normal" onClick={onCancel}>
          Cancel
        </button>
        <button className="text-sm font-normal text-blue-500" onClick={onSave}>
          Save Note
        </button>
      </div>

      {/* Delete Note Modal */}
      <Modal
        className="bg-white p-0 dark:bg-neutral-700"
        showModal={showDeleteModal}
        setShowModal={setDeleteModal}
      >
        <div className="flex flex-col p-5">
          <div className="flex gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-neutral-100 dark:bg-neutral-500">
              <Trash2 className="h-6 w-6" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                Delete Note
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Are you sure you want to permanently delete this note? This
                action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <Separator className="mb-4 w-full lg:mb-0" />
        <div className="flex justify-end gap-4 px-5 pb-5">
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteNote}>
            Delete Note
          </Button>
        </div>
      </Modal>

      {/* Archive Note Modal */}
      <Modal
        className="bg-white p-0 dark:bg-neutral-700"
        showModal={showArchiveModal}
        setShowModal={setArchiveModal}
      >
        <div className="flex flex-col p-5">
          <div className="flex gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-neutral-100 dark:bg-neutral-500">
              <Archive className="h-6 w-6" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                Archive Note
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Are you sure you want to archive this note? You can restore it
                later from the archive section.
              </p>
            </div>
          </div>
        </div>

        <Separator className="mb-4 w-full lg:mb-0" />
        <div className="flex justify-end gap-4 px-5 pb-5">
          <Button variant="secondary" onClick={() => setArchiveModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleArchiveNote}>
            Archive Note
          </Button>
        </div>
      </Modal>

      {/* Restore Note Modal */}
      <Modal
        className="bg-white p-0 dark:bg-neutral-700"
        showModal={showRestoreModal}
        setShowModal={setRestoreModal}
      >
        <div className="flex flex-col p-5">
          <div className="flex gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-neutral-100 dark:bg-neutral-500">
              <RotateCcw className="h-6 w-6" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                Restore Note
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Are you sure you want to restore this note? It will move back to
                the active notes section.
              </p>
            </div>
          </div>
        </div>

        <Separator className="mb-4 w-full lg:mb-0" />
        <div className="flex justify-end gap-4 px-5 pb-5">
          <Button variant="secondary" onClick={() => setRestoreModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRestoreNote}>
            Restore Note
          </Button>
        </div>
      </Modal>
    </div>
  )
}
