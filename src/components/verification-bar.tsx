import { headers } from 'next/headers'

import { auth } from '@/lib/auth'

export default async function VerificationBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.emailVerified) {
    return (
      <div className="fixed left-0 right-0 top-0 h-10 w-full bg-yellow-400 px-4 py-2 text-center text-black">
        Your account is not verified. Please verify your email.
      </div>
    )
  }

  return null
}
