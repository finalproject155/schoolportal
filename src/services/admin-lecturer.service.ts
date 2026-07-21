import { apiClient } from '@/services/api/client'

export type CreateLecturerPayload = {
  surname: string
  first_name: string
  staff_id: string
  email: string
  phone: string
  department: string
  faculty: string
  office_hours?: string
}

type ServiceQueryParams = Record<string, string | number | boolean | undefined>

type CreateLecturerResponse = {
  id: string
  staffId: string
  email: string
  mailSent: boolean
  emailError?: string
  temporaryPassword?: string
  message: string
}

class AdminLecturerService {
  async createLecturer(payload: CreateLecturerPayload, queryParams?: ServiceQueryParams) {
    return apiClient.post<CreateLecturerResponse>('/api/admin/add-lecturer', payload, {
      params: queryParams,
    })
  }
}

export const adminLecturerService = new AdminLecturerService()
