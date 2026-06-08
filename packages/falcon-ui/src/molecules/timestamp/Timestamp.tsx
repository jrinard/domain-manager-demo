import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, { PropsWithChildren } from 'react'

import {
  handleNullOverrideText,
  formatDate,
  TYTO_NULL_DATE_TEXT,
} from './timestamp-methods'

const variants = cva('print:text-black', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary-fg',
      warn: 'text-warning',
      warning: 'text-warning',
      danger: 'text-danger',
      info: 'text-info',
      success: 'text-success',
      error: 'text-error',
      muted: 'text-muted-fg',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      xxl: 'text-2xl',
    },
  },
  defaultVariants: {
    color: 'secondary',
    size: 'md',
  },
})

export interface TimestampProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  allowRelativeTimeLanguage?: boolean
  date: Date | string
  hideNullDate?: boolean
  nullDateText?: string
  relativeTimeLanguageBehavior?: 'only-today' | 'never' | 'all-dates'
  showTime?: boolean
}

const Timestamp = ({
  color,
  size,
  relativeTimeLanguageBehavior = 'only-today',
  showTime = true,
  ...props
}: TimestampProps) => {
  const [displayDate, updateDisplayDate] = React.useState(() => {
    return formatDate(props.date, {
      relativeTimeLanguageBehavior,
      showTime,
    })
  })

  React.useEffect(() => {
    updateDisplayDate(
      formatDate(props.date, {
        relativeTimeLanguageBehavior,
        showTime,
      }),
    )
  }, [props.date, relativeTimeLanguageBehavior, showTime])

  if (props.hideNullDate && displayDate === TYTO_NULL_DATE_TEXT) {
    return <span className={mergeClasses(variants({ color, size }))} />
  }

  return (
    <span className={mergeClasses(variants({ color, size }))}>
      {handleNullOverrideText(displayDate, props.nullDateText)}
    </span>
  )
}

Timestamp.displayName = 'Timestamp'

export { formatDate, Timestamp }
