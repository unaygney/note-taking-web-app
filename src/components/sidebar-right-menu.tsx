'use client'

import { Archive, RotateCcw, Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from './ui/button'
import { Modal } from './ui/modal'
import { Separator } from './ui/separator'
import { api } from '@/trpc/react'

export default function SidebarRightMenu() {
  const pathname = usePathname()

  const [showDeleteModal, setDeleteModal] = useState(false)
  const [showArchiveModal, setArchiveModal] = useState(false)
  const [showRestoreModal, setRestoreModal] = useState(false)

  const utils = api.useUtils()

  const isArchivePage = pathname.split('/')[1] === 'archived-notes'
  const isTagPage = pathname.split('/')[1] === 'tag' && pathname.split('/')[2]
  const nodeId = isTagPage ? pathname.split('/')[3] : pathname.split('/')[2]

  const updateNote = api.note.update.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate()
    },
  })
  const deleteNote = api.note.delete.useMutation({
    onSuccess: async () => {
      await utils.note.getTags.invalidate()
    },
  })

  const handleDeleteNote = () => {
    if (!nodeId) {
      toast.error('Note not found')
      return
    }
    deleteNote.mutate({ id: nodeId })
    toast.success('Note Deleted!')
    setDeleteModal(false)
  }

  const handleArchiveNote = () => {
    if (!nodeId) {
      toast.error('Note not found')
      return
    }
    updateNote.mutate({ id: nodeId, status: 'archived' })
    toast.success('Note archived')
    setArchiveModal(false)
  }

  const handleRestoreNote = () => {
    if (!nodeId) {
      toast.error('Note not found')
      return
    }
    updateNote.mutate({ id: nodeId, status: 'active' })
    toast.success('Note restored')
    setRestoreModal(false)
  }

  if (pathname === '/all-notes/create') {
    return (
      <div className="hidden h-screen w-[290px] flex-col gap-4 border-l border-l-neutral-200 bg-white px-8 py-5 dark:border-l-neutral-800 dark:bg-[#0e121b] lg:flex"></div>
    )
  }

  return (
    <div className="hidden h-screen w-[290px] flex-col gap-4 border-l border-l-neutral-200 bg-white px-8 py-5 dark:border-l-neutral-800 dark:bg-[#0e121b] lg:flex">
      <div className="flex flex-col gap-3">
        {/* Archive Note Button or Restore Note Button */}
        {isArchivePage ? (
          <Button
            variant="border"
            disabled={!nodeId}
            onClick={() => setRestoreModal(true)}
          >
            <RotateCcw />
            Restore Note
          </Button>
        ) : (
          <Button
            variant="border"
            disabled={!nodeId}
            onClick={() => setArchiveModal(true)}
          >
            <Archive />
            Archive Note
          </Button>
        )}

        {/* Delete Note Button */}
        <Button
          disabled={!nodeId}
          variant="border"
          onClick={() => setDeleteModal(true)}
        >
          <Trash2 />
          Delete Note
        </Button>

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
                  Are you sure you want to restore this note? It will move back
                  to the active notes section.
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
      </div>
    </div>
  )
}
