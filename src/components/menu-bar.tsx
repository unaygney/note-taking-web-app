import { ArchiveIcon, Home, Search, Settings, Tag } from 'lucide-react'
import React from 'react'

import MenuItem from './ui/menu-item'

export default function MenuBar() {
  const MENU = [
    {
      href: '/all-notes',
      icon: <Home className="h-4 w-4" />,
      label: 'Home',
    },
    {
      href: '/search',
      icon: <Search className="h-4 w-4" />,
      label: 'Search',
    },
    {
      href: '/archived-notes',
      icon: <ArchiveIcon className="h-4 w-4" />,
      label: 'Archived',
    },
    {
      href: '/tag',
      icon: <Tag className="h-4 w-4" />,
      label: 'Tags',
    },
    {
      href: '/settings',
      icon: <Settings className="h-4 w-4" />,
      label: 'Settings',
    },
  ] as const
  type MenuItem = (typeof MENU)[number]

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-t-neutral-200 bg-white shadow-sm dark:border-t-neutral-800 dark:bg-neutral-950 lg:hidden">
      <div className="flex px-8 py-3">
        {MENU.map((item: MenuItem) => (
          <MenuItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </div>
  )
}
