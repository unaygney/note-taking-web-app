'use client'

import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

import { Input } from '@/components/ui/input'

type PasswordInputProps = React.ComponentProps<typeof Input>

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={`pr-10 ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center px-3"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
        ) : (
          <Eye className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
        )}
      </button>
    </div>
  )
}
