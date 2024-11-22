import React from 'react'

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return <div className="h-full w-full">NoteDetailPage : {id} </div>
}
