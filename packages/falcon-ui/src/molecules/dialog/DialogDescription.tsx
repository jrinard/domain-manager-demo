import { mergeClasses } from '@falcon/style'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

/**
 * Please read https://www.radix-ui.com/docs/primitives/components/dialog#description
 * An optional accessible description to be announced when the dialog is opened.
 *  If you want to hide the description, wrap it inside our Visually Hidden utility like this `<VisuallyHidden asChild>`.
 *  If you want to remove the description entirely, remove this part and pass `aria-describedby={undefined}` to `DialogContent`.
 */
const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={mergeClasses('text-muted text-sm', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export { DialogDescription }
