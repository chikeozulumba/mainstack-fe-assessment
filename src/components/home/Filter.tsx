import {
  endOfDay,
  endOfMonth,
  isBefore,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns'
import { useMemo, useState } from 'react'
import { useStore } from 'zustand'

import { TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '../Button'

import { DatePickerComponent } from '../DatePicker'
import { DrawerComponent } from '../Drawer'
import { MultiSelectComponent } from '../MultiSelect'

import type { SelectedOption } from '@/types'

import {
  transactionStatusOptions,
  transactionTypeOptions,
} from '@/constants/transaction'
import { cn } from '@/lib/utils'
import { filterStore } from '@/store'

type SelectedRange =
  | 'today'
  | 'last7Days'
  | 'thisMonth'
  | 'last3Months'
  | 'range'

type ChartDisplay = 'day' | 'month' | 'year' | 'value'

const rangeFilterDates = {
  today: [startOfDay(new Date()), endOfDay(new Date())],
  last7Days: [subDays(new Date(), 7), new Date()],
  thisMonth: [startOfMonth(new Date()), endOfMonth(new Date())],
  last3Months: [subMonths(new Date(), 3), new Date()],
}

const chartDisplayOptions = [
  {
    label: 'By Value',
    value: 'value',
  },
  {
    label: 'By Day',
    value: 'day',
  },
  {
    label: 'By Month',
    value: 'month',
  },
  {
    label: 'By Year',
    value: 'year',
  },
]

const rangeFilterOptions = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Last 7 Days',
    value: 'last7Days',
  },
  {
    label: 'This Month',
    value: 'thisMonth',
  },
  {
    label: 'Last 3 months',
    value: 'last3Months',
  },
]

//  using date-fns to compare dates
const compareDates = (
  date1: Date | undefined | string,
  date2: Date | undefined | string,
): boolean => {
  if (!date1 || !date2) return false

  return isBefore(new Date(date1), new Date(date2))
}

