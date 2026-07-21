import { NextResponse } from 'next/server'
import { createLecturer } from '@/server/modules/lecturers/lecturers.service'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const created = await createLecturer(payload)

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create lecturer.'

    if (message.toLowerCase().includes('duplicate') || message.toLowerCase().includes('already exists')) {
      return NextResponse.json({ error: message }, { status: 409 })
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
