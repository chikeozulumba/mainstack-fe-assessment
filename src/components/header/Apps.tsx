import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

import ArrowDownIcon from '@/assets/svgs/arrow-down.svg?react'
import CoursesIcon from '@/assets/svgs/brand/courses.svg?react'
import InvoicingIcon from '@/assets/svgs/brand/invoicing.svg?react'
import LinkInBioIcon from '@/assets/svgs/brand/linkinbio.svg?react'
import StorefrontIcon from '@/assets/svgs/brand/storefront.svg?react'
import { cn } from '@/lib/utils'

type AppsSideComponentProps = {
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const menuItems = [
  {
    label: 'Storefront',
    description: 'Create a sales driven storefront.',
    icon: StorefrontIcon,
  },
  {
    label: 'Link In Bio',
    description: 'Create a link in bio.',
    icon: LinkInBioIcon,
  },
  {
    label: 'Invoicing',
    description: 'Create an invoice that converts.',
    icon: InvoicingIcon,
  },
  {
    label: 'Hosted Courses',
    description: 'Monetize your knowledge.',
    icon: CoursesIcon,
  },
]

export function AppsSideComponent({
  open,
  onOpenChange,
}: AppsSideComponentProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="w-full flex flex-row items-center justify-between gap-x-[12px] border-l-[0.5px] border-[#EFF1F6]/10 pl-[14px] ml-[6px] h-full">
          <span className="truncate max-w-[100px] w-full">
            {typeof activeIndex === 'number'
              ? menuItems[activeIndex]?.label
              : 'Select app'}
          </span>

          <ArrowDownIcon width={'11px'} height={'7px'} className="mt-[2px]" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="popover-content px-0 py-0 mt-[42px] border-none w-[400px]">
        <div className="w-full flex flex-col h-[fill-available] items-start justify-between p-[8px bg-[rgb(255, 255, 255)]">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                'w-full flex flex-row items-center justify-start gap-y-[0px] gap-x-[12px] cursor-pointer rounded-[12px] p-[12px] h-[80px]',
                index !== 0 && 'mt-[8px]',
              )}
              onClick={() => {
                setActiveIndex(index)
                onOpenChange?.(false)
              }}
            >
              <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#fff] rounded-[12px] border-[1px] border-[#EFF1F6]">
                <item.icon width={'20px'} height={'20px'} />
              </div>
              <div className="flex flex-col items-start justify-between gap-y-[0px]">
                <h4 className="text-[#131316] text-[18px] font-[600] leading-[120%] tracking-[-0.1px]">
                  {item.label}
                </h4>
                <p className="text-[#56616B] text-[16px] font-[500] leading-[160%] tracking-[-0.1px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
