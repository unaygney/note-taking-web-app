'use client'

import React from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'

type RadioWithLabelProps = {
  id: string
  label: string
  subLabel?: string
  icon: React.ReactNode
  description?: string
}

export default function RadioWithLabel({
  id,
  label,
  subLabel,
  icon,
  description,
}: RadioWithLabelProps) {
  return (
    <div className="relative flex w-full items-center gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 transition-colors duration-300 has-[[data-state=checked]]:bg-neutral-100 has-[[data-state=checked]]:dark:bg-neutral-800">
      <RadioGroupItem
        id={id}
        value={id}
        aria-describedby={`${id}-description`}
        className="order-1 after:absolute after:inset-0"
      />
      <div className="flex grow items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">
          {icon}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={id}>
            {label}{' '}
            {subLabel && (
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                ({subLabel})
              </span>
            )}
          </Label>
          {description && (
            <p
              id={`${id}-description`}
              className="text-xs text-muted-foreground"
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
