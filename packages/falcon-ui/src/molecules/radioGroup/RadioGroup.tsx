import { Icon } from '@falcon/icons'
import { mergeClasses } from '@falcon/style'
import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { TextBody } from '../../index'

export type RadioGroupProps = {
  defaultValue?: string
  disabled?: boolean
  options: { label: string; value: string }[]
  onChange: (value: string) => void
  direction?: 'col' | 'row'
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      defaultValue={props.defaultValue}
      ref={ref}
      className={mergeClasses(
        'flex gap-3',
        props.direction &&
          `${props.direction === 'col' ? 'flex-col' : 'flex-row'}`,
      )}
    >
      {props.options.map((item) => {
        return (
          <RadioGroupItem
            key={item.value}
            value={item.value}
            onClick={() => {
              props.onChange(item.value)
            }}
            disabled={props.disabled}
            aria-readonly={props.disabled}
          >
            <TextBody>{item.label}</TextBody>
          </RadioGroupItem>
        )
      })}
    </RadioGroupPrimitive.Root>
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className="flex items-start gap-2"
      {...props}
    >
      <div className="font-body relative m-0.5 flex size-5 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50">
        <Icon icon="circle-outline" className="absolute" size="2xl" />
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Icon icon="circle" size="sm" />
        </RadioGroupPrimitive.Indicator>
      </div>
      {children}
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup }
