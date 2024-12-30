import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession, updateSession } from './utils/session'

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/protectedUser')  || 
  request.nextUrl.pathname.startsWith('/api/points')) {
    const session = await getSession()
    const userId = session
    console.log(userId)

    if (!session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return updateSession(request)
}

export const config = {
  matcher: ['/protectedUser/:path*', '/api/points'],
}
