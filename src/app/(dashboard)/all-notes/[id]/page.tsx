import { notFound } from 'next/navigation'
import React from 'react'

import NoteContent from '@/components/note-content'

import { api } from '@/trpc/server'

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const note = await api.note.get({ id: id })

  if (!note) notFound()

  return (
    <div className="h-full w-full">
      <NoteContent note={note} />
    </div>
  )
}
