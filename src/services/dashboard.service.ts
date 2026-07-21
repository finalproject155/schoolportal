import { apiClient } from '@/services/api/client'

export type CategoryCountDTO = { label: string; count: number }
export type MonthlyCountDTO = { month: string; label: string; count: number }

export type DashboardStatsDTO = {
  totalStudents: number
  totalLecturers: number
  totalDepartments: number
  totalFaculties: number
  studentsByDepartment: CategoryCountDTO[]
  studentsByLevel: CategoryCountDTO[]
  studentsByGender: CategoryCountDTO[]
  lecturersByDepartment: CategoryCountDTO[]
  registrationsByMonth: MonthlyCountDTO[]
}

export function getDashboardStats() {
  return apiClient.get<DashboardStatsDTO>('/api/admin/dashboard-stats')
}
