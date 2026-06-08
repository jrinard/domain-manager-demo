import { mergeClasses } from '@falcon/style'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={mergeClasses(
      'font-body text-site-fg text-xl font-bold uppercase leading-none',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

export { DialogTitle }
