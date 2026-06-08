import { Icon } from '@falcon/icons'
import { cva, mergeClasses } from '@falcon/style'
import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { TextHeading } from '../../index'

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ ...props }, ref) => {
  if (props.type === 'single') {
    return (
      <AccordionPrimitive.Accordion
        ref={ref}
        className="flex flex-col gap-3"
        collapsible
        {...props}
      />
    )
  }
  return (
    <AccordionPrimitive.Accordion
      ref={ref}
      className="flex flex-col gap-3"
      {...props}
    />
  )
})

Accordion.displayName = 'Accordion'

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className="flex flex-col gap-3"
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const variants = cva(
  'flex flex-1 items-center justify-between gap-2.5 transition-all [&[data-state=open]>svg]:rotate-180',
  {
    variants: {
      iconSide: {
        left: 'flex-row-reverse justify-end',
        right: '',
      },
      textAlign: {
        center: 'text-center',
        left: 'text-left',
        right: 'text-right',
      },
    },
    defaultVariants: {
      iconSide: 'right',
      textAlign: 'center',
    },
  },
)

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof variants> {
  title?: string
  icon?: string
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
  (
    { className, children, iconSide, textAlign, icon = 'triangle', ...props },
    ref,
  ) => {
    const isChevronIcon = icon.includes('chevron')

    //* Use different variants based on icon type
    const triggerClasses = isChevronIcon
      ? 'flex w-full items-center justify-between gap-2.5 transition-all [&[data-state=open]_.chevron-closed]:hidden [&[data-state=open]_.chevron-open]:block [&[data-state=closed]_.chevron-closed]:block [&[data-state=closed]_.chevron-open]:hidden'
      : mergeClasses(variants({ iconSide, textAlign }))

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={triggerClasses}
          {...props}
        >
          {isChevronIcon ? (
            <>
              <TextHeading>{props.title}</TextHeading>
              <div className="flex">
                <Icon icon="chevron-left" className="chevron-closed" />
                <Icon icon="chevron-down" className="chevron-open hidden" />
              </div>
            </>
          ) : (
            <>
              <TextHeading>{props.title}</TextHeading>
              <Icon icon={icon} />
            </>
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  },
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="state-closed:animate-accordion-up state-open:animate-accordion-down flex flex-col gap-3 overflow-hidden transition-all"
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
