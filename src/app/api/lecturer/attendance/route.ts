import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { getCourseRoster, getAttendance, saveAttendance } from '@/server/modules/lecturers/lecturer-portal.service'

export async function GET(request: Request) {
  try {
    await requireLecturerSession()
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const sessionDate = searchParams.get('date') ?? new Date().toISOString().slice(0, 10)

    if (!courseId) {
      return NextResponse.json({ error: 'courseId is required.' }, { status: 400 })
    }

    const [roster, attendance] = await Promise.all([
      getCourseRoster(courseId),
      getAttendance(courseId, sessionDate),
    ])

    const statusByStudent = new Map(attendance.map((a) => [a.student_id, a.status]))
    const rows = roster.map((s) => ({ ...s, status: statusByStudent.get(s.studentId) ?? 'present' }))

    return NextResponse.json({ roster: rows, sessionDate })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load attendance.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    await requireLecturerSession()
    const { courseId, sessionDate, entries } = await request.json()

    if (!courseId || !sessionDate || !Array.isArray(entries)) {
      return NextResponse.json({ error: 'courseId, sessionDate and entries are required.' }, { status: 400 })
    }

    const result = await saveAttendance(courseId, sessionDate, entries)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save attendance.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
