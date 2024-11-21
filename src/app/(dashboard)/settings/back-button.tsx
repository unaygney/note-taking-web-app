'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function BackButton() {
  const pathname = usePathname()

  if (pathname === '/settings') {
    return null
  }

  return (
    <div className="w-full pb-4 lg:hidden">
      <Link
        className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-white"
        href={'/settings'}
      >
        <ChevronLeft className="h-4 w-4" />
        Settings
      </Link>
    </div>
  )
}
