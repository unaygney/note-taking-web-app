'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export function SidebarItem({
  icon,
  text,

  href,
}: {
  icon?: React.ReactNode
  text: string
  href: string
}) {
  const pathname = usePathname()

  const isActive = pathname === href
  return (
    <Link
      prefetch={true}
      href={href}
      className={cn('flex items-center gap-2 rounded-[8px] px-3 py-2.5', {
        'bg-neutral-100 dark:bg-neutral-800': isActive,
      })}
    >
      {icon && (
        <span
          className={cn('inline-flex h-5 w-5 items-center justify-center', {
            'text-blue-500': isActive,
          })}
        >
          {icon}
        </span>
      )}
      <p className="flex-1 capitalize">{text}</p>
      {isActive && (
        <span>
          <ChevronRight className="h-4 w-4 text-blue-500" />
        </span>
      )}
    </Link>
  )
}
