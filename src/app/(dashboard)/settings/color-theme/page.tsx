'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eclipse, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

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

const colorThemeSchema = z.object({
  colorTheme: z.enum(['light', 'dark', 'system']),
})

type ColorThemeFormSchema = z.infer<typeof colorThemeSchema>

export default function SettingsColorThemePage() {
  const { setTheme, theme } = useTheme()

  const [clientTheme, setClientTheme] = useState<string | undefined>(undefined)

  const form = useForm<ColorThemeFormSchema>({
    resolver: zodResolver(colorThemeSchema),
    defaultValues: {
      colorTheme: theme as 'light' | 'dark' | 'system' | undefined,
    },
  })

  const onSubmit = async (data: ColorThemeFormSchema) => {
    setTheme(data.colorTheme)
    toast.success('Theme updated successfully')
  }

  useEffect(() => {
    setClientTheme(theme)
  }, [theme])

  if (clientTheme === undefined) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-base/normal font-semibold text-neutral-950 dark:text-white">
          Color Theme
        </h1>
        <p className="text-sm font-normal text-neutral-700 dark:text-white">
          Choose your color theme
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
              name="colorTheme"
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
                        id="light"
                        label="Light Mode"
                        description="Pick a clean and classic light theme"
                        icon={<Sun />}
                      />
                      <RadioWithLabel
                        id="dark"
                        label="Dark Mode"
                        description="Select a sleek and modern dark theme"
                        icon={<Eclipse />}
                      />
                      <RadioWithLabel
                        id="system"
                        label="System"
                        description="Adapts to your device’s theme"
                        icon={<SunMoon />}
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
            Apply Changes
          </Button>
        </form>
      </Form>
    </div>
  )
}
