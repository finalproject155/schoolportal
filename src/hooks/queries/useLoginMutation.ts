import { useMutation } from '@tanstack/react-query'
import { authService, type LoginPayload } from '@/services/auth.service'

type LoginMutationVariables = {
  payload: LoginPayload
  queryParams?: Record<string, string | number | boolean | undefined>
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({ payload, queryParams }: LoginMutationVariables) =>
      authService.login(payload, queryParams),
  })
}