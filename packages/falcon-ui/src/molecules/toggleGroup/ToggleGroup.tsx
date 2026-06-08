import React, { useState } from 'react'
import * as RadixToggleGroup from '@radix-ui/react-toggle-group'
import { cva, mergeClasses } from '@falcon/style'

const toggleVariants = cva(
  'text-site-fg flex h-7 items-center justify-center border-current',
  {
    variants: {
      variant: {
        default:
          'hover:bg-bg-contrast-low rounded-md border bg-transparent px-2 transition-all',
        shadow:
          'bg-grayscale-100 rounded-lg px-1 transition-all hover:bg-neutral-400 dark:bg-black dark:hover:bg-neutral-700', // shadcn-style shadow variant
      },
      isSelected: {
        true: 'bg-grayscale-300 dark:bg-grayscale-800 hover:bg-grayscale-300 hover:dark:bg-grayscale-800 text-grayscale-900 dark:text-grayscale-100 border-grayscale-400 dark:border-grayscale-600 border border-solid',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      isSelected: false,
    },
  },
)

export interface ToggleOption {
  value: string
  label: React.ReactNode
  ariaLabel?: string
  disabled?: boolean
}

export interface ToggleGroupProps {
  options: ToggleOption[]
  onChange?: (selectedValue: string | undefined) => void
  variant?: 'default' | 'shadow'
  value?: string | undefined
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options = [],
  onChange,
  variant = 'default',
  value: controlledValue,
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>()
  const selectedValue =
    controlledValue !== undefined ? controlledValue : internalValue

  const handleValueChange = (value: string) => {
    const newValue = selectedValue === value ? undefined : value
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const containerClasses =
    variant === 'shadow'
      ? 'inline-flex rounded-lg border border-neutral-700 bg-grayscale-100 dark:bg-black p-1.5'
      : 'inline-flex rounded-md p-1'

  return (
    <div className={containerClasses}>
      <RadixToggleGroup.Root
        type="single"
        className="flex space-x-2"
        value={selectedValue}
        onValueChange={handleValueChange}
      >
        {options.map((option) => (
          <RadixToggleGroup.Item
            key={option.value}
            value={option.value}
            aria-label={option.ariaLabel || option.value}
            disabled={option.disabled}
            className={mergeClasses(
              toggleVariants({
                variant,
                isSelected: selectedValue === option.value,
              }),
              option.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            {option.label}
          </RadixToggleGroup.Item>
        ))}
      </RadixToggleGroup.Root>
    </div>
  )
}

ToggleGroup.displayName = 'ToggleGroup'

export { ToggleGroup }
