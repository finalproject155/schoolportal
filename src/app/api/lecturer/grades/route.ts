import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { getGrades, saveGrades } from '@/server/modules/lecturers/lecturer-portal.service'

export async function GET(request: Request) {
  try {
    await requireLecturerSession()
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'courseId is required.' }, { status: 400 })
    }

    const rows = await getGrades(courseId)
    return NextResponse.json({ rows })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load grades.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    await requireLecturerSession()
    const { courseId, entries } = await request.json()

    if (!courseId || !Array.isArray(entries)) {
      return NextResponse.json({ error: 'courseId and entries are required.' }, { status: 400 })
    }

    const result = await saveGrades(courseId, entries)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save grades.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
