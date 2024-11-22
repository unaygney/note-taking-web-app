'use client'

import { Search, Settings } from 'lucide-react'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
import React from 'react'

import { Input } from './ui/input'

export default function HeaderSearchBar() {
  const [search, setSearch] = useQueryState('search')
  return (
    <div className="hidden items-center gap-4 lg:flex">
      <div className="relative w-[300px]">
        <Input
          value={search ?? ''}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 text-neutral-950 dark:text-white"
          placeholder="Search by title, content, or tags..."
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
      </div>
      <Link href={'/settings'}>
        <Settings className="h-6 w-6 text-neutral-400" />
      </Link>
    </div>
  )
}
