import { mergeClasses } from '@falcon/style'
import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardPortal = HoverCardPrimitive.Portal

const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={mergeClasses(
      'bg-secondary text-secondary-foreground animate-in zoom-in-90 z-50 w-64 rounded-md border p-4 shadow-md outline-none',
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal }
