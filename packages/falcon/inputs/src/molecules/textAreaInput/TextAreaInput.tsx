import React, {
  TextareaHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
  ChangeEvent,
} from 'react'
import { omit } from 'lodash'

import { cva, VariantProps, mergeClasses } from '@falcon/style'

const variantsContainer = cva('border-input-border flex w-full rounded-lg', {
  variants: {
    fill: {
      true: 'bg-muted',
      false: 'border bg-transparent',
    },
  },
  defaultVariants: {
    fill: false,
  },
})

const variantsInput = cva(
  'peer inline-flex grow border-0 bg-transparent text-base outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      color: {
        primary: 'border-primary/50 text-primary',
        secondary: 'border-secondary/50 text-secondary',
        auto: 'border-secondary/50 group-surface-dark:text-secondary-fg group-surface-light:border-primary/25  group-surface-light:text-primary',
      },
    },
    defaultVariants: {
      color: 'auto',
    },
  },
)

export interface TextAreaInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>,
    VariantProps<typeof variantsContainer>,
    VariantProps<typeof variantsInput> {
  onChangeStopped?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  displayCharCount?: boolean
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      className,
      color,
      onChange,
      onChangeStopped,
      defaultValue,
      fill,
      rows = 3,
      displayCharCount,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState<
      ChangeEvent<HTMLTextAreaElement> | undefined
    >(undefined)
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (onChangeStopped && value) {
          onChangeStopped(value)
        }
      }, 2500)

      return () => clearTimeout(delayDebounce)
    }, [value]) // Do not add onChangedStopped as it results in an infinite loop

    //* Counting the value passed in and displaying the length if maxLength and displayCharCount is specified
    const [inputLengthCount, setInputLengthCount] = useState<number>(0)
    useEffect(() => {
      if (props.value && typeof props.value === 'string') {
        setInputLengthCount(props.value.length)
      }
    }, [props.value])

    return (
      <>
        <div className={mergeClasses(variantsContainer({ fill }), className)}>
          <textarea
            className={mergeClasses(
              'font-body min-h-20 p-2',
              variantsInput({ color }),
              className,
            )}
            disabled={props.disabled}
            ref={ref}
            rows={rows}
            onChange={(event) => {
              setValue(event)
              onChange && onChange(event)
            }}
            {...omit(props, 'children', 'color')}
          />
        </div>
        {props.maxLength && displayCharCount && (
          <div className="text-muted ml-auto text-sm">
            {inputLengthCount}/{props.maxLength}
          </div>
        )}
      </>
    )
  },
)
TextAreaInput.displayName = 'TextArea'

export { TextAreaInput }
