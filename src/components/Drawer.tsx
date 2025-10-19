import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

import { cn } from '@/lib/utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function DrawerComponent({
  isOpen,
  onClose,
  children,
  className,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#e8e8e8]/70 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700 max-w-[520px]"
            >
              <div className="relative flex h-full flex-col overflow-y-auto bg-transparent after:absolute after:inset-y-0 after:left-0 after:w-px p-[12px] w-full">
                <div
                  className={cn(
                    'shadow-xl bg-white rounded-[20px] h-full',
                    className,
                  )}
                >
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
