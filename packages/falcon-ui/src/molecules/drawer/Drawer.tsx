import * as React from 'react'
import * as DrawerPrimitive from '@radix-ui/react-dialog'
import { cva, VariantProps, mergeClasses } from '@falcon/style'

// Styling variants for drawer sides
const drawerVariants = cva(
  'fixed z-50 flex flex-col bg-black text-white shadow-lg transition-transform',
  {
    variants: {
      side: {
        right:
          'inset-y-0 right-0 w-4/5 translate-x-full data-[state=open]:translate-x-0',
        left: 'inset-y-0 left-0 w-4/5 -translate-x-full data-[state=open]:translate-x-0',
        bottom:
          'inset-x-0 bottom-0 h-1/3 translate-y-full data-[state=open]:translate-y-0',
        top: 'inset-x-0 top-0 h-1/3 -translate-y-full data-[state=open]:translate-y-0',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerVariants> {}

const Drawer = DrawerPrimitive.Root
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerClose = DrawerPrimitive.Close

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ side, className, children, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay className="data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn fixed inset-0 bg-black opacity-40" />
    <DrawerPrimitive.Content
      ref={ref}
      className={mergeClasses(drawerVariants({ side }), className)}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
))
DrawerContent.displayName = 'DrawerContent'

export { Drawer, DrawerTrigger, DrawerContent, DrawerClose }
