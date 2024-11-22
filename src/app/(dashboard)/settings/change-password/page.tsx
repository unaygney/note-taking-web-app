'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { authClient } from '@/lib/auth-client'

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

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, 'Old password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters'),
    confirmNewPassword: z
      .string()
      .min(8, 'Confirm new password must be at least 8 characters'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New password and confirmation do not match',
    path: ['confirmNewPassword'],
  })

type ChangePasswordFormSchema = z.infer<typeof changePasswordSchema>

export default function SettingsChangePasswordPage() {
  const form = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = async (data: ChangePasswordFormSchema) => {
    const res = await authClient.changePassword({
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    })
    if (res.error) {
      toast.error(res.error.message ?? 'An error occurred')
    }
    if (res.data) {
      toast.success('Password changed successfully!')
      form.reset({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      })
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-base/normal font-semibold text-neutral-950 dark:text-white">
          Change Password
        </h1>
        <p className="text-sm font-normal text-neutral-700 dark:text-white">
          Enter your old password and choose a new one
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-4 lg:max-w-[528px]"
        >
          <div className="flex flex-col gap-4">
            {/* Old Password Field */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your old password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your new password"
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

            {/* Confirm New Password Field */}
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirm your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="ml-auto"
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  )
}
