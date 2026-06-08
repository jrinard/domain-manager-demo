import { mergeClasses } from '@falcon/style'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from './internals'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { kebabCase } from 'lodash'
import sizes from './sizes'

const variants = cva(
  'z-5 relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: sizes,
      stroked: {
        true: 'border-2 border-white',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      stroked: false,
    },
  },
)

export interface AvatarProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof variants> {
  name: string
  src?: string
}

const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ name, size, src, stroked, className, ...props }, ref) => {
    const resolvedSrc = src?.trim() || undefined
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={mergeClasses(variants({ size, stroked }), className)}
        {...props}
      >
        {resolvedSrc ? (
          <AvatarImage
            src={resolvedSrc}
            alt={kebabCase(name)}
            size={size}
          />
        ) : null}

        <AvatarFallback stroked={stroked} size={size === null ? undefined : size}>
          {name}
        </AvatarFallback>
      </AvatarPrimitive.Root>
    )
  },
)
Avatar.displayName = AvatarPrimitive.Root.displayName

export { Avatar }
