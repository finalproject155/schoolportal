import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/lecturer/login')) {
    return NextResponse.next()
  }

  const isLecturerRoute = request.nextUrl.pathname.startsWith('/lecturer')
  const loginUrl = isLecturerRoute ? '/lecturer/login' : '/login'

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(new URL(loginUrl, request.url))
  }

  const session = await verifySessionToken(token)

  if (!session) {
    const response = NextResponse.redirect(new URL(loginUrl, request.url))
    response.cookies.delete(SESSION_COOKIE_NAME)
    return response
  }

  if (isLecturerRoute && session.role !== 'lecturer') {
    return NextResponse.redirect(new URL(loginUrl, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/course/:path*',
    '/fees/:path*',
    '/profile/:path*',
    '/results/:path*',
    '/timetable/:path*',
    '/program/:path*',
    '/transcript/:path*',
    '/clearance/:path*',
    '/id-card/:path*',
    '/library/:path*',
    '/hostel/:path*',
    '/sports/:path*',
    '/it-registration/:path*',
    '/sos/:path*',
    '/placement/:path*',
    '/lecturer/:path*',
  ],
}
