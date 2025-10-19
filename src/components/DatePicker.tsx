import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

import { Calendar } from './ui/calendar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'

const DatePickerTrigger = ({
  placeholder,
  date,
  active,
  ...props
}: {
  placeholder: string
  date: string | Date | undefined
  active: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const formattedDate = date
    ? formatDate(date, {
        isISO: true,
        fromFormat: '', // ISO 8601 format
        toFormat: 'PPP',
      })
    : undefined

  return (
    <button
      className={cn(
        'p-[16px] w-full flex items-center justify-between h-[48px] rounded-[12px] border-[3px]',
        active && 'border-[#131316]',
        !active && 'border-[#EFF1F6] bg-[#EFF1F6]',
      )}
      {...props}
    >
      <span className="text-[#131316] text-[14px] font-[600] leading-[16px] tracking-[-0.2px] content-center align-middle">
        {formattedDate || placeholder}
      </span>
      <ChevronDownIcon className={cn('w-4 h-4', active && 'rotate-180')} />
    </button>
  )
}

type DatePickerComponentProps = {
  placeholder: string
  placeholders?: Array<string>
  dates: Array<Date | undefined | string>
  setDates: (dates: Array<Date | undefined | string>) => void
}

export function DatePickerComponent({
  placeholder = 'Select Date',
  placeholders,
  dates,
  setDates,
}: DatePickerComponentProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [triggerWidth, setTriggerWidth] = useState<number>(0)
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  const handleDateChange = (index: number, date: Date) => {
    const newDates = [...dates]
    newDates[index] = date

    setDates(newDates)
    setActiveIndex(undefined)
    setOpen(false)
  }

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [])

  if (dates.length === 0) {
    return null
  }

  const handleOpenChange = (o: boolean) => {
    if (!o) setActiveIndex(undefined)
    setOpen(o)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          ref={triggerRef}
          className="w-full flex flex-row items-center justify-between gap-x-[12px]"
        >
          {dates.map((date, index) => (
            <DatePickerTrigger
              key={index}
              placeholder={placeholders?.[index] || placeholder}
              onClick={() => setActiveIndex(index)}
              date={date}
              active={activeIndex === index}
            />
          ))}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 py-0"
        style={{ width: triggerWidth > 0 ? triggerWidth : undefined }}
      >
        <div
          className="w-full flex flex-col items-start justify-between gap-y-[12px]"
          style={{ width: triggerWidth > 0 ? triggerWidth : undefined }}
        >
          <Calendar
            className="w-full"
            mode="single"
            selected={dates[activeIndex ?? 0] as Date}
            onSelect={(date) => {
              if (date && activeIndex !== undefined) {
                handleDateChange(activeIndex, date)
              }
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
