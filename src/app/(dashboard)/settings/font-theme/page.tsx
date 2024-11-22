'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { Monospace, SansSerif, Serif } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup } from '@/components/ui/radio-group'
import RadioWithLabel from '@/components/ui/radio-with-label'

import { useFont } from '@/context/font-context'

const fontThemeSchema = z.object({
  fontTheme: z.enum(['sans-serif', 'serif', 'monospace']),
})

type FontThemeFormSchema = z.infer<typeof fontThemeSchema>

export default function SettingsFontThemePage() {
  const { fontTheme, setFontTheme } = useFont()

  const form = useForm<FontThemeFormSchema>({
    resolver: zodResolver(fontThemeSchema),
    defaultValues: {
      fontTheme: fontTheme,
    },
  })

  useEffect(() => {
    form.setValue('fontTheme', fontTheme)
  }, [fontTheme, form])

  const onSubmit = async (data: FontThemeFormSchema) => {
    setFontTheme(data.fontTheme)
    toast.success(`Font theme set to ${data.fontTheme}`)
    window.location.reload()
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-base/normal font-semibold text-neutral-950 dark:text-white">
          Font Theme
        </h1>
        <p className="text-sm font-normal text-neutral-700 dark:text-white">
          Choose your font theme
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-4 lg:max-w-[528px]"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="fontTheme"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-4"
                    >
                      <RadioWithLabel
                        id="sans-serif"
                        label="Sans Serif"
                        description="Clean and modern, easy to read."
                        icon={<SansSerif />}
                      />
                      <RadioWithLabel
                        id="serif"
                        label="Serif"
                        subLabel="Classic and elegant"
                        description="Classic and elegant for a timeless feel."
                        icon={<Serif />}
                      />
                      <RadioWithLabel
                        id="monospace"
                        label="Monospace"
                        description="Code-like, great for a technical vibe."
                        icon={<Monospace />}
                      />
                    </RadioGroup>
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
