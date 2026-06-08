import * as React from 'react'
import { cva, mergeClasses } from '@falcon/style'
import * as ToastPrimitives from '@radix-ui/react-toast'
import type { VariantProps } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { Icon } from '@falcon/icons'
import { ButtonVariants } from '@falcon/buttons'

import { ToastLeadingIcon } from './ToastLeadingIcon'
const toastVariants = cva(
  mergeClasses(
    'z-100 bg-grayscale-200 dark:bg-grayscale-900 group pointer-events-auto inline-flex items-center justify-start gap-3 rounded-lg border-y border-l-4 border-r px-5 py-4 shadow-lg transition-all',
    'state-open:animate-in state-open:slide-in-from-top-full state-open:sm:slide-in-from-bottom-full',
    'state-closed:animate-out state-closed:fade-out-80',
    'swipe-direction-right:swipe-end:animate-toast-swipe-out-x',
    'swipe-direction-right:translate-x-toast-swipe-move-x',
    'swipe-direction-down:swipe-end:animate-toast-swipe-out-y',
    'swipe-direction-down:translate-y-toast-swipe-move-y',
    'swipe-cancel:fade-out-80 swipe-cancel:animate-out swipe-cancel:duration-200 swipe-cancel:ease-out',
  ),
  {
    variants: {
      asBanner: {
        true: 'fixed inset-x-0 bottom-auto top-0 w-full',
        false: 'fixed bottom-0 top-auto m-4',
      },
      position: {
        left: [
          'left-0',
          'state-closed:slide-out-to-left-full',
          'swipe-cancel:slide-out-to-left-full',
        ],
        right: [
          'right-0',
          'state-closed:slide-out-to-right-full',
          'swipe-cancel:slide-out-to-right-full',
        ],
      },
      variant: {
        failed: 'border-error text-secondary',
        error: 'border-muted text-secondary-fg',
        info: 'border-info text-secondary-fg',
        warn: 'border-warning text-secondary-fg',
        success: 'border-success text-secondary-fg',
        emphasized: 'text-secondary-fg bg-warning-subtle border-none',
      },
    },
    defaultVariants: {
      variant: 'error',
      asBanner: false,
      position: 'right',
    },
  },
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & {
      bannerContent?: ReactNode
      position?: 'left' | 'right'
    }
>(
  (
    { className, variant, bannerContent, asBanner, position, ...props },
    ref,
  ) => {
    return (
      <ToastPrimitives.Root
        {...props}
        ref={ref}
        className={mergeClasses(
          toastVariants({ variant, asBanner, position }),
          className,
        )}
      />
    )
  },
)
Toast.displayName = ToastPrimitives.Root.displayName

interface ToastContentProps extends Omit<ToastProps, 'title'> {
  id: string
  title?: ReactNode
  description?: ReactNode
  action?: ToastActionElement
}

const ToastContent = ({
  variant,
  title,
  action,
  description,
  asBanner,
  bannerContent,
}: ToastContentProps) => {
  return (
    <div className={`flex ${asBanner ? 'w-full' : 'w-96'}`}>
      <div className="flex shrink flex-col items-start justify-center">
        <ToastLeadingIcon variant={variant} />
      </div>
      <div className="flex flex-1 grow self-stretch pl-4 md:flex-row">
        {asBanner && bannerContent}
        {!bannerContent && (
          <div className="flex flex-1 grow flex-col items-start gap-1 self-stretch">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
        )}
        {action && (
          <div className="-ml-1 flex h-full shrink flex-col items-start justify-center pb-2 pt-4 md:ml-0 md:items-center md:py-2 md:pl-3">
            {action}
          </div>
        )}
      </div>
      {asBanner && (
        <div className="flex h-full shrink flex-col items-center justify-center">
          <ToastClose />
        </div>
      )}
    </div>
  )
}
ToastContent.displayName = 'ToastContent'

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={mergeClasses(ButtonVariants({ variant: 'primary' }), className)}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={mergeClasses(
      'text-secondary-fg hover:text-secondary-fg rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
      className,
    )}
    toast-close="true"
    {...props}
  >
    <Icon icon="close" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={mergeClasses('font-body text-xl font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={mergeClasses('font-body text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  Toast,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
