import React from 'react'
import { cva, VariantProps, mergeClasses } from '@falcon/style'

const cardVariants = cva(
  'text-color relative rounded-lg border bg-transparent shadow-sm transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        auto: '',
      },
      variant: {
        default: 'border-none bg-transparent hover:shadow-md',
        dark: 'border-gray-700 bg-gray-800 text-white hover:shadow-lg',
        elevated: 'border-gray-200 bg-white shadow-md hover:shadow-lg',
      },
    },
    defaultVariants: {
      size: 'auto',
      variant: 'default',
    },
  },
)

const iconVariants = cva(
  'flex aspect-square items-center justify-center rounded-lg text-2xl',
  {
    variants: {
      size: {
        sm: 'size-10 text-lg',
        md: 'size-12 text-2xl',
        lg: 'size-14 text-3xl',
      },
      colorScheme: {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        orange: 'bg-orange-100 text-orange-600',
        red: 'bg-red-100 text-red-600',
        gray: 'bg-gray-100 text-gray-600',
      },
    },
    defaultVariants: {
      size: 'md',
      colorScheme: 'blue',
    },
  },
)

const changeVariants = cva(
  'inline-flex items-center gap-1 text-sm font-medium',
  {
    variants: {
      trend: {
        positive: 'text-green-600',
        negative: 'text-red-600',
        neutral: 'text-gray-600',
      },
    },
    defaultVariants: {
      trend: 'neutral',
    },
  },
)

export interface StatsCountProps extends VariantProps<typeof cardVariants> {
  /**
   * The main statistic value to display
   */
  value: string | number

  /**
   * The title/label for the statistic
   */
  title: string

  /**
   * Optional subtitle (e.g., "48 total employees", "15 in progress")
   */
  subtitle?: string

  /**
   * Icon component or emoji to display
   */
  icon?: React.ReactNode

  /**
   * Color scheme for the icon background
   */
  iconColorScheme?: VariantProps<typeof iconVariants>['colorScheme']

  /**
   * Size for the icon
   */
  iconSize?: VariantProps<typeof iconVariants>['size']

  /**
   * Percentage change from previous period
   */
  change?: {
    value: string | number
    period?: string
    trend?: 'positive' | 'negative' | 'neutral'
  }

  /**
   * Loading state
   */
  isLoading?: boolean

  /**
   * Custom className for additional styling
   */
  className?: string

  /**
   * Click handler for interactive cards
   */
  onClick?: () => void
}

const StatsCount = ({
  value,
  title,
  subtitle,
  icon,
  iconColorScheme = 'blue',
  iconSize,
  change,
  isLoading = false,
  size,
  variant,
  className,
  onClick,
  ...props
}: StatsCountProps) => {
  const isClickable = !!onClick

  if (isLoading) {
    return (
      <div
        className={mergeClasses(
          cardVariants({ size, variant }),
          'animate-pulse duration-[2200ms]',
          className,
        )}
        {...props}
        style={{}}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="h-4 w-3/4 rounded bg-neutral-800"></div>
            <div className="h-8 w-1/2 rounded bg-neutral-800"></div>
            <div className="h-3 w-2/3 rounded bg-neutral-800"></div>
            <div className="h-3 w-1/2 rounded bg-neutral-800"></div>
          </div>
          {icon && (
            <div
              className={mergeClasses(
                iconVariants({ size: iconSize }),
                'my-auto bg-neutral-800',
              )}
            ></div>
          )}
        </div>
      </div>
    )
  }

  const formatChange = () => {
    if (!change) return null

    const {
      value: changeValue,
      period = 'vs last month',
      trend = 'neutral',
    } = change
    const prefix = trend === 'positive' ? '+' : trend === 'negative' ? '-' : ''
    const cleanValue =
      typeof changeValue === 'string'
        ? changeValue.replace(/^[+-]/, '')
        : Math.abs(Number(changeValue))

    return (
      <div className={changeVariants({ trend })}>
        <span className="inline-flex items-center">
          {trend === 'positive' && (
            <svg
              className="mr-1 size-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {trend === 'negative' && (
            <svg
              className="mr-1 size-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {prefix}
          {cleanValue} {period}
        </span>
      </div>
    )
  }

  return (
    <div
      className={mergeClasses(
        cardVariants({ size, variant }),
        isClickable && 'cursor-pointer hover:scale-105',
        className,
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-col gap-2">
          {/* Title */}
          <p className="text-sm font-medium text-gray-600">{title}</p>

          {/* Main Value */}

          <div className="mt-2 flex flex-row items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className=" text-3xl font-bold tracking-tight">{value}</div>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
            {icon && (
              <div
                className={mergeClasses(
                  iconVariants({
                    size: iconSize,
                    colorScheme: iconColorScheme,
                  }),
                  // 'my-auto',
                )}
                // style={{ margin: 'auto 0px' }}
              >
                {icon}
              </div>
            )}
          </div>

          {/* Subtitle */}

          {/* Change Indicator */}
          {change && formatChange()}
        </div>
      </div>
    </div>
  )
}

StatsCount.displayName = 'StatsCount'

export { StatsCount }
