import { create } from 'zustand'

interface CounterState {
  showModal: boolean
  toggleModal: (showModal: boolean) => void
  filters: {
    chartDisplay: 'value' | 'day' | 'month' | 'year'
    dateRange: Array<Date | undefined | string>
    transactionType: Array<string> | undefined
    transactionStatus: Array<string> | undefined
  }
  filterTerm: string | undefined
  setFilterTerm: (filterTerm: string | undefined) => void
  setFilters: (
    filters: {
      chartDisplay: 'value' | 'day' | 'month' | 'year'
      dateRange: Array<Date | undefined | string>
      transactionType: Array<string> | undefined
      transactionStatus: Array<string> | undefined
    },
    filterTerm: string | undefined,
  ) => void
}

export const filterStore = create<CounterState>((set) => ({
  showModal: false,
  filters: {
    chartDisplay: 'value',
    dateRange: [],
    transactionType: [],
    transactionStatus: [],
  },
  filterTerm: undefined,
  setFilterTerm: (filterTerm: string | undefined) => set({ filterTerm }),
  setFilters: (
    filters: {
      chartDisplay: 'value' | 'day' | 'month' | 'year'
      dateRange: Array<Date | undefined | string>
      transactionType: Array<string> | undefined
      transactionStatus: Array<string> | undefined
    },
    filterTerm: string | undefined,
  ) => set({ filters, filterTerm }),
  toggleModal: (showModal: boolean) => set({ showModal }),
}))
