import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mergeClasses as cn } from '@falcon/style'

const badgeVariants = cva(
  'focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-fg hover:bg-primary/80 border-transparent',
        secondary:
          'bg-secondary text-secondary-fg hover:bg-secondary/80 border-transparent',
        success:
          'bg-success text-success-fg hover:bg-success/80 border-transparent',
        warning:
          'bg-warning text-warning-fg hover:bg-warning/80 border-transparent',
        danger:
          'bg-danger text-danger-fg hover:bg-danger/80 border-transparent',
        info: 'bg-info text-info-fg hover:bg-info/80 border-transparent',
        outline: 'text-site-fg border-border border bg-transparent',
        'status-complete':
          'bg-status-complete text-success-fg border-transparent',
        'status-incomplete':
          'bg-status-incomplete text-warning-fg border-transparent',
        'status-overdue': 'bg-status-overdue text-danger-fg border-transparent',
        'status-atrisk':
          'bg-status-atrisk text-danger-subtle-fg border-transparent',
        'status-notapplicable':
          'bg-status-notapplicable text-grayscale-800 border-transparent',
        'status-postponed':
          'bg-status-postponed text-muted-fg border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
