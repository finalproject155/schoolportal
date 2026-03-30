import { apiClient } from '@/services/api/client'

export type HealthDTO = {
  status: 'ok'
  timestamp: string
  databaseConfigured: boolean
}

export function getHealth() {
  return apiClient.get<HealthDTO>('/api/health')
}