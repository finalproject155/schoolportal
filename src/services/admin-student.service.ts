import { apiClient } from '@/services/api/client'

export type CreateStudentPayload = {
  surname: string
  first_name: string
  middle_name?: string
  gender: string
  date_of_birth: string
  country: string
  nationality_type: string
  state_of_origin: string
  lga: string
  ward?: string
  marital_status: string
  military_personnel: string
  phone: string
  email: string
  permanent_address: string
  matric: string
  programme: string
  department: string
  faculty: string
  level: string
  nok_full_name: string
  nok_relationship: string
  nok_phone: string
  nok_email: string
  nok_address: string
}

type ServiceQueryParams = Record<string, string | number | boolean | undefined>

type CreateStudentResponse = {
  id: string
  matric: string
  email: string
  mailSent: boolean
  emailError?: string
  temporaryPassword?: string
  message: string
}

class AdminStudentService {
  async createStudent(payload: CreateStudentPayload, queryParams?: ServiceQueryParams) {
    return apiClient.post<CreateStudentResponse>('/api/admin/add-student', payload, {
      params: queryParams,
    })
  }
}

export const adminStudentService = new AdminStudentService()