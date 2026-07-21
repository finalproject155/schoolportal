import { cookies } from 'next/headers'
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session'

export async function requireLecturerSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  const session = token ? await verifySessionToken(token) : null

  if (!session || session.role !== 'lecturer') {
    throw new Error('Not authenticated.')
  }

  return session
}
