import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full min-h-screen items-center justify-center bg-neutral-100 px-4 dark:bg-neutral-700">
      {children}
    </main>
  )
}
