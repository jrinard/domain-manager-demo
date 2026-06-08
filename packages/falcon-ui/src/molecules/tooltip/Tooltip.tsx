import React, { PropsWithChildren, ReactNode, ComponentProps } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { TooltipContent, ToolTipContentProps } from './TooltipContent'

type TooltipProviderProps = PropsWithChildren &
  ComponentProps<typeof TooltipPrimitive.Provider>

const TooltipProvider = ({
  children,
  delayDuration = 250,
  ...props
}: TooltipProviderProps) => (
  <TooltipPrimitive.Provider {...props} delayDuration={delayDuration}>
    {children}
  </TooltipPrimitive.Provider>
)

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

export interface TooltipProps
  extends PropsWithChildren,
    Pick<ToolTipContentProps, 'color' | 'side' | 'align' | 'sideOffset'> {
  content: ReactNode
  className?: string
  wrap?: 'none'
  contentClassName?: string
}

const TooltipArrow = TooltipPrimitive.Arrow

const Tooltip = (props: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>
          {(props.wrap === 'none' && props.children) || (
            <span tabIndex={0} className={props.className}>
              {props.children}
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent
          color={props.color}
          side={props.side}
          align={props.align}
          sideOffset={props.sideOffset}
          className={props.contentClassName}
        >
          {props.content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}
Tooltip.displayName = 'Tooltip'

export {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  TooltipRoot,
  TooltipArrow,
}
