import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, { PropsWithChildren } from 'react'

import { Icon, ApprovedIcon } from '@falcon/icons'
import { Avatar, AvatarProps } from '../avatar/Avatar'
import { IconButton } from '../iconButton/IconButton'
import { Tooltip } from '../tooltip/Tooltip'

const variants = cva(
  'font-body relative inline-flex select-none items-center justify-start whitespace-nowrap rounded-full px-3.5 align-baseline text-base font-medium leading-normal',
  {
    variants: {
      color: {
        primary: 'bg-primary text-primary-fg border-secondary border',
        secondary: 'bg-secondary text-secondary-fg border-primary border',
        neutral: 'text-secondary-fg bg-neutral-800',
        grayscale: 'text-site-fg bg-grayscale-200 dark:bg-grayscale-800',
        'contrast-low':
          'bg-bg-contrast-low text-site-fg border-secondary border',
        'contrast-high':
          'bg-bg-contrast-high text-site-fg border-secondary border',
        'contrast-medium':
          'bg-bg-contrast-medium text-site-fg border-secondary border',
        warn: 'bg-warn text-primary border-secondary border',
        info: 'bg-info text-secondary-fg border-secondary border',
        error: 'bg-error text-secondary-fg border-secondary border',
        success: 'bg-success text-secondary-fg border-secondary border',
      },
      dense: {
        true: 'py-1',
        false: 'py-1.5',
      },
    },
    defaultVariants: {
      color: 'primary',
      dense: false,
    },
  },
)

export interface ChipProps
  extends PropsWithChildren, VariantProps<typeof variants> {
  hoverText?: string
  label: string
  emphasis?: 'italic' | 'bold'
  avatar?: AvatarProps
  trailingIcon?: ApprovedIcon
  leadingIcon?: ApprovedIcon
  onTrailingIconClick?: () => void
  onLeadingIconClick?: () => void
  onClick?: () => void
}

const Chip: React.FC<ChipProps> = ({
  color,
  avatar,
  dense,
  hoverText,
  label,
  emphasis,
  leadingIcon,
  trailingIcon,
  onLeadingIconClick,
  onTrailingIconClick,
  onClick,
}: ChipProps) => {
  const mainStyles = variants({ color, dense })
  return (
    <div
      className={mergeClasses(
        mainStyles,
        `${avatar && !dense && 'py-2'}`,
        `${(onClick && 'cursor') ?? ''}`,
      )}
      onClick={onClick}
    >
      {avatar && (
        <div
          className={`relative ${dense ? '-left-2.5' : '-left-1 -translate-y-0.5 pr-2'}`}
        >
          <Avatar {...avatar} size={dense ? 'md' : 'sm'} />
        </div>
      )}
      <div className="inline-flex flex-row items-center gap-2">
        {leadingIcon && onLeadingIconClick === undefined && (
          <Icon icon={leadingIcon} color="current" className={`mt-px`} />
        )}
        {leadingIcon && onLeadingIconClick && (
          <IconButton
            icon={leadingIcon}
            color="current"
            dense
            onClick={onLeadingIconClick}
            className={`${avatar ? '' : ''} mt-px`}
          />
        )}
        <div
          className={mergeClasses(
            'text-sm font-medium capitalize leading-none antialiased',
            `${emphasis === 'italic' ? 'italic' : ''}`,
          )}
        >
          {hoverText ? (
            <Tooltip color="secondary" content={<div>{hoverText ?? ''}</div>}>
              {label}
            </Tooltip>
          ) : (
            label
          )}
        </div>
        {trailingIcon && onTrailingIconClick === undefined && (
          <Icon icon={trailingIcon} className="mt-px" color="current" />
        )}
        {trailingIcon && onTrailingIconClick && (
          <IconButton
            icon={trailingIcon}
            dense
            color="current"
            onClick={onTrailingIconClick}
          />
        )}
      </div>
    </div>
  )
}
Chip.displayName = 'Chip'

export { Chip }
