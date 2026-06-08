import * as React from 'react'
import { Icon } from '@falcon/icons'
import { ToastProps } from './Toast'

export const ToastLeadingIcon = ({ variant }: ToastProps) => {
  switch (variant) {
    case 'info':
      return <Icon icon="info" color="info" />
    case 'success':
      return <Icon icon="check-circle" color="success" />
    case 'failed':
      return <Icon icon="error" color="error" />
    case 'warn':
      return <Icon icon="warn" color="warn" />
    case 'emphasized':
      return <div />
    default:
      return <Icon icon="info" color="muted" />
  }
}
