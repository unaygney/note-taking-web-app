import { headers } from 'next/headers'

import { auth } from '@/lib/auth'

import VerifyButton from './ui/verify-button'

export default async function VerificationBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.emailVerified) {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 bg-yellow-100 px-4 py-3 text-yellow-800 shadow-md transition-all duration-300 ease-in-out dark:bg-gray-800 dark:text-yellow-100">
        <div className="container mx-auto flex items-center gap-10">
          <div className="flex items-center">
            <svg
              className="mr-2 h-6 w-6 text-yellow-500 dark:text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>Please verify your email address.</span>
          </div>
          <VerifyButton />
        </div>
      </div>
    )
  }

  return null
}
