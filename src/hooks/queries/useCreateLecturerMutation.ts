import { useMutation } from '@tanstack/react-query'
import {
  adminLecturerService,
  type CreateLecturerPayload,
} from '@/services/admin-lecturer.service'

type CreateLecturerMutationVariables = {
  payload: CreateLecturerPayload
  queryParams?: Record<string, string | number | boolean | undefined>
}

export function useCreateLecturerMutation() {
  return useMutation({
    mutationFn: ({ payload, queryParams }: CreateLecturerMutationVariables) =>
      adminLecturerService.createLecturer(payload, queryParams),
  })
}
