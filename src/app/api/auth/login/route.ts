import { NextResponse } from 'next/server'
import { loginStudent } from '@/server/modules/students/students.service'
import { SESSION_COOKIE_NAME, signSessionToken } from '@/lib/auth/session'

export async function POST(request: Request) {
  try {
    const { matric, password } = await request.json()

    if (!matric || !password) {
      return NextResponse.json(
        { error: 'Matric number and password are required.' },
        { status: 400 },
      )
    }

    const result = await loginStudent({ matric, password })
    const token = await signSessionToken({
      id: result.user.id,
      firstName: result.user.first_name,
      email: result.user.email,
      matric: result.user.matric,
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