import { formatDate } from './date'

import type { Transaction } from '@/types'

export function formatTransactionsToChartData(
  data: Array<Transaction>,
  mode: 'value' | 'day' | 'month' | 'year',
) {
  let collection: Array<{ date: string; value: number }> = []
  switch (mode) {
    case 'day':
      collection = data.map((item) => ({
        date: formatDate(new Date(item.date), {
          toFormat: 'EEEE',
          isISO: true,
        }),
        value: item.amount,
      }))
      break
    case 'month':
      collection = data.map((item) => ({
        date: formatDate(new Date(item.date), {
          toFormat: 'LLLL',
          isISO: true,
        }),
        value: item.amount,
      }))

      break
    case 'year':
      collection = data.map((item) => ({
        date: formatDate(new Date(item.date), {
          toFormat: 'yyyy',
          isISO: true,
        }),
        value: item.amount,
      }))
      break
    case 'value':
    default:
      collection = data.map((item) => ({
        date: formatDate(new Date(item.date), {
          toFormat: 'P',
          isISO: true,
        }),
        value: item.amount,
      }))
      break
  }

  // group by the date
  const groupedCollection = groupByDate(collection)

  return groupedCollection
}

function groupByDate(data: Array<{ date: string; value: number }>) {
  return data.reduce((acc: Record<string, number>, item) => {
    const date: string = item.date
    if (!acc[date]) {
      acc[date] = item.value
    } else {
      acc[date] = item.value + acc[date]
    }
    return acc
  }, {})
}
