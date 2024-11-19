import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
})
export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    rePassword: z.string().min(8, {
      message: 'Password confirmation must be at least 8 characters long',
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    message: 'Passwords must match',
  })

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>
export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>
export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type SignupFormSchema = z.infer<typeof signupFormSchema>
