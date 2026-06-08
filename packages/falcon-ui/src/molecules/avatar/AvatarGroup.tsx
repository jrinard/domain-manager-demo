import { mergeClasses } from '@falcon/style'
import React from 'react'
import { Avatar, AvatarProps } from './Avatar'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import sizes from './sizes'

const depthVariants = cva('', {
  variants: {
    depth: {
      0: 'z-0',
      1: 'z-10',
      2: 'z-20',
      3: 'z-30',
      4: 'z-40',
      5: 'z-50',
      6: 'z-60',
      7: 'z-70',
      8: 'z-80',
      9: 'z-90',
      10: 'z-100',
      auto: 'z-auto',
    },
  },
  defaultVariants: {
    depth: 'auto',
  },
})
const variants = cva('', {
  variants: {
    size: sizes,
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface AvatarGroupProps extends VariantProps<typeof variants> {
  max?: number
  list: AvatarProps[]
}

const AvatarGroup = ({ size, list, max = 3 }: AvatarGroupProps) => {
  const isOverMax = max !== undefined && max > 0 && list.length > max
  const childrenLimited = isOverMax ? list.slice(0, max) : list
  return (
    <div
      className={`flex ${isOverMax ? '-space-x-2' : 'space-x-2'} items-center`}
    >
      {childrenLimited.map((item, index) => {
        return (
          <Avatar
            size={size}
            stroked
            key={item.src}
            src={item.src}
            name={item.name}
            className={depthVariants({
              depth:
                childrenLimited.length > 10
                  ? 'auto'
                  : (`${(childrenLimited.length - index) * 10}` as VariantProps<
                      typeof depthVariants
                    >['depth']),
            })}
          />
        )
      })}
      {isOverMax && (
        <div
          className={mergeClasses(
            variants({ size }),
            'bg-surface-light text-secondary-fg z-100 relative flex items-center justify-center overflow-hidden rounded-full',
          )}
        >
          +{`${list.length - max}`}
        </div>
      )}
    </div>
  )
}
AvatarGroup.displayName = 'AvatarGroup'

export { AvatarGroup }
