import { createFileRoute } from '@tanstack/react-router'
import { isWithinInterval } from 'date-fns'
import { useMemo } from 'react'
import { useStore } from 'zustand'

import { transactions } from '@/__mock__/transactions'
import { Button } from '@/components/Button'
import { MainChartComponent } from '@/components/home/MainChart'
import { SideMetricsComponent } from '@/components/home/Side'
import { TransactionsTableComponent } from '@/components/TransactionsTable'
import { sideMetricsOptions } from '@/data/home'
import { formatDate } from '@/lib/date'
import { numberFormatter } from '@/lib/number'
import { filterStore } from '@/store'

import TransactionArrowDownIcon from '@/assets/svgs/arrow-negative.svg?react'
import TransactionArrowUpIcon from '@/assets/svgs/arrow-positive.svg?react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { filters } = useStore(filterStore)

  const filteredTransactions = useMemo(() => {
    const filteredTransactionsCollection = transactions.filter((record) => {
      // If date range filter is not set, treat as valid (true)
      // If set, check if record date is within the range
      const dateRangeValid =
        !(
          filters.dateRange.length === 2 &&
          filters.dateRange[0] &&
          filters.dateRange[1]
        ) ||
        isWithinInterval(new Date(record.date), {
          start: new Date(filters.dateRange[0]),
          end: new Date(filters.dateRange[1]),
        })

      // If transaction type filter is not set, treat as valid (true)
      // If set, check if record type matches
      const transactionTypeValid =
        !(filters.transactionType && filters.transactionType.length > 0) ||
        filters.transactionType.includes(record.type)

      // If transaction status filter is not set, treat as valid (true)
      // If set, check if record status matches
      const transactionStatusValid =
        !(filters.transactionStatus && filters.transactionStatus.length > 0) ||
        filters.transactionStatus.includes(record.status)

      // All applied filters must pass
      return dateRangeValid && transactionTypeValid && transactionStatusValid
    })

    return filteredTransactionsCollection
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((record) => ({
        icon:
          record.type === 'deposit' ? (
            <TransactionArrowUpIcon width={48} height={48} />
          ) : (
            <TransactionArrowDownIcon width={48} height={48} />
          ),
        title: record.metadata?.product_name
          ? record.metadata.product_name
          : record.type === 'withdrawal'
            ? 'Cash Withdrawal'
            : 'Cash Deposit',
        subtitle: record.metadata?.name ? record.metadata.name : record.status,
        amount: 'USD ' + numberFormatter(record.amount),
        date: formatDate(record.date),
        status: record.status,
      }))
  }, [transactions, filters])

  return (
    <div className="flex flex-col gap-y-[82px] mb-[120px]">
      <div className="text-center mt-[64px] flex justify-between items-start">
        <div className="max-w-[765.21px] w-full flex flex-col">
          <div className="w-full flex gap-x-[64px] items-center ">
            <div className="flex flex-col gap-y-[8px] align-baseline">
              <h5 className="text-[14px] font-[500] leading-[16px] tracking-[-0.2px] text-[#56616B] text-start content-center align-middle">
                Available Balance
              </h5>
              <h2 className="text-[36px] font-[700] leading-[48px] tracking-[-1.5px] text-[#131316] text-start content-center align-middle">
                USD 120,500.00
              </h2>
            </div>
            <Button label="Withdraw" size="lg" />
          </div>
          <div className="w-full mt-[24px]">
            <MainChartComponent areaChartClassName="max-h-[257px]" />
          </div>
        </div>

        <div className="max-w-[271px] w-full">
          <SideMetricsComponent options={sideMetricsOptions} />
        </div>
      </div>

      <div className="w-full">
        <TransactionsTableComponent records={filteredTransactions} />
      </div>
    </div>
  )
}
