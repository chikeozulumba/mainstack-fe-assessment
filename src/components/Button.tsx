import type { ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

export function Button({
  className,
  children,
  label = 'Click me',
  leftIcon,
  rightIcon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  active = false,
  ...props
}: {
  className?: ClassValue
  children?: React.ReactNode
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  active?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  let defaultClassName = 'bg-primary text-white leading-[24px]'

  if (variant === 'secondary') {
    defaultClassName = 'bg-[#EFF1F6] text-[#131316]'
  }

  if (variant === 'outline') {
    defaultClassName =
      'border-[1px] border-[#EFF1F6] text-[#131316] bg-transparent hover:bg-[#EFF1F6] bg-white'
  }

  if (active && variant === 'outline') {
    defaultClassName += ' bg-[#EFF1F6] text-[#131316]'
  }

  if (active && variant === 'secondary') {
    defaultClassName += ' bg-[#EFF1F6] text-[#131316]'
  }

  if (active && variant === 'primary') {
    defaultClassName += ' bg-[#131316] text-[#EFF1F6]'
  }

  if (size === 'xs') {
    defaultClassName +=
      ' px-[18px] py-[10px] tracking-[-0.4px] text-[14px] leading-[16px]'
  }

  if (size === 'sm') {
    defaultClassName +=
      ' px-[24px] py-[8px] tracking-[-0.4px] text-[16px] leading-[24px]'
  }

  if (size === 'md') {
    defaultClassName +=
      ' px-[30px] py-[12px] tracking-[-0.4px] text-[16px] leading-[24px]'
  }

  if (size === 'lg') {
    defaultClassName +=
      ' px-[52px] py-[14px] tracking-[-0.4px] text-[16px] leading-[24px]'
  }

  if (rightIcon || leftIcon) {
    defaultClassName += ' inline-flex items-center justify-center gap-x-[8px]'
  }

  if (disabled) {
    defaultClassName += ' opacity-50 cursor-not-allowed'
  }

  return (
    <button
      className={cn(
        'rounded-[100px] font-[600] text-[16px] cursor-pointer whitespace-nowrap',
        defaultClassName,
        className,
      )}
      {...props}
    >
      <>
        {leftIcon && leftIcon} {children || label} {rightIcon && rightIcon}
      </>
    </button>
  )
}
