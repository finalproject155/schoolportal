import { useMutation } from '@tanstack/react-query'
import {
  adminStudentService,
  type CreateStudentPayload,
} from '@/services/admin-student.service'

type CreateStudentMutationVariables = {
  payload: CreateStudentPayload
  queryParams?: Record<string, string | number | boolean | undefined>
}

export function useCreateStudentMutation() {
  return useMutation({
    mutationFn: ({ payload, queryParams }: CreateStudentMutationVariables) =>
      adminStudentService.createStudent(payload, queryParams),
  })
}