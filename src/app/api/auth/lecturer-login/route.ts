import { NextResponse } from 'next/server'
import { loginLecturer } from '@/server/modules/lecturers/lecturers.service'
import { SESSION_COOKIE_NAME, signSessionToken } from '@/lib/auth/session'

export async function POST(request: Request) {
  try {
    const { staff_id, password } = await request.json()

    if (!staff_id || !password) {
      return NextResponse.json(
        { error: 'Staff ID and password are required.' },
        { status: 400 },
      )
    }

    const result = await loginLecturer({ staff_id, password })
    const token = await signSessionToken({
      id: result.user.id,
      firstName: result.user.first_name,
      email: result.user.email,
      matric: result.user.staff_id,
      role: 'lecturer',
    })

    const response = NextResponse.json(result)
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}
