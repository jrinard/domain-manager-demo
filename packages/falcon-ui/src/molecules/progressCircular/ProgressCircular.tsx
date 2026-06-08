import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, { PropsWithChildren, useEffect, useState } from 'react'

const variants = cva('', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      auto: 'text-primary group-surface-dark:text-primary group-surface-light:text-secondary',
      black: 'text-black',
    },
    size: {
      md: 'size-5',
    },
  },
  defaultVariants: {
    color: 'auto',
    size: 'md',
  },
})

const variantsInner = cva('', {
  variants: {
    color: {
      primary: 'text-secondary',
      secondary: 'text-primary',
      auto: 'text-secondary-fg group-surface-dark:text-secondary-fg group-surface-light:text-primary',
      black: 'opacity-25',
    },
  },
  defaultVariants: {
    color: 'auto',
  },
})

export interface ProgressCircularProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  className?: string
  isVisible?: boolean
  minimumTime?: number // Minimum time in milliseconds to display the spinner
}

const ProgressCircular = ({
  color,
  size,
  className,
  isVisible = true,
  minimumTime = 0,
}: ProgressCircularProps) => {
  const [shouldShow, setShouldShow] = useState(isVisible)
  const [startTime, setStartTime] = useState<number | null>(
    isVisible ? Date.now() : null,
  )

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true)
      setStartTime(Date.now())
    } else if (minimumTime > 0 && startTime !== null) {
      const elapsed = Date.now() - startTime
      const remaining = minimumTime - elapsed
      if (remaining > 0) {
        const timer = setTimeout(() => {
          setShouldShow(false)
          setStartTime(null)
        }, remaining)
        return () => clearTimeout(timer)
      } else {
        setShouldShow(false)
        setStartTime(null)
      }
    } else {
      setShouldShow(false)
      setStartTime(null)
    }
  }, [isVisible, minimumTime, startTime])

  if (!shouldShow) {
    return null
  }

  return (
    <svg
      className={mergeClasses(
        variants({ size, color }),
        className,
        'animate-spin',
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className={mergeClasses(variantsInner({ color }))}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className={color === 'black' ? 'opacity-75' : 'opacity-75'}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
ProgressCircular.displayName = 'ProgressCircular'

export { ProgressCircular }
