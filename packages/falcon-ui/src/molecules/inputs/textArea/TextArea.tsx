import React, {
  TextareaHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
  ChangeEvent,
} from 'react'
import { omit } from 'lodash'

import { cva, mergeClasses, VariantProps } from '@falcon/style'
import { Label } from '../../label/Label'

const variantsContainer = cva(
  'border-secondary/50 group-surface-light:border-primary/25 flex w-full rounded-lg',
  {
    variants: {
      fill: {
        true: 'bg-muted',
        false: 'border bg-transparent',
      },
    },
    defaultVariants: {
      fill: false,
    },
  }
)

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
  }
)

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>,
    VariantProps<typeof variantsContainer>,
    VariantProps<typeof variantsInput> {
  label?: string
  onChangeStopped?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

/**
 * @deprecated Use `import { TextAreaInput } from '@falcon/inputs'`
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      color,
      onChange,
      onChangeStopped,
      label,
      defaultValue,
      fill,
      ...props
    },
    ref
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]) // Do not add onChangedStopped as it results in an infinite loop

    return (
      <div
        className={mergeClasses('w-full flex-col items-start justify-start')}
      >
        {label && (
          <div className="pb-2.5">
            <Label>{label}</Label>
          </div>
        )}
        <div className={mergeClasses(variantsContainer({ fill }), className)}>
          <textarea
            className={mergeClasses(
              'font-body min-h-20 p-2',
              variantsInput({ color }),
              className
            )}
            disabled={props.disabled}
            ref={ref}
            onChange={(event) => {
              setValue(event)
              onChange && onChange(event)
            }}
            {...omit(props, 'children', 'color')}
          />
        </div>
      </div>
    )
  }
)
TextArea.displayName = 'TextArea'

export { TextArea }
