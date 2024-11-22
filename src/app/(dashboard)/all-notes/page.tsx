import React from 'react'

import { api } from '@/trpc/server'

export default async function AllNotesPages() {
  void (await api.note.getAll({}))
  return <div>all notes pagess</div>
}
