import { useQuery } from '@tanstack/react-query'

import type { Wallet } from '@/types'

import { QUERY_KEYS } from '@/constants/query'
import { API_ROUTES } from '@/constants/route'
import { http } from '@/lib/http'

export const useGetUserWallet = (enabled: boolean = true) => {
  return useQuery<Wallet, Error>({
    queryKey: [QUERY_KEYS.WALLET.RETRIEVE_WALLET],
    queryFn: async (): Promise<Wallet> => {
      const response = await http.get(API_ROUTES.WALLET.RETRIEVE_WALLET)
      return response.data
    },
    enabled,
  })
}
