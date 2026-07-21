import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { getAnnouncements, createAnnouncement } from '@/server/modules/lecturers/lecturer-portal.service'

export async function GET() {
  try {
    const session = await requireLecturerSession()
    const announcements = await getAnnouncements(session.id)
    return NextResponse.json({ announcements })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load announcements.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireLecturerSession()
    const { courseId, title, body } = await request.json()

    if (!title || !body) {
      return NextResponse.json({ error: 'title and body are required.' }, { status: 400 })
    }

    const result = await createAnnouncement(session.id, courseId ?? null, title, body)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to post announcement.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
