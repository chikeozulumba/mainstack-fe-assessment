import { useMemo } from 'react'

import MenuIcon from '@/assets/svgs/menu.svg?react'
import { useAuth } from '@/providers'

function AvatarComponent({ name }: { name?: string }) {
  const { user } = useAuth()
  const initials = useMemo(() => {
    let nameToFormat = `${user?.first_name || ''} ${user?.last_name || ''}`
    if (name) {
      nameToFormat = name
    }

    return nameToFormat
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
  }, [user])

  return (
    <span
      id="avatar-name"
      className="text-[16px] font-bold h-[32px] w-[32px] flex items-center justify-center rounded-[100px]"
    >
      <span className="text-white">{initials}</span>
    </span>
  )
}

function AvatarMenuComponent() {
  return (
    <div className="h-[32px] w-[32px] flex items-center justify-center">
      <MenuIcon width={'17px'} height={'10.55px'} />
    </div>
  )
}

function AvatatWrapperComponent() {
  return (
    <button className="h-[40px] w-[81px] text-[#56616B] flex items-center justify-between bg-[#EFF1F6] rounded-[100px] px-[5px] cursor-pointer transition-all duration-200">
      <AvatarComponent />
      <AvatarMenuComponent />
    </button>
  )
}

const Avatar = {
  Picture: AvatarComponent,
  MenuButton: AvatarMenuComponent,
  Main: AvatatWrapperComponent,
}

export { Avatar }
