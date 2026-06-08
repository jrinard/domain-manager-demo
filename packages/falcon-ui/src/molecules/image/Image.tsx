import { mergeClasses } from '@falcon/style'
import React, { ImgHTMLAttributes, DetailedHTMLProps } from 'react'
import { Img } from 'react-image'

import { Icon } from '@falcon/icons'
import sizeVariants from '../skeleton/sizeVariants'
import { SkeletonSquare } from '../skeleton/Skeleton'
import { SkeletonSquareProps } from '../skeleton/SkeletonSquare'

export type ImageProps = Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'srcList' | 'src'
> &
  Omit<SkeletonSquareProps, 'size'> & {
    loadingSize?: SkeletonSquareProps['size']
  } & {
    notFoundSize?: SkeletonSquareProps['size']
  } & {
    src: string | string[]
    alt: string
  }

const Image = ({ src, loadingSize, notFoundSize, ...props }: ImageProps) => {
  return (
    <Img
      src={src}
      loader={
        <SkeletonSquare
          size={loadingSize || '32'}
          className={mergeClasses(props.className)}
        />
      }
      unloader={
        <div
          className={mergeClasses(
            'flex h-full flex-col items-center justify-center gap-2',
            sizeVariants({ size: notFoundSize || '32' }),
            props.className,
          )}
        >
          <Icon
            icon="image-outline"
            size="6xl"
            className="text-secondary-fg group-surface-light:text-primary/50"
          />
          <span className="text-secondary-fg group-surface-light:text-primary text-center text-xs">
            No image found
          </span>
        </div>
      }
      {...props}
    />
  )
}
Image.displayName = 'Image'

export { Image }
