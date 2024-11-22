'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

export default function MenuItem({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-8 flex-1 items-center justify-center bg-white transition-colors duration-300 dark:bg-neutral-950 md:h-[50px] md:py-1',
        { 'rounded-[4px] bg-blue-50 dark:bg-blue-50': isActive }
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <span
          className={cn('text-neutral-600', {
            'text-blue-500 dark:text-blue-500': isActive,
          })}
        >
          {icon}
        </span>
        <h6
          className={cn(
            'hidden text-xs/normal font-normal tracking-[-0.2px] text-neutral-600 dark:text-neutral-400 md:block',
            { 'text-blue-500 dark:text-blue-500': isActive }
          )}
        >
          {label}
        </h6>
      </div>
    </Link>
  )
}
