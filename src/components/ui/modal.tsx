import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Drawer } from 'vaul'

import { cn } from '@/lib/utils'

import { Dialog, DialogContent, DialogTitle } from './dialog'
import { useMediaQuery } from '@/hooks/use-media-query'

interface ModalProps {
  children?: ReactNode
  className?: string
  showModal?: boolean
  setShowModal?: Dispatch<SetStateAction<boolean>>
  onClose?: () => void
  desktopOnly?: boolean
  preventDefaultClose?: boolean
}

export const Modal = ({
  children,
  className,
  desktopOnly,
  /* eslint-disable @typescript-eslint/no-empty-function */
  onClose = () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
  preventDefaultClose = false,
  setShowModal,
  showModal,
}: ModalProps) => {
  const closeModal = ({ dragged }: { dragged?: boolean }) => {
    if (preventDefaultClose && !dragged) {
      return
    }

    onClose()

    if (setShowModal) {
      setShowModal(false)
    } else {
      console.warn('setShowModal is undefined, modal cannot be closed.')
    }
  }

  const { isMobile } = useMediaQuery()

  if (isMobile && !desktopOnly) {
    return (
      <Drawer.Root
        open={showModal ?? true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true })
          }
        }}
      >
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 mt-24 !max-w-none rounded-t-[10px] border-t border-gray-200 bg-white',
              className
            )}
          >
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>

            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
    <Dialog
      open={showModal ?? true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal({ dragged: true })
        }
      }}
    >
      <DialogTitle className="sr-only">Dialog</DialogTitle>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  )
}
