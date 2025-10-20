import { useState } from 'react'

import { cn } from '@/lib/utils'

import BarIcon from '@/assets/svgs/app/bar.svg?react'
import KitIcon from '@/assets/svgs/app/kit.svg?react'
import LinkIcon from '@/assets/svgs/app/link.svg?react'
import ListIcon from '@/assets/svgs/app/list.svg?react'

const menuItems = [
  { label: 'Link', icon: LinkIcon },
  { label: 'Kit', icon: KitIcon },
  { label: 'Bar', icon: BarIcon },
  { label: 'List', icon: ListIcon },
]

export const SideBarComponent = () => {
  const [activeMenu, setActiveMenu] = useState<number>(1)

  return (
    <div
      id="app-sidebar"
      className="bg-white w-[48px] flex flex-col top-[310px] fixed left-[16px] rounded-[100px] items-center justify-center gap-[8px] py-[8px] overflow-hidden"
    >
      {menuItems.map((menu, index) => (
        <button
          key={menu.label}
          className={cn(
            'w-[40px] h-[40px] mx-auto flex items-center justify-center cursor-pointer',
            activeMenu !== index && 'grey-overlay',
          )}
          onClick={() => setActiveMenu(index)}
        >
          <menu.icon />
        </button>
      ))}
    </div>
  )
}
