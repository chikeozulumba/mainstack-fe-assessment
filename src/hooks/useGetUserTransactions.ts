import { useQuery } from '@tanstack/react-query'

import type { Transaction } from '@/types'

import { QUERY_KEYS } from '@/constants/query'
import { API_ROUTES } from '@/constants/route'
import { http } from '@/lib/http'

export const useGetUserTransactions = (enabled: boolean = true) => {
  return useQuery<Array<Transaction>, Error>({
    queryKey: [QUERY_KEYS.TRANSACTIONS.RETRIEVE_TRANSACTIONS],
    queryFn: async (): Promise<Array<Transaction>> => {
      const response = await http.get(API_ROUTES.TRANSACTION.GET_TRANSACTIONS)
      return response.data
    },
    enabled,
  })
}
