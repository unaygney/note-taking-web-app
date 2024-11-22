import React from 'react'

import SettingsSidebar from '@/components/settings-sidebar'

import BackButton from './back-button'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full">
      <SettingsSidebar />

      <div className="flex-1 rounded-t-[12px] bg-white p-8 dark:bg-[#0e121b] lg:rounded-t-none">
        <BackButton />
        {children}
      </div>
    </div>
  )
}
