'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'

import { REDIRECT_TIME } from '@/app/config'

import { Google } from './icons'
import { Button } from './ui/button'

export default function SigninGoogleButton() {
  const router = useRouter()

  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: 'google',
    })
    if (data.error) {
      toast.error(data.error.message ?? 'An error occurred')
    }
    if (data.data?.redirect) {
      toast.success('Sign in successful. Redirecting...')

      setTimeout(() => {
        router.push('/')
      }, REDIRECT_TIME)
    }
  }
  return (
    <div className="flex flex-col items-center gap-4 border-y border-b border-neutral-200 pb-4 pt-6 dark:border-neutral-800">
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Or log in with:
      </p>
      <Button onClick={signIn} variant="border" className="h-[40px] w-full">
        <Google />
        Google
      </Button>
    </div>
  )
}
