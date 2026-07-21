import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { updateLecturerProfile } from '@/server/modules/lecturers/lecturer-portal.service'

export async function POST(request: Request) {
  try {
    const session = await requireLecturerSession()
    const { officeHours } = await request.json()

    const result = await updateLecturerProfile(session.id, officeHours ?? '')
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update profile.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
