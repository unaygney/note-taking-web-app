import { LockKeyhole, Sun } from 'lucide-react'
import React from 'react'

import { Type } from './icons'
import SignoutButton from './signout-button'
import { Separator } from './ui/separator'
import { SidebarItem } from './ui/sidebar-item'

export default function SettingsSidebar() {
  return (
    <div className="hidden h-[calc(100vh-40px)] w-[272px] flex-col border-r border-neutral-200 bg-white py-5 pl-8 pr-4 text-neutral-700 dark:border-r-neutral-800 dark:bg-[#0e121b] dark:text-neutral-200 lg:flex">
      <div className="flex flex-col gap-1">
        <SidebarItem
          href="/settings/color-theme"
          text="Color Theme"
          icon={<Sun />}
        />
        <SidebarItem
          href="/settings/font-theme"
          text="Font Theme"
          icon={<Type />}
        />
        <SidebarItem
          href="/settings/change-password"
          text="Change Password"
          icon={<LockKeyhole />}
        />
        <Separator className="my-2" />
        <SignoutButton />
      </div>
    </div>
  )
}
