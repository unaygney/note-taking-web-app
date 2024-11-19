'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

import { type LoginFormSchema, loginFormSchema } from '@/lib/validations'

import AuthHeader from '@/components/auth-header'
import SigninGoogleButton from '@/components/signin-google-button'
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
import { PasswordInput } from '@/components/ui/password-input'

export default function LoginPage() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: LoginFormSchema) {
    console.log(values)
  }

  return (
    <div className="w-full max-w-[540px] space-y-4 rounded-[16px] border border-neutral-200 bg-white px-4 py-[48px] text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white">
      <AuthHeader
        title="Welcome to Note"
        subtitle="Please log in to continue"
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
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <p>Password</p>
                  <Link
                    className="text-xs font-normal leading-4 text-neutral-600 underline dark:text-neutral-400"
                    href={'/auth/forgot-password'}
                  >
                    Forgot
                  </Link>
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size={'lg'} className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <SigninGoogleButton />
      <div className="flex justify-center">
        <span className="text-sm font-normal leading-5 tracking-[-0.2px] text-neutral-600 dark:text-neutral-300">
          No account yet?{' '}
          <Link
            className="text-neutral-950 dark:text-white"
            href="/auth/signup"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  )
}
