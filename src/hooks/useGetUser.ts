import { useQuery } from '@tanstack/react-query'

import type { AuthUser } from '@/types'

import { QUERY_KEYS } from '@/constants/query'
import { API_ROUTES } from '@/constants/route'
import { http } from '@/lib/http'

export const useGetUser = () => {
  return useQuery<AuthUser, Error>({
    queryKey: [QUERY_KEYS.USER.GET_PROFILE],
    queryFn: async (): Promise<AuthUser> => {
      const response = await http.get(API_ROUTES.USER.GET_PROFILE)
      return response.data
    },
  })
}
