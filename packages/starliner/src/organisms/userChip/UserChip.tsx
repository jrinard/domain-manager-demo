import { cva, VariantProps } from '@falcon/style'
import React from 'react'

import { Chip, Tooltip } from '@spacedock/falcon-ui'

const variants = cva('', {
  variants: {},
  defaultVariants: {},
})

export interface UserChipProps extends VariantProps<typeof variants> {
  displayName: string
  avatar: string
  status?: 'in-office' | 'deactivated' | 'out-of-office' | 'pending'
  message?: string
  onRemoveClick?: () => void
  dense?: boolean
  defaultColor?: 'primary' | 'secondary' | 'neutral'
}

const UserChip = ({
  displayName,
  avatar,
  status = 'in-office',
  message,
  onRemoveClick,
  dense,
  defaultColor = 'neutral',
}: UserChipProps) => {
  if (status === 'deactivated') {
    return (
      <Tooltip content={message ?? 'User deactivated'} color="error">
        <Chip
          avatar={{ name: displayName, src: avatar }}
          color="error"
          label={displayName}
          dense={dense !== undefined ? dense : defaultColor === 'neutral'}
          trailingIcon={onRemoveClick ? 'close' : undefined}
          onTrailingIconClick={onRemoveClick}
        />
      </Tooltip>
    )
  } else if (status === 'out-of-office') {
    return (
      <Tooltip
        content={<div className="line-clamp-3 max-w-md">{message}</div>}
        color="warn"
      >
        <Chip
          avatar={{ name: displayName, src: avatar }}
          color="warn"
          dense={dense !== undefined ? dense : defaultColor === 'neutral'}
          leadingIcon="clock-outline"
          trailingIcon={onRemoveClick ? 'close' : undefined}
          label={displayName}
          onTrailingIconClick={onRemoveClick}
        />
      </Tooltip>
    )
  } else if (status === 'pending') {
    return (
      <Tooltip
        content={
          <div className="line-clamp-3 max-w-md">
            {message || 'Pending invite until submit'}
          </div>
        }
        color="warn"
      >
        <Chip
          avatar={{ name: displayName, src: avatar }}
          color="neutral"
          emphasis="italic"
          dense={dense !== undefined ? dense : defaultColor === 'neutral'}
          leadingIcon="progress-helper"
          trailingIcon={onRemoveClick ? 'close' : undefined}
          label={displayName}
          onTrailingIconClick={onRemoveClick}
        />
      </Tooltip>
    )
  }
  return (
    <Chip
      dense={dense !== undefined ? dense : defaultColor === 'neutral'}
      avatar={{ name: displayName, src: avatar }}
      label={displayName}
      trailingIcon={onRemoveClick ? 'close' : undefined}
      color={defaultColor}
      onTrailingIconClick={onRemoveClick}
    />
  )
}
UserChip.displayName = 'UserChip'

export { UserChip }
