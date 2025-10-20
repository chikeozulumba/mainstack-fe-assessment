import React from 'react'

import type { AuthUser } from '@/types'
import type { UseQueryResult } from '@tanstack/react-query'

import { useGetUser } from '@/hooks/useGetUser'

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface AuthContext {
  user: AuthUser | undefined
  getUser: UseQueryResult<AuthUser, Error>
  isAuthenticated: boolean
}

export const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const getUserQuery = useGetUser()

  const isAuthenticated = !!getUserQuery.data

  return (
    <AuthContext.Provider
      value={{
        user: getUserQuery.data,
        getUser: getUserQuery,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
