import ExclaimationIcon from '@/assets/svgs/exclaimation.svg?react'

import { cn } from '@/lib/utils'

type SideMetricsComponentProps = {
  options: Array<{
    title: string
    value: string | number
  }>
}

export function SideMetricsComponent<T extends SideMetricsComponentProps>({
  options = [],
}: T) {
  return options.map((option, index) => (
    <div
      className={cn('w-full', index !== 0 && 'mt-[32px]')}
      key={option.title}
    >
      <div className="inline-flex items-center justify-between w-full">
        <h2 className="text-[14px] font-[500] leading-[16px] tracking-[-0.2px] text-[#56616B] text-start content-center align-middle">
          {option.title}
        </h2>
        <ExclaimationIcon className="w-[15.83px] h-[15.83px] text-[#888F95]" />
      </div>
      <h3 className="text-[28px] font-[700] leading-[38px] tracking-[-0.6px] text-[#131316] text-start content-center align-middle">
        {option.value}
      </h3>
    </div>
  ))
}
