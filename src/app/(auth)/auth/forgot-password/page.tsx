'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'
import {
  type ForgotPasswordFormSchema,
  forgotPasswordFormSchema,
} from '@/lib/validations'

import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: ForgotPasswordFormSchema) {
    const { data, error } = await authClient.forgetPassword({
      email: values.email,
      redirectTo: '/auth/reset-password',
    })

    if (error) {
      toast.error(error.message ?? 'An error occurred')
    }
    if (data) {
      toast.success('Reset link sent successfully. Check your email.')
      form.reset({
        email: '',
      })
    }
  }

  return (
    <div className="w-full max-w-[540px] space-y-4 rounded-[16px] border border-neutral-200 bg-white px-4 py-[48px] text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white md:p-12">
      <AuthHeader
        title="Forgotten your password?"
        subtitle="Enter your email below,and we'll send you a link to reset it."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    autoComplete="emal"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" size={'lg'} type="submit">
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  )
}
