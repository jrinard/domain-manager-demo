import * as DialogPrimitive from '@radix-ui/react-dialog'
import { get } from 'lodash'
import React, { Children, PropsWithChildren, ReactNode } from 'react'

import type { ContentVariants } from './DialogContent'
import { DialogContent } from './DialogContent'
import { DialogDescription } from './DialogDescription'
import { DialogFooter } from './DialogFooter'
import { DialogHeader } from './DialogHeader'
import { DialogTitle } from './DialogTitle'
import { ButtonProps } from '../../index'

const DialogTrigger = DialogPrimitive.Trigger

export interface DialogProps
  extends PropsWithChildren,
    DialogPrimitive.DialogProps,
    ContentVariants {
  action?: Omit<ButtonProps, 'variant'>
  title: React.ReactNode
  className?: string
  closeLabel?: string
  closeOnInteractionOutside?: boolean
  completeLabel?: string
  destructiveLabel?: string
  description?: string
  hideCancel?: boolean
}

const Dialog = ({
  children,
  closeLabel,
  closeOnInteractionOutside = true,
  description,
  title,
  className,
  onOpenChange,
  maxWidth,
  ...props
}: DialogProps) => {
  const dialogContentChildren: ReactNode[] = []
  let triggerNode: ReactNode | undefined
  let footerNode: ReactNode = (
    <DialogFooter
      closeLabel={closeLabel}
      completeLabel={props.completeLabel}
      destructiveLabel={props.destructiveLabel}
      action={props.action}
      hideCancel={props.hideCancel}
    />
  )
  Children.toArray(children).forEach((item) => {
    const itemType = get(item, 'type', null)
    if (itemType === DialogTrigger) {
      triggerNode = item
    } else if (itemType === DialogFooter) {
      footerNode = item
    } else if (itemType === DialogContent) {
      throw new Error(`DialogContent should not be used directly`)
    } else if (itemType === DialogHeader) {
      throw new Error(`DialogHeader should not be used directly`)
    } else if (itemType === DialogDescription) {
      throw new Error(`DialogDescription should not be used directly`)
    } else if (itemType === DialogTitle) {
      throw new Error(`DialogTitle should not be used directly`)
    } else {
      dialogContentChildren.push(item)
    }
  })
  return (
    <DialogPrimitive.Root {...props} onOpenChange={onOpenChange}>
      {triggerNode}
      <DialogContent
        className={className}
        closeOnInteractionOutside={closeOnInteractionOutside}
        maxWidth={maxWidth}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {description && <DialogDescription>{description}</DialogDescription>}
        {dialogContentChildren}
        {footerNode}
      </DialogContent>
    </DialogPrimitive.Root>
  )
}

export { Dialog, DialogTrigger, DialogFooter }
