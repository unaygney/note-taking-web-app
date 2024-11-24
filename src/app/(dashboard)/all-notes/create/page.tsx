import React from 'react'

import NoteEditor from '@/components/note-editor'

export default async function CreatePage() {
  return (
    <div className="h-full w-full text-black">
      <NoteEditor />
    </div>
  )
}
