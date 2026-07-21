import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { changeLecturerPassword } from '@/server/modules/lecturers/lecturer-portal.service'

export async function POST(request: Request) {
  try {
    const session = await requireLecturerSession()
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'currentPassword and newPassword are required.' }, { status: 400 })
    }

    const result = await changeLecturerPassword(session.id, currentPassword, newPassword)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to change password.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
