import { useMemo } from 'react'

export function AvatarComponent({ name = 'John Doe' }: { name?: string }) {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
  }, [name])

  return (
    <span
      id="avatar-name"
      className="text-[16px] font-bold h-[32px] w-[32px] flex items-center justify-center rounded-[100px]"
    >
      <span className="text-white">{initials}</span>
    </span>
  )
}
