import React from 'react'

export default async function ArhivedNoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <div>ArhivedNoteDetailPage id : {id}</div>
}
