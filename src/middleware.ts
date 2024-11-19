import { betterFetch } from '@better-fetch/fetch'
import type { Session } from 'better-auth/types'
import { type NextRequest, NextResponse } from 'next/server'

import { isRequestedAuthPage, securedPages } from './lib/auth'

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
    }
  )

  if (isRequestedAuthPage(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (securedPages(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
