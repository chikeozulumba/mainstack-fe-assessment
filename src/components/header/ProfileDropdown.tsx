import {
  BugAntIcon,
  CogIcon,
  GiftIcon,
  NewspaperIcon,
  PowerIcon,
  SwatchIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { Link } from '@tanstack/react-router'
import { AvatarComponent } from '../Avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

import { cn } from '@/lib/utils'

type ProfileDropdownComponentProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const menuItems = [
  {
    label: 'Settings',
    icon: CogIcon,
  },
  {
    label: 'Purchase History',
    icon: NewspaperIcon,
  },
  {
    label: 'Refer and Earn',
    icon: GiftIcon,
  },
  {
    label: 'Integrations',
    icon: SwatchIcon,
  },
  {
    label: 'Report Bug',
    icon: BugAntIcon,
  },
  {
    label: 'Switch Account',
    icon: UsersIcon,
  },
  {
    label: 'Sign Out',
    icon: PowerIcon,
  },
]

export function ProfileDropdownComponent({
  onOpenChange = () => {},
  children,
}: ProfileDropdownComponentProps) {
  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="popover-content-profile px-0 py-0 mt-[26px] border-none w-[300px] rounded-[8px]"
      >
        <div className="w-full flex flex-col h-[fill-available] items-start justify-between">
          <div className="flex items-center justify-start gap-x-[12px] p-[14px] border-b-[1px] border-[#EFF1F6]/50 w-full">
            <AvatarComponent />
            <div className="flex flex-col items-start justify-between gap-y-[0px]">
              <h4 className="text-[#131316] text-[18px] font-[600] leading-[120%] tracking-[-0.1px]">
                John Doe
              </h4>
              <p className="text-[#56616B] text-[14px] font-[500] leading-[160%] tracking-[-0.1px] -mt-[2px]">
                john.doe@example.com
              </p>
            </div>
          </div>
          {menuItems.map((item, index) => (
            <Link
              to={'/'}
              key={index}
              className={cn(
                'w-full flex flex-row items-center justify-start gap-y-[0px] gap-x-[12px] cursor-pointer p-[12px] hover:bg-[#EFF1F6]',
                // index !== 0 && 'mt-[8px]',
              )}
              onClick={() => onOpenChange(false)}
            >
              <item.icon width={'18px'} height={'18px'} />

              <h4 className="text-[#131316] text-[16px] font-[500] leading-[120%] tracking-[-0.1px]">
                {item.label}
              </h4>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
