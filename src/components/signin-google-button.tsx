'use client'

import React from 'react'

import { Google } from './icons'
import { Button } from './ui/button'

export default function SigninGoogleButton() {
  return (
    <div className="flex flex-col items-center gap-4 border-y border-b border-neutral-200 pb-4 pt-6 dark:border-neutral-800">
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Or log in with:
      </p>
      <Button variant="border" className="h-[40px] w-full">
        <Google />
        Google
      </Button>
    </div>
  )
}
