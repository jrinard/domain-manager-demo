import { Icon } from '@falcon/icons'
import * as React from 'react'
import { cva, VariantProps, mergeClasses } from '@falcon/style'
import * as SheetPrimitive from '@radix-ui/react-dialog'

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={mergeClasses(
      'state-open:animate-in state-closed:animate-out state-closed:fade-out-0 state-open:fade-in-0 bg-overlay fixed inset-0 z-50',
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  'bg-site-bg text-site-fg border-border state-open:animate-in state-closed:animate-out state-closed:duration-300 state-open:duration-500 fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out',
  {
    variants: {
      side: {
        top: 'state-closed:slide-out-to-top state-open:slide-in-from-top inset-x-0 border-b',
        bottom:
          'state-closed:slide-out-to-bottom state-open:slide-in-from-bottom inset-x-0 bottom-0 border-t',
        left: 'state-closed:slide-out-to-left state-open:slide-in-from-left left-0 w-3/4 border-r sm:max-w-sm',
        right:
          'state-closed:slide-out-to-right state-open:slide-in-from-right right-0 w-3/4 border-l sm:max-w-sm',
      },
      height: {
        full: 'h-full inset-y-0',
        screen: 'h-screen inset-y-0',
        screenMinusTopbar: 'h-screen-minus-topbar top-topbar-height bottom-0',
      }
    },
    defaultVariants: {
      side: 'right',
      height: "screenMinusTopbar"
    },
  },
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', height = "screenMinusTopbar", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      {...props}
      ref={ref}
      className={mergeClasses(sheetVariants({ side, height }), className)}
    >
      {children}
      <SheetPrimitive.Close className="state-open:bg-accent focus:ring-ring absolute right-4 top-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
        <Icon icon="close" size="lg" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={mergeClasses(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={mergeClasses(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={mergeClasses(
      'font-body text-site-fg text-lg font-semibold',
      className,
    )}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={mergeClasses('text-muted-fg text-sm', className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
