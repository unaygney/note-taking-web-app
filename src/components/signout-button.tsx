'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'

import { REDIRECT_TIME } from '@/app/config'

import { Button } from './ui/button'

export default function SignoutButton() {
  const router = useRouter()
  const handleSignout = async () => {
    await authClient.signOut()
    toast.success('Signed out successfully. Redirecting...')

    setTimeout(() => {
      router.push('/auth/login')
    }, REDIRECT_TIME)
  }
  return <Button onClick={handleSignout}>Signout</Button>
}
