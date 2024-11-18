import React from 'react'

import { LogoWithText } from './icons'

export default function AuthHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <LogoWithText />
      <h1 className="mb-2 mt-4 text-2xl font-bold leading-7 tracking-[-0.5px] text-neutral-950 dark:text-white">
        {title}
      </h1>
      <h3 className="text-sm/4 font-normal tracking-[-0.2px] text-neutral-600">
        {subtitle}
      </h3>
    </div>
  )
}
