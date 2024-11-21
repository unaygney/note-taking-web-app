import React from 'react'

import SettingsSidebar from '@/components/settings-sidebar'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full">
      <SettingsSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
