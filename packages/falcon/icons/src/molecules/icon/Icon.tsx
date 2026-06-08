import { cva, mergeClasses, VariantProps } from '@falcon/style'
import React from 'react'
import { Icon as Iconify, iconLoaded } from '@iconify/react'
import { addIcons } from './addIcons'

export type IconSizes =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'

export type ApprovedIcon =
  | 'account'
  | 'account-check'
  | 'account-multiple-outline'
  | 'account-star'
  | 'account-details-outline'
  | 'account-multiple-check-outline'
  | 'account-tie'
  | 'account-tie-outline'
  | 'account-hard-hat'
  | 'add-task'
  | 'alert'
  | 'alert-outline'
  | 'archive'
  | 'archive-outline'
  | 'arrow-left-bold'
  | 'arrow-right'
  | 'award'
  | 'bell'
  | 'bell-outline'
  | 'block-helper'
  | 'book-play'
  | 'check'
  | 'check-circle'
  | 'check-outline'
  | 'checkbox-marked-circle-plus-outline'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'circle'
  | 'circle-outline'
  | 'clock'
  | 'clock-outline'
  | 'close'
  | 'close-circle'
  | 'content-copy'
  | 'content-save-alert-outline'
  | 'calendar-outline'
  | 'calendar-blank'
  | 'delete-outline'
  | 'dots-vertical'
  | 'download'
  | 'download-outline'
  | 'drag-vertical'
  | 'edit-box-outline'
  | 'edit-box'
  | 'envelope-open-outline'
  | 'envelope-outline'
  | 'error-outline'
  | 'exit-to-app'
  | 'eye'
  | 'eye-off'
  | 'external-link'
  | 'filter-variant'
  | 'flag-outline'
  | 'folder'
  | 'folder-move'
  | 'folder-outline'
  | 'gear'
  | 'filter-gear'
  | 'filter-gear-outline'
  | 'house-outline'
  | 'human-male-board'
  | 'image-outline'
  | 'inbox'
  | 'inbox-outline'
  | 'info'
  | 'info-outline'
  | 'link'
  | 'lock'
  | 'map-outline'
  | 'minus'
  | 'note-text-outline'
  | 'open-in-new'
  | 'open-in-app'
  | 'paperclip'
  | 'pencil'
  | 'pencil-outline'
  | 'people'
  | 'people-outline'
  | 'person'
  | 'person-outline'
  | 'person-add'
  | 'person-remove'
  | 'plus'
  | 'plus-circle-outline'
  | 'printer'
  | 'progress-helper'
  | 'redo'
  | 'robot'
  | 'reply'
  | 'search'
  | 'send'
  | 'send-outline'
  | 'sort'
  | 'star'
  | 'star-outline'
  | 'trash-outline'
  | 'triangle'
  | 'triangle-down'
  | 'undo'
  | 'widgets-outline'
  | 'wrench-outline'
  | 'upload-outline'
  | 'unfold-more-horizontal'
  | 'user-group-outline'
  // Generated
  | 'account-star-check'
  | 'pie-chart'

export const IconColors = {
  onSurface:
    'group-surface-dark:text-secondary-fg group-surface-light:text-primary',
  primary: 'text-primary',
  secondary: 'text-secondary-fg',
  accent: 'text-accent',
  current: 'fill-current',
  error: 'text-error',
  danger: 'text-danger',
  info: 'text-info',
  warn: 'text-warning',
  warning: 'text-warning',
  success: 'text-success',
  failed: 'text-error',
  future: 'text-future',
  muted: 'text-muted',
  grayscale: 'text-grayscale-600 dark:text-grayscale-400',
}

const variants = cva('group/item fill-current', {
  variants: {
    color: IconColors,
    // TODO: this naming is confusing. It really is about group
    isShownOn: {
      hover:
        'text-secondary-fg opacity-0 transition-opacity group-hover/item:opacity-100',
      always: '',
    },
  },
  defaultVariants: {
    color: 'onSurface',
    isShownOn: 'always',
  },
})

export interface IconProps extends VariantProps<typeof variants> {
  icon: ApprovedIcon | string
  iconPrefix?: 'material-symbols' | 'mdi' | 'falcon-ui'
  size?: IconSizes
  className?: string
}

const getPrefix = (icon: string) => {
  if (['account-star-check', 'pie-chart'].includes(icon)) {
    return 'falcon-ui'
  } else if (
    ['archive', 'add-task', 'delete-outline'].findIndex(
      (value) => icon.indexOf(value) > -1,
    ) > -1
  ) {
    return 'material-symbols'
  }
  return 'mdi'
}

const Icon = ({
  icon,
  iconPrefix = getPrefix(icon),
  size = 'xl',
  isShownOn,
  className,
  color,
}: IconProps) => {
  // Ensure custom icons are loaded when component is used
  React.useEffect(() => {
    // Only load icons in browser environment
    if (typeof window !== 'undefined') {
      addIcons()
    }
  }, [])

  // Only check for icon existence in browser environment and for custom icons
  if (
    typeof window !== 'undefined' &&
    !['mdi', 'material-symbols'].includes(iconPrefix) &&
    !iconLoaded(`${iconPrefix}:${icon}`)
  ) {
    // eslint-disable-next-line no-console
    console.error(`Icon ${iconPrefix}:${icon} doesn't exist`)
  }
  return (
    <Iconify
      icon={`${iconPrefix}:${icon}`}
      color={isShownOn && color ? color : 'current'}
      className={mergeClasses(
        `text-${size}`,
        variants({ color, isShownOn }),
        className,
      )}
    />
  )
}
Icon.displayName = 'Icon'

export { Icon }
