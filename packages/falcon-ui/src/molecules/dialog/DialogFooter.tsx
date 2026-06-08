import { Button, ButtonProps } from '@falcon/buttons'
import { mergeClasses } from '@falcon/style'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import React, { HTMLAttributes } from 'react'

interface DialogFooterProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  action?: Omit<ButtonProps, 'variant'>
  closeLabel?: string
  completeLabel?: string
  destructiveLabel?: string
  hideCancel?: boolean
}
const DialogFooter = ({
  action,
  className,
  closeLabel,
  destructiveLabel,
  completeLabel,
  hideCancel,
  ...props
}: DialogFooterProps) => {
  if (!!completeLabel && !!destructiveLabel) {
    throw new Error('completeLabel and destructiveLave are mutually exclusive')
  }
  return (
    <div
      className={mergeClasses(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    >
      {!hideCancel && (
        <DialogPrimitive.Close asChild>
          <Button
            className="w-full"
            style={{ color: 'var(--site-fg)' }}
            variant={!!completeLabel || !!destructiveLabel ? 'ghost' : 'primary'}
          >
            {closeLabel || 'Cancel'}
          </Button>
        </DialogPrimitive.Close>
      )}
      {(!!destructiveLabel || !!completeLabel) && (
        <Button
          className="w-full"
          variant={destructiveLabel ? 'danger' : 'primary'}
          {...action}
        >
          {destructiveLabel ? destructiveLabel : completeLabel}
        </Button>
      )}
    </div>
  )
}
DialogFooter.displayName = 'DialogFooter'
export { DialogFooter }
