import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { getTimetable } from '@/server/modules/lecturers/lecturer-portal.service'

export async function GET() {
  try {
    const session = await requireLecturerSession()
    const schedule = await getTimetable(session.id)
    return NextResponse.json({ schedule })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load timetable.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}
