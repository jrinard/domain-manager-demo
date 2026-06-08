import { cva, mergeClasses } from '@falcon/style'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from '@falcon/style'
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export const DialogPortal = ({
  ...props
}: DialogPrimitive.DialogPortalProps & { className?: string }) => (
  <DialogPrimitive.Portal {...props} />
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={mergeClasses(
      'bg-site-bg state-open:animate-in state-closed:animate-out state-closed:fade-out-0 state-open:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const contentVariants = cva(
  'bg-site-bg text-site-fg state-open:animate-in state-closed:animate-out state-closed:fade-out-0 state-open:fade-in-0 state-closed:zoom-out-95 state-open:zoom-in-95 state-closed:slide-out-to-left-2/3 state-closed:slide-out-to-top-2/3 state-open:slide-in-from-left-1/2 state-open:slide-in-from-top-1/2 fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 items-center gap-4 overflow-y-auto border border-neutral-700 px-5 py-7 shadow-lg duration-200 sm:rounded-lg md:w-full',
  {
    variants: {
      maxHeight: {
        base: 'max-h-screen-almost',
        full: 'max-h-full',
        screen: 'max-h-screen',
        unset: 'max-h-none',
      },
      maxWidth: {
        micro: 'max-w-6',
        xshort: 'max-w-14',
        short: 'max-w-24',
        medium: 'max-w-40',
        base: 'max-w-lg',
        lg: 'max-w-xl',
        xl: 'max-w-2xl',
        xxl: 'max-w-3xl',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      maxHeight: 'base',
      maxWidth: 'base',
    },
  },
)

export type ContentVariants = VariantProps<typeof contentVariants>
type DialogContentProps = typeof DialogPrimitive.Content & {
  closeOnInteractionOutside?: boolean
} & ContentVariants

// * For some reason `ComponentPropsWithoutRef` strips `DialogContentProps` of its `maxWidth` prop, so it is being mnually added back in this way.
type MutatedProps = ComponentPropsWithoutRef<DialogContentProps> & {
  closeOnInteractionOutside?: boolean
} & ContentVariants

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  MutatedProps
>(
  (
    {
      className,
      children,
      closeOnInteractionOutside = true,
      maxWidth,
      ...props
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={mergeClasses(
          contentVariants({ maxWidth }),
          'max-h-full',
          className,
        )}
        {...(closeOnInteractionOutside
          ? {}
          : {
              onInteractOutside: (event) => event.preventDefault?.(),
            })}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
)
DialogContent.displayName = DialogPrimitive.Content.displayName
