'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'
import {
  type ResetPasswordFormSchema,
  resetPasswordFormSchema,
} from '@/lib/validations'

import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'

import { REDIRECT_TIME } from '@/app/config'

export default function ResetPasswordPage() {
  const router = useRouter()

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      rePassword: '',
    },
  })

  async function onSubmit(values: ResetPasswordFormSchema) {
    const { data, error } = await authClient.resetPassword({
      newPassword: values.password,
    })

    if (error) {
      toast.error(error.message ?? 'An error occurred')
    }
    if (data) {
      toast.success('Password reset successfully')
      form.reset({
        password: '',
        rePassword: '',
      })

      setTimeout(() => {
        router.push('/auth/login')
      }, REDIRECT_TIME)
    }
  }

  return (
    <div className="w-full max-w-[540px] space-y-4 rounded-[16px] border border-neutral-200 bg-white px-4 py-[48px] text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white">
      <AuthHeader
        title="Reset Your Password"
        subtitle="Choose a new password to secure your account."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* For w3c standarts */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            value=""
            aria-hidden="true"
            hidden
            readOnly
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="New Password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-1">
                  <Info className="h-3 w-3 text-neutral-600" />
                  At least 8 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Passowrd</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="new-password"
                    placeholder="Confirm New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size={'lg'} className="w-full" type="submit">
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  )
}
