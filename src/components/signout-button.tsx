'use client'

import React from 'react'

import { authClient } from '@/lib/auth-client'

import { Button } from './ui/button'

export default function SignoutButton() {
  const handleSignout = async () => {
    await authClient.signOut()
  }
  return <Button onClick={handleSignout}>Signout</Button>
}
