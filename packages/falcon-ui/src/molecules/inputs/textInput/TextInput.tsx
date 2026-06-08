import React, { InputHTMLAttributes, forwardRef, ReactElement } from 'react'
import { omit } from 'lodash'
import { Icon, ApprovedIcon } from '@falcon/icons'
import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from '@falcon/style'
import { IconButton } from '../../iconButton/IconButton'
import { Label } from '../../label/Label'

const variantsContainer = cva(
  'border-secondary/50 group-surface-light:border-primary/25 relative flex w-full flex-nowrap items-center overflow-hidden rounded-lg',
  {
    variants: {
      dense: {
        true: 'h-10 px-2.5 py-1.5',
        false: 'h-14 p-2.5',
      },
      fill: {
        true: 'bg-neutral-800',
        false: 'border bg-transparent',
      },
    },
    defaultVariants: {
      dense: false,
      fill: false,
    },
  },
)

const variantsInput = cva(
  'min-w-0 max-w-full grow border-0 bg-transparent text-base outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-90',
  {
    variants: {
      dense: {
        true: '',
        false: '',
      },
      standalone: {
        true: 'placeholder:text-muted-foreground',
        false: 'placeholder:text-muted/50',
      },
      fill: {
        true: '',
        false: '',
      },
      onSurface: {
        auto: 'group-surface-dark:text-secondary-fg group-surface-light:text-primary',
        light: 'text-primary',
        dark: 'text-secondary',
      },
    },
    compoundVariants: [
      {
        fill: true,
        onSurface: ['auto', 'dark'],
        className: 'placeholder:text-secondary/50',
      },
    ],
    defaultVariants: {
      dense: false,
      fill: false,
      standalone: false,
      onSurface: 'auto',
    },
  },
)

export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof variantsContainer>,
    VariantProps<typeof variantsInput> {
  placeholder?: string
  leadingIcon?: ApprovedIcon
  label?: string
  onLeadingClick?: () => void
  trailingIcon?: ApprovedIcon
  onTrailingClick?: () => void
  leadingChildren?: ReactElement[] | undefined
  inputClassName?: string
}

/**
 * @deprecated Please use `import { TextInput } from '@falcon/inputs'` instead
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      leadingIcon,
      trailingIcon,
      onSurface,
      dense,
      standalone,
      label,
      leadingChildren,
      fill,
      name,
      inputClassName,
      onTrailingClick,
      onLeadingClick,
      ...props
    }: TextInputProps,
    ref,
  ) => {
    return (
      <div
        className={mergeClasses('flex w-full overflow-hidden', props.className)}
      >
        {label && (
          <Label
            textType="body"
            className={mergeClasses(variantsInput({ onSurface }), 'pb-2.5')}
            htmlFor={name}
          >
            {label}
          </Label>
        )}
        <div
          className={mergeClasses(
            variantsContainer({ dense, fill }),
            props.className,
          )}
        >
          {leadingIcon && (
            <div
              className={mergeClasses(
                'z-10 mr-2 flex h-full w-fit flex-none items-center justify-self-center bg-transparent text-base font-normal',
              )}
            >
              {!onLeadingClick && <Icon icon={leadingIcon} />}
              {onLeadingClick && (
                <IconButton icon={leadingIcon} onClick={onLeadingClick} />
              )}
            </div>
          )}
          {leadingChildren && (
            <div className="flex h-full w-fit flex-none items-center gap-1 pr-2">
              {leadingChildren}
            </div>
          )}
          <input
            type="text"
            placeholder={
              leadingChildren === undefined || leadingChildren?.length < 1
                ? placeholder
                : ''
            }
            className={mergeClasses(
              inputClassName,
              variantsInput({ standalone, onSurface, fill }),
            )}
            aria-labelledby={name}
            name={name}
            ref={ref}
            {...omit(
              props,
              'className',
              'onLeadingClick',
              'onTrailingClick',
              'leadingIcon',
              'trailingIcon',
              'leadingChildren',
            )}
          />
          {trailingIcon && (
            <div
              className={mergeClasses(
                'z-20 flex h-full w-fit flex-none items-center justify-self-center bg-transparent pl-2 text-base font-normal',
              )}
            >
              {!onTrailingClick && <Icon icon={trailingIcon} />}
              {onTrailingClick && (
                <IconButton icon={trailingIcon} onClick={onTrailingClick} />
              )}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TextInput.displayName = 'TextInput'

export { TextInput }
