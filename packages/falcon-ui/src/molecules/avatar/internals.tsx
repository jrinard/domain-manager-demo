import { mergeClasses } from '@falcon/style'
import { ColorVariants, ColorVariantsProps } from '../../atoms/colors/colors'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import sizes from './sizes'

const avatarImageVariants = cva(
  'relative inline overflow-hidden rounded-full object-cover',
  {
    variants: {
      size: sizes,
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
export interface AvatarImageProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
    VariantProps<typeof avatarImageVariants> {
  alt: string
  bgColor?: ColorVariantsProps['background']
  src: string
}
export const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ bgColor = 'secondary', className, size, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={mergeClasses(
      avatarImageVariants({ size }),
      ColorVariants({ background: bgColor }),
      className,
    )}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const avatarFallbackVariants = cva(
  'flex items-center justify-center rounded-full',
  {
    variants: {
      size: sizes,
      bgColor: {
        primary: 'bg-primary text-primary-fg',
        secondary: 'bg-secondary text-secondary-fg',
      },
      stroked: {
        true: 'border-primary-fg border',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      bgColor: 'secondary',
      stroked: false,
    },
  },
)
interface AvatarFallbackProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackVariants> {}

export const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, stroked, size, bgColor, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={mergeClasses(
      avatarFallbackVariants({ size, bgColor, stroked }),
      className,
    )}
  >
    {formatFallbackText(props.children as string)}
  </AvatarPrimitive.Fallback>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export const formatFallbackText = (value: string) => {
  const words = value.split(' ')
  if (words.length > 1) return `${words[0][0]}${words[1][0]}`
  return `${words[0][0]}${words[0][Math.min(1, words[0].length - 1)]}`
}
