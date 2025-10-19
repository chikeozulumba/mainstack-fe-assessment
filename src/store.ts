import { create } from 'zustand'

interface CounterState {
  showModal: boolean
  toggleModal: (showModal: boolean) => void
  filters: {
    dateRange: Array<Date | undefined | string>
    transactionType: Array<string> | undefined
    transactionStatus: Array<string> | undefined
  }
  setFilters: (filters: {
    dateRange: Array<Date | undefined | string>
    transactionType: Array<string> | undefined
    transactionStatus: Array<string> | undefined
  }) => void
}

export const filterStore = create<CounterState>((set) => ({
  showModal: false,
  filters: {
    dateRange: [],
    transactionType: [],
    transactionStatus: [],
  },
  setFilters: (filters: {
    dateRange: Array<Date | undefined | string>
    transactionType: Array<string> | undefined
    transactionStatus: Array<string> | undefined
  }) => set({ filters }),
  toggleModal: (showModal: boolean) => set({ showModal }),
}))
