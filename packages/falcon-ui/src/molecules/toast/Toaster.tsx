import * as ToastPrimitives from '@radix-ui/react-toast'
import * as React from 'react'
import { mergeClasses } from '@falcon/style'
import { useToast } from '../../hooks/useToast'
import { Toast, ToastActionElement, ToastContent, ToastProps } from './Toast'

export type ToasterToastProps = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  asBanner?: boolean
}
const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={mergeClasses(
      'z-100 md:max-w-130 fixed flex h-screen w-4/5 flex-col p-4 ',
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName
export interface ToasterProps {
  position?: 'left' | 'right'
}

/**
 * Toaster helps you make Toast(s)
 */
const Toaster = ({ position = 'right' }: ToasterProps = {}) => {
  const { toasts } = useToast()

  const viewportClassName = position === 'left' ? 'left-0' : 'right-0'

  return (
    <ToastProvider>
      {toasts.map(function ({ id, ...props }) {
        return (
          <Toast key={id} {...props} position={position}>
            <ToastContent id={id} {...props} />
          </Toast>
        )
      })}
      <ToastViewport className={viewportClassName} />
    </ToastProvider>
  )
}

export default Toaster
export { Toaster, ToastViewport, ToastProvider }
