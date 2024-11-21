import React from 'react'

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const tag = (await params).tag
  return <div>Tag Page : {tag}</div>
}
