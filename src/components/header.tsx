'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import HeaderSearchBar from './header-search-bar'
import { LogoWithText } from './icons'

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getPageTitle = () => {
    const firstPath = pathname?.split('/')[1]
    switch (firstPath) {
      case 'search':
        const query = searchParams?.get('q')
        if (query) {
          return `Showing results for: ${query}`
        }
        return 'Search'
      case 'archived-notes':
        return 'Archived Notes'
      case 'settings':
        return 'Settings'
      case 'tags':
        return 'Tags'
      default:
        return 'All Notes'
    }
  }

  return (
    <header className="h-[54px] w-full border-b border-b-neutral-200 bg-neutral-100 px-4 py-[13px] dark:border-b-neutral-800 dark:bg-neutral-800 md:h-[74px] md:px-8 md:py-[23px] lg:h-[81px] lg:bg-white lg:py-[26px] dark:lg:bg-neutral-950">
      <div className="flex h-full w-full items-center justify-between">
        <Link href={'/'} className="lg:hidden">
          <LogoWithText />
        </Link>
        <h3 className="hidden text-2xl/normal font-bold tracking-[-0.5px] text-neutral-950 dark:text-white lg:block">
          {getPageTitle()}
        </h3>

        {/* Input Area */}
        <HeaderSearchBar />
      </div>
    </header>
  )
}
