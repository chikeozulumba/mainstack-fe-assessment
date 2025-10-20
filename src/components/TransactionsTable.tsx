import { useMemo } from 'react'
import { useStore } from 'zustand'
import { Button } from './Button'

import { NotAvailable } from './display/NotAvailable'

import type { TransactionTableRecord } from '@/types'

import ArrowDownIcon from '@/assets/svgs/arrow-down.svg?react'
import DownloadIcon from '@/assets/svgs/download.svg?react'
import { cn } from '@/lib/utils'
import { filterStore } from '@/store'

type Props = {
  records: Array<TransactionTableRecord>
}

const filterTermText = {
  today: 'Your transactions for just today.',
  last7Days: 'Your transactions for the last 7 days.',
  thisMonth: 'Your transactions for this month.',
  last3Months: 'Your transactions for the last 3 months.',
  range: 'Your transactions for the selected date range.',
}

export function TransactionsTableComponent({ records = [] }: Props) {
  const { filters, filterTerm, toggleModal, setFilters } = useStore(filterStore)

  const validFiltersLength = useMemo(() => {
    return Object.values(filters).filter((filter) => {
      let valid = false
      if (Array.isArray(filter)) {
        valid =
          filter.some((f) => f !== undefined && f !== '') && filter.length > 0
      }
      return valid
    }).length
  }, [filters])

  const noRecords = records.length === 0 && validFiltersLength > 0

  const clearFilters = () => {
    setFilters(
      {
        dateRange: [],
        transactionType: [],
        transactionStatus: [],
        chartDisplay: 'value',
      },
      undefined,
    )
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-start justify-between gap-x-[24px] pb-[24px] border-b-[1px] border-[#EFF1F6]">
        <div className="w-full flex flex-col gap-y-[0px]">
          <h2 className="text-[24px] font-[700] leading-[32px] tracking-[-0.6px] text-start content-center align-middle text-[#131316]">
            {records.length || 0} Transactions
          </h2>
          <p className="text-[14px] font-[400] leading-[20px] tracking-[-0.2px] text-[#56616B] text-start content-center align-middle">
            {filterTerm
              ? filterTermText[filterTerm as keyof typeof filterTermText]
              : 'Your transactions for all time sorted by the most recent date.'}
          </p>
        </div>

        <div className="w-fit flex flex-row items-center gap-x-[12px] justify-end">
          <Button
            label="Filter"
            variant="secondary"
            size="sm"
            rightIcon={
              <ArrowDownIcon
                width={'11px'}
                height={'7px'}
                className="mt-[2px]"
              />
            }
            onClick={() => toggleModal(true)}
          >
            {validFiltersLength > 0 && (
              <>
                Filter
                <span className="text-[12px] h-[20px] w-[20px] bg-[#131316] flex items-center justify-center font-[400] leading-[12px] tracking-[-0.2px] text-[#fff] rounded-[100px]">
                  {validFiltersLength}
                </span>
              </>
            )}
          </Button>
          <Button
            label="Export list"
            variant="secondary"
            size="sm"
            rightIcon={<DownloadIcon width={'12px'} height={'12px'} />}
          />
        </div>
      </div>

      <div
        className={cn(
          'w-full mt-[33px] gap-y-[24px] flex flex-col',
          noRecords && 'h-[600px] flex items-center justify-center',
        )}
      >
        {noRecords && <NotAvailable onClick={clearFilters} />}
        {records.map((transaction, index) => (
          <div
            className="w-full flex flex-row items-center gap-x-[14.5px]"
            key={index}
          >
            <div className="w-fit">{transaction.icon}</div>
            <div className="w-full flex">
              <div className="w-full flex flex-col gap-y-[9px]">
                <h3 className="text-[16px] font-[500] leading-[24px] tracking-[-0.2px] text-[#131316] text-start content-center align-middle">
                  {transaction.title}
                </h3>
                <p
                  className={cn(
                    'text-[14px] font-[400] leading-[16px] tracking-[-0.2px] text-[#56616B] text-start content-center align-middle',
                    transaction.subtitle === 'successful'
                      ? 'text-[#0EA163] capitalize'
                      : undefined,
                    transaction.subtitle === 'pending'
                      ? 'text-[#A77A07] capitalize'
                      : undefined,
                    transaction.status === 'failed'
                      ? 'text-[#D92D20] capitalize'
                      : undefined,
                  )}
                >
                  {transaction.subtitle}
                </p>
              </div>
              <div className="flex flex-col gap-y-[9px] whitespace-nowrap justify-end items-end">
                <h3 className="text-[16px] font-[700] leading-[150%] tracking-[-0.4px] text-[#131316] text-start content-end align-middle whitespace-nowrap">
                  {transaction.amount}
                </h3>
                <p className="text-[14px] font-[500] leading-[16px] tracking-[-0.2px] text-[#56616B] text-start content-end align-middle whitespace-nowrap">
                  {transaction.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
