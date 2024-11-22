'use client'

import Cookies from 'js-cookie'
import React, { createContext, useContext, useEffect, useState } from 'react'

type FontContextType = {
  fontTheme: 'sans-serif' | 'serif' | 'monospace'
  setFontTheme: (font: 'sans-serif' | 'serif' | 'monospace') => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontTheme, setFontTheme] = useState<
    'sans-serif' | 'serif' | 'monospace'
  >('sans-serif')

  useEffect(() => {
    const savedFont = Cookies.get('font-theme') as
      | 'sans-serif'
      | 'serif'
      | 'monospace'
      | undefined

    if (savedFont) {
      setFontTheme(savedFont)
    } else {
      Cookies.set('font-theme', 'sans-serif', { expires: 365 })
    }
  }, [])

  const updateFontTheme = (font: 'sans-serif' | 'serif' | 'monospace') => {
    Cookies.set('font-theme', font, { expires: 365 })
    setFontTheme(font)
  }

  return (
    <FontContext.Provider value={{ fontTheme, setFontTheme: updateFontTheme }}>
      {children}
    </FontContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
