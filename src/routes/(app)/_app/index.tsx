import { createFileRoute } from '@tanstack/react-router'
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import { isWithinInterval } from 'date-fns'
import { useMemo } from 'react'
import { z } from 'zod'
import { useStore } from 'zustand'

import { Button } from '@/components/Button'
import { MainChartComponent } from '@/components/home/MainChart'
import { SideMetricsComponent } from '@/components/home/Side'
import { TransactionsTableComponent } from '@/components/TransactionsTable'
import { formatDate } from '@/lib/date'
import { numberFormatter } from '@/lib/number'
import { filterStore } from '@/store'

import { transactions } from '@/__mock__/transactions'
import { wallet as mockWallet } from '@/__mock__/wallet'
import TransactionArrowDownIcon from '@/assets/svgs/arrow-negative.svg?react'
import TransactionArrowUpIcon from '@/assets/svgs/arrow-positive.svg?react'
import { sideMetricsLabels } from '@/constants/metrics'
import { useGetUser } from '@/hooks/useGetUser'
import { useGetUserTransactions } from '@/hooks/useGetUserTransactions'
import { useGetUserWallet } from '@/hooks/useGetUserWallet'
import { formatTransactionsToChartData } from '@/lib/chart'

export const Route = createFileRoute('/(app)/_app/')({
  component: App,
  validateSearch: zodValidator(
    z.object({
      source: fallback(
        z.enum(['api', 'local'], {
          invalid_type_error: 'Source must be either api or local',
          required_error: 'Source is required',
        }),
        'api',
      ),
    }),
  ),
})

function App() {
  const search = Route.useSearch()
  const { filters } = useStore(filterStore)
  const chartDisplay = filters.chartDisplay

  const { data: user } = useGetUser()

  const { data: wallet } = useGetUserWallet(!!user)

  const { data: transactionRecords = [] } = useGetUserTransactions(!!user)

  const sideMetricWalletOptions = useMemo(() => {
    const walletData = search.source === 'api' ? wallet : mockWallet
    return Object.entries({ ...(walletData || {}), balance: undefined })
      .filter(([, value]) => value != undefined)
      .map(([key, value]) => ({
        title: sideMetricsLabels[key as keyof typeof sideMetricsLabels],
        value: `USD ${numberFormatter(value || 0)}`,
      }))
  }, [wallet, search.source])

  const filteredTransactions = useMemo(
    () =>
      (search.source === 'api' ? transactionRecords : transactions).filter(
        (record) => {
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
            !(
              filters.transactionStatus && filters.transactionStatus.length > 0
            ) || filters.transactionStatus.includes(record.status)

          // All applied filters must pass
          return (
            dateRangeValid && transactionTypeValid && transactionStatusValid
          )
        },
      ),
    [filters, transactionRecords, search.source],
  )

  const filteredTransactionsTableData = useMemo(() => {
    return filteredTransactions
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
  }, [transactionRecords, filters, filteredTransactions, search.source])

  const chartData = useMemo(() => {
    const data = formatTransactionsToChartData(
      filteredTransactions,
      chartDisplay,
    )

    const refinedChartData = Object.entries(data).map(([date, value]) => ({
      label: date,
      value,
    }))

    if (chartDisplay === 'value' || chartDisplay === 'month') {
      return refinedChartData.reverse()
    }

    return refinedChartData
  }, [filteredTransactions, chartDisplay])

  return (
    <div className="flex flex-col sm:gap-y-[82px] gap-y-[50px] sm:mb-[120px] mb-[30px]">
      <div className="text-center mt-[64px] flex justify-between items-start">
        <div className="sm:max-w-[765.21px] w-full flex flex-col px-[16px] sm:px-0">
          <div className="w-full sm:flex gap-x-[64px] items-center sm:text-inherit text-left">
            <div className="flex flex-col gap-y-[8px] align-baseline">
              <h5 className="text-[14px] font-[500] leading-[16px] tracking-[-0.2px] text-[#56616B] text-start content-center align-middle">
                Available Balance
              </h5>
              <h2 className="text-[36px] font-[700] leading-[48px] tracking-[-1.5px] text-[#131316] text-start content-center align-middle">
                USD{' '}
                {numberFormatter(
                  search.source === 'api'
                    ? wallet?.balance || 0
                    : mockWallet.balance,
                )}
              </h2>
            </div>
            <Button
              label="Withdraw"
              size="lg"
              className={'mt-[24px] sm:mt-0'}
            />
          </div>
          <div className="w-full sm:mt-[24px] mt-[48px]">
            <MainChartComponent
              areaChartClassName="max-h-[257px]"
              areaType={'natural'}
              data={chartData}
              dataKey="label"
              areaDataKey="value"
            />
          </div>
        </div>

        <div className="max-w-[271px] w-full sm:block hidden">
          <SideMetricsComponent options={sideMetricWalletOptions} />
        </div>
      </div>

      <div className="w-full px-[16px] sm:px-0">
        <TransactionsTableComponent records={filteredTransactionsTableData} />
      </div>
    </div>
  )
}
