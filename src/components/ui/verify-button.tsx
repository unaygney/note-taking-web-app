import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'

export default function VerifyButton() {
  const verify = async () => {
    const session = await authClient.getSession()

    if (!session?.data?.user?.email) {
      toast.error('Email address is not available.')
      return
    }

    const res = await authClient.sendVerificationEmail({
      email: session.data.user.email,
      callbackURL: '/',
    })

    if (res.error) {
      toast.error(
        res.error.message ?? 'An error occurred when sending verify email.'
      )
    }
    if (res) {
      toast.success('Verification email sent to your email address.')
    }
  }

  return (
    <button onClick={verify} className="text-base/normal underline">
      Verify
    </button>
  )
}
