import { NextResponse } from 'next/server'
import { requireLecturerSession } from '@/server/lib/lecturer-auth'
import { getMaterials, addMaterial, removeMaterial } from '@/server/modules/lecturers/lecturer-portal.service'

export async function GET() {
  try {
    const session = await requireLecturerSession()
    const materials = await getMaterials(session.id)
    return NextResponse.json({ materials })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load materials.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireLecturerSession()
    const { courseId, title, materialType, fileUrl } = await request.json()

    if (!courseId || !title) {
      return NextResponse.json({ error: 'courseId and title are required.' }, { status: 400 })
    }

    const result = await addMaterial(session.id, courseId, title, materialType ?? 'PDF', fileUrl)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add material.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireLecturerSession()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required.' }, { status: 400 })
    }

    const result = await removeMaterial(id, session.id)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove material.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