export const FilterComponent = () => {
  const { showModal, toggleModal, setFilters } = useStore(filterStore)
  const [selectedRange, setSelectedRange] = useState<SelectedRange | undefined>(
    undefined,
  )
  const [chartDisplay, setChartDisplay] = useState<ChartDisplay | undefined>(
    undefined,
  )

  const [dates, setDates] = useState<Array<Date | undefined | string>>(
    Array.from({ length: 2 }, () => undefined),
  )

  const [transactionTypeSelectedOptions, setTransactionTypeSelectedOptions] =
    useState<{
      [key: string]: SelectedOption | undefined
    }>({})

  const [
    transactionStatusSelectedOptions,
    setTransactionStatusSelectedOptions,
  ] = useState<{
    [key: string]: SelectedOption | undefined
  }>({})

  const validateDateFilters = useMemo(() => {
    return compareDates(dates[0], dates[1])
  }, [dates])

  // check if any of the selected options are not empty
  const validateSelectedOptions = useMemo(() => {
    return (
      Object.values(transactionTypeSelectedOptions).filter(
        (option) => option !== undefined,
      ).length > 0 ||
      Object.values(transactionStatusSelectedOptions).filter(
        (option) => option !== undefined,
      ).length > 0
    )
  }, [transactionTypeSelectedOptions, transactionStatusSelectedOptions])

  const canFilter =
    validateDateFilters ||
    validateSelectedOptions ||
    selectedRange !== undefined ||
    chartDisplay !== undefined

  const clearFilters = () => {
    setSelectedRange(undefined)
    setDates(Array.from({ length: 2 }, () => undefined))
    setTransactionTypeSelectedOptions({})
    setTransactionStatusSelectedOptions({})
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

  const handleRangeFilterClick = (range: SelectedRange) => {
    if (selectedRange === range) {
      setSelectedRange(undefined)
      setDates(Array.from({ length: 2 }, () => undefined))
      return
    }

    setSelectedRange(range)
    if (range === 'range') return
    setDates(rangeFilterDates[range])
  }

  const handleApplyFilters = () => {
    if (!canFilter) return

    const filters = {
      chartDisplay: chartDisplay ?? 'value',
      dateRange: dates,
      transactionType: Object.values(transactionTypeSelectedOptions)
        .map((option) => option?.value)
        .filter((option) => option !== undefined),
      transactionStatus: Object.values(transactionStatusSelectedOptions)
        .map((option) => option?.value)
        .filter((option) => option !== undefined),
    }

    setFilters(filters, selectedRange)
    toggleModal(false)
  }

  return (
    <DrawerComponent
      isOpen={showModal}
      onClose={() => {
        toggleModal(false)
      }}
      className="h-full relative"
    >
      <div className="w-full">
        {/* Title and close button */}
        <div className="w-full flex flex-row items-center justify-between p-[24px]">
          <h2 className="text-[24px] font-[800] leading-[120%] tracking-[-0.8px] text-[#131316]">
            Filter
          </h2>
          <TransitionChild>
            <div className="flex duration-500 ease-in-out data-closed:opacity-0">
              <button
                type="button"
                onClick={() => {
                  toggleModal(false)
                }}
                className="relative cursor-pointer rounded-md text-[#000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
          </TransitionChild>
        </div>

        <div className="w-full sm:max-h-[100%] max-h-[calc(100%-100px)] h-full overflow-y-auto sm:overflow-y-hidden">
          {/* Range filter options */}
          <div className="w-full flex flex-row items-center sm:justify-between justify-start px-[24px] gap-x-[12px] mt-[8px] sm:flex-nowrap flex-wrap gap-y-[12px] sm:gap-y-0">
            {rangeFilterOptions.map((option) => (
              <Button
                key={option.value}
                label={option.label}
                variant="outline"
                size="xs"
                active={selectedRange === option.value}
                className={'font-[500]'}
                onClick={() =>
                  handleRangeFilterClick(option.value as SelectedRange)
                }
              />
            ))}
          </div>

          {/* Date range filter options */}
          <div className="w-full flex flex-col items-start justify-between px-[24px] gap-y-[12px] mt-[24px]">
            <h3
              className={cn(
                'text-[16px] font-[600] leading-[24px] tracking-[-0.4px] text-[#131316] content-center align-middle',
                !validateDateFilters &&
                  dates.length === 2 &&
                  dates.every((date) => date !== undefined) &&
                  'text-[#FF0000]',
              )}
            >
              Date Range
            </h3>
            <div className="w-full">
              <DatePickerComponent
                placeholder="Select Date"
                dates={dates}
                setDates={(...args) => {
                  setDates(...args)
                  setSelectedRange('range')
                }}
                placeholders={['Start Date', 'End Date'] as const}
              />
            </div>
          </div>

          {/* Transaction type filter options */}
          <div className="w-full flex flex-col items-start justify-between px-[24px] gap-y-[12px] mt-[24px]">
            <h3 className="text-[16px] font-[600] leading-[24px] tracking-[-0.4px] text-[#131316] content-center align-middle">
              Transaction Type
            </h3>
            <div className="w-full">
              <MultiSelectComponent
                placeholder="Select Transaction Type"
                selectedOptionsState={transactionTypeSelectedOptions}
                options={transactionTypeOptions}
                setSelectedOptionsState={setTransactionTypeSelectedOptions}
              />
            </div>
          </div>

          {/* Transaction status filter options */}
          <div className="w-full flex flex-col items-start justify-between px-[24px] gap-y-[12px] mt-[24px]">
            <h3 className="text-[16px] font-[600] leading-[24px] tracking-[-0.4px] text-[#131316] content-center align-middle">
              Transaction Status
            </h3>
            <div className="w-full">
              <MultiSelectComponent
                placeholder="Select Transaction Status"
                selectedOptionsState={transactionStatusSelectedOptions}
                options={transactionStatusOptions}
                setSelectedOptionsState={setTransactionStatusSelectedOptions}
              />
            </div>
          </div>

          {/* Chart display filter options */}
          <div className="w-full flex flex-col items-start justify-between px-[24px] gap-y-[12px] mt-[24px]">
            <h3 className="text-[16px] font-[600] leading-[24px] tracking-[-0.4px] text-[#131316] content-center align-middle">
              Chart Display
            </h3>
            <div className="w-full flex flex-row items-center sm:justify-start justify-center gap-x-[12px] mt-[8px] sm:flex-nowrap flex-wrap gap-y-[12px] sm:gap-y-0">
              {chartDisplayOptions.map((option) => (
                <Button
                  key={option.value}
                  label={option.label}
                  variant="outline"
                  size="xs"
                  active={chartDisplay === option.value}
                  className={'font-[500] w-full flex-1'}
                  onClick={() => setChartDisplay(option.value as ChartDisplay)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white z-50 bottom-[20px] left-0 right-0 sm:w-full w-[calc(100%-32px)] flex flex-row items-center justify-between sm:px-[24px] px-[16px] gap-x-[12px]">
        <Button
          label="Clear"
          variant="outline"
          size="lg"
          className={'text-[16px] leading-[24px] w-full'}
          onClick={clearFilters}
        />
        <Button
          label="Apply"
          variant="primary"
          size="lg"
          className={'text-[16px] leading-[24px] w-full'}
          disabled={!canFilter}
          onClick={handleApplyFilters}
        />
      </div>
    </DrawerComponent>
  )
}
