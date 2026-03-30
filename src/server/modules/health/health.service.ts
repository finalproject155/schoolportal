import { db } from '@/server/db'

export type HealthResponse = {
  status: 'ok'
  timestamp: string
  databaseConfigured: boolean
}

export async function getHealthStatus(): Promise<HealthResponse> {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    databaseConfigured: db.isConfigured,
  }
}