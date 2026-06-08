import { Icon, IconProps } from '@falcon/icons'
import { cva, mergeClasses, VariantProps } from '@falcon/style'
import React, { ReactElement } from 'react'

import { ButtonProps, TextBody } from '../../index'

const variants = cva('flex items-center justify-between rounded', {
  variants: {
    color: {
      error: 'text-muted',
      failed: 'text-error',
      future: 'text-future',
      info: 'text-info',
      success: 'text-success',
      warn: 'text-warning',
      warning: 'text-warning',
    },
    fill: {
      none: 'bg-site-bg',
      error: 'bg-red-400/25',
      failed: 'bg-red-400/25',
      future: 'bg-blue-400/25',
      info: 'bg-blue-400/25',
      success: 'bg-green-400/25',
      warn: 'bg-yellow-400/25',
    },
    borderColor: {
      none: '',
      muted: 'border-muted border',
    },
  },
  defaultVariants: {
    color: 'error',
    fill: 'none',
    borderColor: 'muted',
  },
})

export interface BannerProps {
  headerText?: string
  bodyText?: string
  bodyComponent?: ReactElement
  action?: ReactElement<ButtonProps>
  preset: 'info' | 'future' | 'success' | 'warn' | 'failed' | 'error'
  size?: 'large' | 'small'
  fill?: boolean
  borderColor?: VariantProps<typeof variants>['borderColor']
}

const BannerFactory = (props: BannerProps) => {
  switch (props.preset) {
    case 'info':
      return Banner({
        ...props,
        iconProps: { icon: 'info', color: 'info' },
        headerText: props.headerText ? props.headerText : 'Info',
      })
    case 'future':
      return Banner({
        ...props,
        iconProps: { icon: 'info', color: 'future' },
        headerText: props.headerText ? props.headerText : 'Future',
      })
    case 'success':
      return Banner({
        ...props,
        iconProps: { icon: 'check-circle', color: 'success' },
        headerText: props.headerText ? props.headerText : 'Success',
      })
    case 'warn':
      return Banner({
        ...props,
        iconProps: { icon: 'alert', color: 'warn' },
        headerText: props.headerText ? props.headerText : 'Warning',
      })
    case 'failed':
      return Banner({
        ...props,
        iconProps: { icon: 'alert', color: 'error' },
        headerText: props.headerText ? props.headerText : 'Failed',
      })
    case 'error':
      return Banner({
        ...props,
        iconProps: { icon: 'alert', color: 'failed' },
        headerText: props.headerText ? props.headerText : 'Error',
        headerInline: true,
      })
  }
}
BannerFactory.displayName = 'Banner'

export { BannerFactory as Banner }

interface BannerInternalProps {
  headerText: string
  headerInline?: boolean
  bodyText?: string
  bodyComponent?: ReactElement
  iconProps: Pick<IconProps, 'icon' | 'color'>
  action?: ReactElement<ButtonProps>
  fill?: boolean
  borderColor?: VariantProps<typeof variants>['borderColor']
  preset: 'info' | 'future' | 'success' | 'warn' | 'failed' | 'error'
  size?: 'large' | 'small'
}

const Banner = ({
  preset,
  headerText,
  headerInline,
  iconProps,
  action,
  bodyText,
  bodyComponent,
  fill,
  borderColor,
  size = 'large',
}: BannerInternalProps) => {
  return (
    <div
      className={mergeClasses(
        variants({ color: preset, fill: fill ? preset : 'none', borderColor }),
        'min-w-31',
        size === 'small' ? 'px-1.5 py-1' : 'mx-1 px-3 py-2',
      )}
    >
      <div
        className={mergeClasses(
          'flex items-center',
          size === 'small' ? 'gap-2' : 'gap-3',
        )}
      >
        <Icon
          icon={iconProps.icon}
          size={size === 'small' ? 'base' : '2xl'}
          color={iconProps.color ? iconProps.color : preset}
        />
        <div
          className={mergeClasses(
            'flex',
            headerInline ? 'items-end gap-2' : ' flex-col gap-1',
          )}
        >
          <TextBody
            size={size === 'small' ? 'm' : 'l'}
            color={preset === 'failed' ? 'error' : preset}
            className={mergeClasses(
              size === 'small' ? 'leading-4' : 'leading-6',
            )}
          >
            {headerText}
            {headerInline ? ':' : ''}
          </TextBody>
          {(!!bodyText || !!bodyComponent) && (
            <TextBody
              color="secondary"
              size={size === 'small' ? 'xs' : undefined}
            >
              {bodyComponent ?? bodyText}
            </TextBody>
          )}
        </div>
      </div>
      <div className="pl-2">
        {action && {
          ...action,
          props: { ...action.props, variant: 'primary' },
        }}
      </div>
    </div>
  )
}
