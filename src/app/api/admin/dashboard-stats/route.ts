import { NextResponse } from 'next/server'
import { getDashboardStats } from '@/server/modules/dashboard/dashboard.service'

export async function GET() {
  try {
    const stats = await getDashboardStats()
    return NextResponse.json(stats)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load dashboard stats.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
