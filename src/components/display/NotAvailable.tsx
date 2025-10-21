import { useMediaQuery } from 'usehooks-ts'

import { Button } from '../Button'

import { cn } from '@/lib/utils'

import NAIcon from '@/assets/svgs/na-icon.svg?react'

type NotAvailableProps = {
  className?: string
  onClick?: () => void
}

export function NotAvailable({ className, onClick }: NotAvailableProps) {
  const isSm = useMediaQuery('(max-width: 640px)')
  return (
    <div
      className={cn(
        'w-full max-w-[369px] mx-auto h-full flex flex-col items-start justify-center',
        className,
      )}
    >
      <NAIcon className="sm:h-[48px] h-[40px] sm:w-[48px] w-[40px]" />
      <div className="sm:mt-[20px] mt-[10px]">
        <h1 className="sm:text-[28px] text-[20px] font-[700] tracking-[-0.6px]">
          No matching transaction found for the selected filter
        </h1>
        <h3 className="sm:font-[500] font-[400] sm:text-[16px] text-[14px] leading-[24px] tracking-[-0.2px] sm:mt-[10px] mt-[4px]">
          Change your filters to see more results, or add a new product.
        </h3>
      </div>

      <Button
        variant="secondary"
        label="Clear Filter"
        className={'sm:mt-[32px] mt-[16px]'}
        onClick={onClick}
        size={isSm ? 'xs' : undefined}
      />
    </div>
  )
}
