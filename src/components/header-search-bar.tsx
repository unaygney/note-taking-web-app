'use client'

import { Search, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { cn } from '@/lib/utils'

import { Input } from './ui/input'

export default function HeaderSearchBar({
  className,
  isShowSettingPage = true,
  inputClassName,
}: {
  className?: string
  isShowSettingPage?: boolean
  inputClassName?: string
}) {
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search) {
      router.push(`/search?q=${search}`)
    }
  }
  const handleSearchClick = () => {
    if (debouncedSearch) {
      router.push(`/search?q=${debouncedSearch}`)
    }
  }

  return (
    <div className={cn('hidden items-center gap-4 lg:flex', className)}>
      <div className={cn('relative w-[300px]', inputClassName)}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 text-neutral-950 dark:text-white"
          placeholder="Search by title, content, or tags..."
        />
        <button
          onClick={handleSearchClick}
          className="absolute left-3 top-1/2 -translate-y-1/2 transform"
        >
          <Search className="h-5 w-5 text-neutral-400" />
        </button>
      </div>
      {isShowSettingPage && (
        <Link href={'/settings'}>
          <Settings className="h-6 w-6 text-neutral-400" />
        </Link>
      )}
    </div>
  )
}
