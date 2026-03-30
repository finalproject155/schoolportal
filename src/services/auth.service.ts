import { apiClient } from '@/services/api/client'

export type LoginPayload = {
  matric: string
  password: string
}

type ServiceQueryParams = Record<string, string | number | boolean | undefined>

export type LoginResponse = {
  user: {
    id: string
    matric: string
    full_name: string
    email: string
    department: string
    level: string
  }
  message: string
}

class AuthService {
  async login(payload: LoginPayload, queryParams?: ServiceQueryParams) {
    return apiClient.post<LoginResponse>('/api/auth/login', payload, {
      params: queryParams,
    })
  }
}

export const authService = new AuthService()