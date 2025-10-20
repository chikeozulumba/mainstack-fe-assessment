import { Link, useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { AvatarComponent } from './Avatar'
import { AppsSideComponent } from './header/Apps'
import { ProfileDropdownComponent } from './header/ProfileDropdown'

import AnalyticsIcon from '@/assets/svgs/analytics.svg?react'
import AppsIcon from '@/assets/svgs/app.svg?react'
import BellIcon from '@/assets/svgs/bell.svg?react'
import CashIcon from '@/assets/svgs/cash.svg?react'
import ChatIcon from '@/assets/svgs/chat.svg?react'
import CRMIcon from '@/assets/svgs/crm.svg?react'
import HomeIcon from '@/assets/svgs/home.svg?react'
import Logo from '@/assets/svgs/logo.svg?react'
import MenuIcon from '@/assets/svgs/menu.svg?react'

const menuItems = [
  {
    label: 'Home',
    to: '/',
    icon: HomeIcon,
    style: {
      height: '20px',
      width: '13.67px',
    },
  },
  {
    label: 'Analytics',
    to: '/#analytics',
    icon: AnalyticsIcon,
    style: {
      height: '14.05px',
      width: '14.05px',
    },
  },
  {
    label: 'Revenue',
    to: '/#revenue',
    icon: CashIcon,
    style: {
      height: '20px',
      width: '20px',
    },
  },
  {
    label: 'CRM',
    to: '/#crm',
    icon: CRMIcon,
    style: {
      height: '20px',
      width: '20px',
    },
  },
  {
    label: 'Apps',
    to: '/#apps',
    icon: AppsIcon,
    style: {
      height: '14.36px',
      width: '14.34px',
    },
    side: AppsSideComponent,
  },
]

const auxMenuItems = [
  {
    label: 'Notifications',
    to: '/#notifications',
    icon: BellIcon,
  },
  {
    label: 'Messages',
    to: '/#messages',
    icon: ChatIcon,
  },
]

export default function Header() {
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState<string | undefined>(undefined)
  const isActive = (itemPath: string) => {
    // Extract hash from item path (e.g., "/#analytics" -> "#analytics")
    const itemHash = itemPath.includes('#') ? itemPath.split('#')[1] : ''

    // If item is home (no hash), check if activePath is "/"
    if (!location.hash) {
      return itemPath === '/'
    }

    // Otherwise, check if the hash matches (without the # symbol)
    return location.hash === `${itemHash}`
  }

  return (
    <>
      <header
        id="header"
        className="p-4 flex items-center justify-between shadow-lg max-w-[1408px] mx-auto h-[64px] sticky top-0 z-[9] mt-[16px] rounded-[100px] w-full bg-white transition-shadow duration-300 hover:shadow-xl"
      >
        <Link
          to="/"
          className="text-[#131316] transition-transform duration-200 hover:scale-110 active:scale-95 inline-block"
        >
          <Logo height={36} width={36} />
        </Link>

        <div className="flex items-center">
          {menuItems.map((item, index) => {
            const active = isActive(item.to)
            const isActiveMenu = activeMenu === item.to
            return (
              <Link
                onClick={() => setActiveMenu(item.to)}
                to={item.to}
                className={`transition-all duration-300 ease-in-out tracking-[-0.4px] inline-flex items-center gap-2 h-[40px] px-[14px] divide-y-0 divide-[red] font-[600] text-[16px] ${
                  index !== 0 ? 'ml-[20px]' : 'ml-[0px]'
                } ${
                  active
                    ? 'bg-[#131316] text-white rounded-[100px] text-center leading-[24px] shadow-md'
                    : 'text-[#56616B] hover:text-[#131316]'
                }`}
                key={item.label}
              >
                <div className="flex items-center justify-center h-[20px] w-[20px]">
                  <item.icon
                    width={item.style.width}
                    height={item.style.height}
                    className="transition-transform duration-300"
                  />
                </div>

                {item.label}
                {item.side && isActiveMenu && (
                  <item.side
                    open={isActiveMenu}
                    onOpenChange={() => {
                      setActiveMenu(undefined)
                    }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-[8px]">
          {auxMenuItems.map((item) => (
            <button
              className="h-[40px] w-[40px] text-[#56616B] flex items-center justify-center transition-all duration-200 hover:text-[#131316]"
              key={item.label}
            >
              <item.icon width={'20px'} height={'20px'} />
            </button>
          ))}

          <ProfileDropdownComponent>
            <button className="h-[40px] w-[81px] text-[#56616B] flex items-center justify-between bg-[#EFF1F6] rounded-[100px] px-[5px] cursor-pointer transition-all duration-200">
              <AvatarComponent />

              <div className="h-[32px] w-[32px] flex items-center justify-center">
                <MenuIcon width={'17px'} height={'10.55px'} />
              </div>
            </button>
          </ProfileDropdownComponent>
        </div>
      </header>
    </>
  )
}
