import React from 'react'
import { cva, mergeClasses, VariantProps } from '@falcon/style'
import { DecoyButton, ButtonVariants } from '@falcon/buttons'
import { Link } from '@spacedock/navigator'

const buttonWidthVariants = cva('flex flex-col gap-2', {
  variants: {
    buttonWidth: {
      auto: '',
      sm: 'min-w-32',
      md: 'min-w-40',
      lg: 'min-w-48',
      xl: 'min-w-64',
      '2xl': 'min-w-80',
      full: 'w-full',
    },
  },
  defaultVariants: {
    buttonWidth: 'auto',
  },
})

export interface ButtonCardProps
  extends Pick<VariantProps<typeof ButtonVariants>, 'variant' | 'size'> {
  buttonWidth?: 'auto' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  inGrid?: boolean
  /** Match tallest sibling in a wrapped flex row (items-group). */
  stretchWithRow?: boolean
  title: string
  href: string
  app?: string
  isPreview?: boolean
  titleRender?: React.ReactNode
  isExternal?: boolean
  disabled?: boolean
  target?: string
}

const ButtonCard = ({
  title,
  href,
  app,
  isPreview,
  size,
  titleRender,
  target,
  variant,
  buttonWidth,
  inGrid,
  stretchWithRow,
  ...props
}: ButtonCardProps) => {
  const Tag = props.disabled ? 'div' : props.isExternal ? 'a' : Link

  const widthLayout = inGrid
    ? 'box-border flex min-w-0 w-full max-w-full flex-col gap-2'
    : mergeClasses('box-border', buttonWidthVariants({ buttonWidth }))

  return (
    <Tag
      className={mergeClasses(
        widthLayout,
        stretchWithRow && 'min-h-0 self-stretch',
      )}
      to={href}
      href={href}
      target={target}
      app={app}
      rel="noopener noreferrer"
    >
      <div className="flex w-full items-center">
        <DecoyButton className="w-full" variant={variant} size={size}>
          {title}
        </DecoyButton>
      </div>
    </Tag>
  )
}

ButtonCard.displayName = 'ButtonCard'

export { ButtonCard }
