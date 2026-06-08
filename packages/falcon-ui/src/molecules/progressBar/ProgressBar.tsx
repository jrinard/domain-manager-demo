import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React from 'react'
import * as Progress from '@radix-ui/react-progress'
import { ColorVariantsProps, ColorVariants, Label } from '../../'

const variantsGutter = cva('flex flex-col gap-4', {
  variants: {
    outline: {
      none: '',
      primary: 'hover:border-white hover:outline hover:outline-white',
      secondary:
        'hover:bg-secondary hover:text-secondary-fg hover:border-black hover:outline hover:outline-black',
    },
    bgColor: {
      primary: 'bg-primary text-primary-fg',
      muted: 'bg-muted text-muted-fg',
      secondary: 'bg-secondary text-secondary-fg',
      ghost: 'hover:bg-accent text-secondary',
      grayscale: 'bg-grayscale-200 dark:bg-grayscale-800 text-site-fg',
    },
    size: {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
      xl: 'h-6',
    },
    animation: {
      none: 'duration-1000',
      pulse: 'duration-2000 animate-pulse',
    },
  },
  defaultVariants: {
    outline: 'none',
    bgColor: 'muted',
    size: 'lg',
    animation: 'none',
  },
})

type Variants = Pick<
  VariantProps<typeof variantsGutter>,
  'size' | 'animation' | 'bgColor'
> & {
  color?: ColorVariantsProps['background']
}

export interface ProgressBarProps extends Variants {
  className?: string
  progress: number
  hasLabel?: boolean
  animation?: 'pulse'
  indeterminate?: boolean
}

const ProgressBar = ({
  className,
  color = 'accent',
  size,
  indeterminate,
  progress,
  hasLabel,
  bgColor,
  ...props
}: ProgressBarProps) => {
  const progBarID = React.useId()

  return (
    <div className={mergeClasses('flex w-full items-center gap-3', className)}>
      <Progress.Root
        className={mergeClasses(
          'relative w-full overflow-hidden rounded-full',
          variantsGutter({
            bgColor,
            size,
            animation: indeterminate ? 'pulse' : 'none',
          }),
        )}
        value={progress}
        {...props}
      >
        <Progress.Indicator
          id={progBarID}
          className={mergeClasses(
            'ease-out-progress bg-accent translate-z-0 size-full transition-transform',
            ColorVariants({ background: color }),
          )}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
      {hasLabel && (
        <Label htmlFor={progBarID} className="text-sm font-medium">
          {Math.floor(progress)}%
        </Label>
      )}
    </div>
  )
}
ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
