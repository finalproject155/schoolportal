import { NextResponse } from 'next/server'
import { getHealthStatus } from '@/server/modules/health/health.service'

export async function GET() {
  const data = await getHealthStatus()
  return NextResponse.json(data)
}