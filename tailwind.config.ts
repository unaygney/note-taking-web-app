import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        neutral: {
          0: '#FFFFFF',
          50: '#F5F7FA',
          100: '#F3F5F8',
          200: '#E0E4EA',
          300: '#CACFD8',
          400: '#99A0AE',
          500: '#717784',
          600: '#525866',
          700: '#2B303B',
          800: '#232530',
          900: '#191B25',
          950: '#0E121B',
        },
        red: {
          100: '#FFD5D8',
          500: '#FB3748',
        },
        green: {
          100: '#D1FBE9',
          500: '#21C16B',
        },
        blue: {
          50: '#EBF1FF',
          500: '#335CFF',
          700: '#2547D0',
        },

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('tailwindcss-animate'),
  ],
} satisfies Config
