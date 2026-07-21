import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/services/api/client'

export type LecturerLoginPayload = {
  staff_id: string
  password: string
}

type LecturerLoginResponse = {
  user: {
    id: string
    staff_id: string
    full_name: string
    email: string
    department: string
    faculty: string
  }
  message: string
}

type LecturerLoginMutationVariables = {
  payload: LecturerLoginPayload
  queryParams?: Record<string, string | number | boolean | undefined>
}

export function useLecturerLoginMutation() {
  return useMutation({
    mutationFn: ({ payload, queryParams }: LecturerLoginMutationVariables) =>
      apiClient.post<LecturerLoginResponse>('/api/auth/lecturer-login', payload, {
        params: queryParams,
      }),
  })
}
