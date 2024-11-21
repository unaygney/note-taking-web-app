import React from 'react'

import VerificationBar from '@/components/verification-bar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      DashboardLayout
      {children}
      <VerificationBar />
    </div>
  )
}
