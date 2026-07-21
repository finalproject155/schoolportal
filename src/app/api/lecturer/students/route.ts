import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { getLecturerStudents } from '@/server/modules/lecturers/lecturer-portal.service'

export async function GET() {
  try {
    const session = await requireLecturerSession()
    const students = await getLecturerStudents(session.id)
    return NextResponse.json({ students })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load students.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}
