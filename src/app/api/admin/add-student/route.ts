import { NextResponse } from 'next/server'
import { createStudent } from '@/server/modules/students/students.service'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const created = await createStudent(payload)

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create student.'

    if (message.toLowerCase().includes('duplicate')) {
      return NextResponse.json({ error: message }, { status: 409 })
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}