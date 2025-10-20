import { Button } from '../Button'

import { cn } from '@/lib/utils'

import NAIcon from '@/assets/svgs/na-icon.svg?react'

type NotAvailableProps = {
  className?: string
  onClick?: () => void
}

export function NotAvailable({ className, onClick }: NotAvailableProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[369px] mx-auto h-full flex flex-col items-start justify-center',
        className,
      )}
    >
      <NAIcon className="h-[48px] w-[48px]" />
      <div className="mt-[20px]">
        <h1 className="text-[28px] font-[700] tracking-[-0.6px]">
          No matching transaction found for the selected filter
        </h1>
        <h3 className="font-[500] text-[16px] leading-[24px] tracking-[-0.2px] mt-[10px]">
          Change your filters to see more results, or add a new product.
        </h3>
      </div>

      <Button
        variant="secondary"
        label="Clear Filter"
        className={'mt-[32px]'}
        onClick={onClick}
      />
    </div>
  )
}
