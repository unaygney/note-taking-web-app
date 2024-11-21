import { LockKeyhole, Sun } from 'lucide-react'
import React from 'react'

import { Type } from '@/components/icons'
import SignoutButton from '@/components/signout-button'
import { Separator } from '@/components/ui/separator'
import { SidebarItem } from '@/components/ui/sidebar-item'

export default function SettingsPage() {
  return (
    <div className="flex h-full w-full flex-col gap-1 rounded-t-[12px] bg-white px-4 py-6 dark:bg-neutral-950 lg:hidden">
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
