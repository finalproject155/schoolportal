import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { getLecturerCourses } from '@/server/modules/lecturers/lecturer-portal.service'

export async function GET() {
  try {
    const session = await requireLecturerSession()
    const courses = await getLecturerCourses(session.id)
    return NextResponse.json({ courses })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load courses.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}
