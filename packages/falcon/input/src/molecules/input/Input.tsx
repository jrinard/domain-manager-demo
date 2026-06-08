import { ApprovedIcon, Icon } from '@falcon/icons'
import { cva, mergeClasses, VariantProps } from '@falcon/style'
import React, {
  InputHTMLAttributes,
  forwardRef,
  ReactElement,
  MouseEvent,
  useState,
  useEffect,
} from 'react'
import { omit } from 'lodash'
import { IconButton } from '@spacedock/falcon-ui'

export const InputContainerVariants = cva(
  'border-input-border relative flex w-full flex-nowrap items-center overflow-hidden rounded-lg',
  {
    variants: {
      dense: {
        true: 'h-10 px-2.5 py-1.5',
        false: 'h-14 p-2.5',
        auto: 'h-auto px-2.5 py-1.5',
      },
      fill: {
        true: 'bg-bg-contrast-medium',
        false: 'border bg-transparent',
      },
    },
    defaultVariants: {
      dense: false,
      fill: false,
    },
  },
)

// eslint-disable-next-line tailwindcss/no-arbitrary-value
const InputNativeIconsVariants = cva('', {
  variants: {
    disableNativeIcons: {
      true: '[appearance:textfield] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clear-button]:hidden [&::-webkit-inner-spin-button]:hidden',
      false: '',
    },
  },
  defaultVariants: {
    disableNativeIcons: false,
  },
})

export const InputVariants = cva(
  'text-site-fg placeholder:text-muted-fg disabled:bg-muted disabled:text-muted-fg relative min-w-0 grow border-0 bg-transparent text-base outline-none placeholder:italic focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      dense: {
        true: '',
        false: '',
        auto: '',
      },
      standalone: {
        true: '',
        false: '',
      },
      fill: {
        true: '',
        false: '',
      },
      onSurface: {
        auto: '',
        light: '',
        dark: '',
      },
    },
    compoundVariants: [],
    defaultVariants: {
      dense: false,
      fill: false,
      standalone: false,
      onSurface: 'auto',
    },
  },
)

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputContainerVariants>,
    VariantProps<typeof InputVariants>,
    VariantProps<typeof InputNativeIconsVariants> {
  placeholder?: string
  leadingIcon?: ApprovedIcon
  onLeadingClick?: () => void
  trailingIcon?: ApprovedIcon
  onTrailingClick?: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => void
  leadingChildren?: ReactElement[] | undefined
  trailingChildren?: ReactElement[] | undefined | ReactElement
  bottomChildren?: ReactElement[] | undefined | ReactElement
  displayCharCount?: boolean
  containerElement?: 'div' | 'span' | 'form'
  onSubmit?: (e: React.FormEvent<Element>) => void
}

/**
 * Should only be used for building inputs in `@falcon` namespace or `falcon-ui` package.
 *  Please do not this component directly outside of the `@falcon` namespace.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      leadingIcon,
      trailingIcon,
      onSurface,
      dense,
      standalone,
      leadingChildren,
      trailingChildren,
      onTrailingClick,
      onLeadingClick,
      fill,
      name,
      disableNativeIcons,
      maxLength,
      displayCharCount,
      containerElement,
      onSubmit,
      bottomChildren,
      ...props
    }: InputProps,
    ref,
  ) => {
    //* Counting the value passed in and displaying the length if maxLength is specified
    const [inputLengthCount, setInputLengthCount] = useState<number>(0)
    useEffect(() => {
      if (props.value && typeof props.value === 'string') {
        setInputLengthCount(props.value.length)
      }
    }, [props.value])

    const ContainerElem = containerElement ?? 'div'

    return (
      <ContainerElem
        className={mergeClasses(
          InputContainerVariants({ dense, fill }),
          props.className,
        )}
        onSubmit={onSubmit}
      >
        {leadingIcon && (
          <div
            className={mergeClasses(
              'z-10 mr-2 flex h-full w-fit items-center justify-self-center bg-transparent text-base font-normal',
            )}
          >
            {!onLeadingClick && <Icon icon={leadingIcon} />}
            {onLeadingClick && (
              <IconButton
                type="button"
                icon={leadingIcon}
                onClick={onLeadingClick}
              />
            )}
          </div>
        )}
        {leadingChildren && (
          <div className="flex h-full w-fit items-center gap-1 pr-2">
            {leadingChildren}
          </div>
        )}
        <input
          placeholder={
            leadingChildren === undefined || leadingChildren?.length < 1
              ? placeholder
              : ''
          }
          className={mergeClasses(
            InputVariants({
              standalone,
              onSurface,
              fill,
            }),
            InputNativeIconsVariants({ disableNativeIcons }),
          )}
          aria-labelledby={name}
          name={name}
          ref={ref}
          maxLength={maxLength}
          {...omit(props, 'className')}
        />
        {trailingChildren && (
          <div
            className={mergeClasses(
              'flex h-full w-fit flex-none items-center justify-self-center bg-transparent pl-2 text-base font-normal',
            )}
          >
            {trailingChildren}
          </div>
        )}
        {trailingIcon && (
          <div
            className={mergeClasses(
              'flex h-full w-fit flex-none items-center justify-self-center bg-transparent pl-2 text-base font-normal',
            )}
          >
            {!onTrailingClick && <Icon icon={trailingIcon} />}
            {onTrailingClick && (
              <IconButton
                type="button"
                icon={trailingIcon}
                onClick={onTrailingClick}
              />
            )}
          </div>
        )}
        {maxLength && displayCharCount && (
          <div className="text-muted absolute bottom-2 right-2 text-sm">
            {inputLengthCount}/{maxLength}
          </div>
        )}
        {bottomChildren && bottomChildren}
      </ContainerElem>
    )
  },
)
Input.displayName = 'Input'

export { Input }
