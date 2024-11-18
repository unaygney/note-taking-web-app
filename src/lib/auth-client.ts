import { createAuthClient } from 'better-auth/react'

import { getBaseUrl } from './utils'

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
})
