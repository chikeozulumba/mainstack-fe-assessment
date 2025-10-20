import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Checkbox } from './ui/checkbox'

import type { SelectedOption } from '@/types'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'

type MultiSelectComponentProps = {
  placeholder: string
  options: Array<SelectedOption>
  selectedOptionsState: { [key: string]: SelectedOption | undefined }
  setSelectedOptionsState: (selectedOptions: {
    [key: string]: SelectedOption | undefined
  }) => void
}

const MultiSelectTrigger = ({
  placeholder,
  selectedOptions = {},
  active,
  ...props
}: {
  placeholder: string
  selectedOptions: {
    [key: string]: SelectedOption | undefined
  }
  active: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const formattedPlaceholder = useMemo(() => {
    let val = placeholder
    if (Object.keys(selectedOptions).length === 0) {
      val = placeholder
    } else {
      val = Object.values(selectedOptions)
        .filter((option) => option !== undefined)
        .map((option) => option.label)
        .join(', ')
    }

    return val || placeholder
  }, [selectedOptions, placeholder])

  return (
    <button
      className={cn(
        'p-[16px] relative w-full flex items-center justify-between h-[48px] rounded-[12px] border-[3px] text-[#131316] text-left pr-[32px] text-[14px] font-[500] leading-[16px] tracking-[-0.2px] content-center align-middle',
        active && 'border-[#131316]',
        !active && 'border-[#EFF1F6] bg-[#EFF1F6]',
      )}
      {...props}
    >
      <span className="truncate">{formattedPlaceholder}</span>
      <ChevronDownIcon
        className={cn('w-4 h-4 absolute right-[16px]', active && 'rotate-180')}
      />
    </button>
  )
}

export function MultiSelectComponent({
  placeholder = 'Select Options',
  selectedOptionsState = {},
  setSelectedOptionsState = () => {},
  options = [],
}: MultiSelectComponentProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [triggerWidth, setTriggerWidth] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [])

  const handleOpenChange = (o: boolean) => {
    setOpen(o)
  }

  function onCheckedChange(
    key: string,
    option: SelectedOption,
    checked: boolean,
  ) {
    setSelectedOptionsState({
      ...selectedOptionsState,
      [key]: checked ? option : undefined,
    })
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          ref={triggerRef}
          className="w-full flex flex-row items-center justify-between gap-x-[12px]"
        >
          <MultiSelectTrigger
            placeholder={placeholder}
            selectedOptions={selectedOptionsState}
            active={open && options.length > 0}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 py-0"
        style={{
          width: triggerWidth > 0 ? triggerWidth : undefined,
          display: options.length > 0 ? 'block' : 'none',
        }}
      >
        <div
          className="w-full h-full flex flex-col items-start justify-between gap-y-[2px] p-[8px]"
          style={{
            width: triggerWidth > 0 ? triggerWidth : undefined,
            maxHeight: '314px',
            overflowY: 'scroll',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="w-full flex flex-row items-center gap-x-[12px] p-[16px] cursor-pointer"
            >
              <Checkbox
                className="h-[17px] w-[17px]"
                checked={!!selectedOptionsState[option.key]}
                onCheckedChange={(checked) =>
                  onCheckedChange(
                    option.key,
                    option,
                    typeof checked === 'boolean' ? checked : false,
                  )
                }
              />
              <span className="text-[#131316] text-[16px] font-[600] leading-[24px] tracking-[-0.4px]">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
