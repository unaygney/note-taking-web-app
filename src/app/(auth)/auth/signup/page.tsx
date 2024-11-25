'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'
import { type SignupFormSchema, signupFormSchema } from '@/lib/validations'

import AuthHeader from '@/components/auth-header'
import SigninGoogleButton from '@/components/signin-google-button'
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
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

export default function SignupPage() {
  const router = useRouter()

  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SignupFormSchema) {
    const { data, error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: '',
    })

    if (error) {
      toast.error(error.message ?? 'An error occurred')
    }

    if (data) {
      toast.success('Account created successfully. Redirecting...')
      await authClient.sendVerificationEmail({
        email: values.email,
        callbackURL: '/',
      })
      router.push('/')
    }
  }

  return (
    <div className="w-full max-w-[540px] space-y-4 rounded-[16px] border border-neutral-200 bg-white px-4 py-[48px] text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white md:p-12">
      <AuthHeader
        title="Create Your Account"
        subtitle="Sign up to start organizing your notes and boost your productivity."
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
          <Button size={'lg'} className="w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
      <SigninGoogleButton />
      <div className="flex justify-center">
        <span className="text-sm font-normal leading-5 tracking-[-0.2px] text-neutral-600 dark:text-neutral-300">
          Already have an account?
          <Link className="text-neutral-950 dark:text-white" href="/auth/login">
            Login
          </Link>
        </span>
      </div>
    </div>
  )
}
