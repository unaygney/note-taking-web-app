import React from 'react'

export default async function TagIdPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <div>TagIdPage : {id}</div>
}
