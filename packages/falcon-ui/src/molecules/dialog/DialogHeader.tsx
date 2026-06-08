import * as DialogPrimitive from '@radix-ui/react-dialog'
import React, { HTMLAttributes } from 'react'
import { mergeClasses } from '@falcon/style'
import { Icon } from '@falcon/icons'
import { IconButtonVariants } from '../iconButton/IconButton'

const DialogHeader = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={mergeClasses(
      'flex flex-row items-center justify-between self-stretch',
      className
    )}
    {...props}
  >
    {children}
    <DialogPrimitive.Close className={mergeClasses(IconButtonVariants())}>
      <Icon icon="close" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  </div>
)
DialogHeader.displayName = 'DialogHeader'

export { DialogHeader }
