import { Tag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Separator } from '@/components/ui/separator'

import { api } from '@/trpc/server'

export default async function TagsPage() {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-neutral-950 dark:text-white lg:hidden">
        Tags
      </h2>
      <Tags />
    </div>
  )
}
async function Tags() {
  const tags = await api.note.getTags()
  return (
    <div className="flex flex-col lg:hidden">
      {tags?.length > 0 &&
        tags?.map((tag, i) => (
          <div key={tag} className="flex flex-col gap-1">
            <Link
              href={`/tag/${tag}`}
              key={tag}
              className="flex items-center gap-2 py-3 text-neutral-700 dark:text-neutral-300"
            >
              <Tag className="h-4 w-4" />
              <p className="text-sm font-medium capitalize">{tag}</p>
            </Link>
            {tags.length - 1 !== i && <Separator />}
          </div>
        ))}
    </div>
  )
}
