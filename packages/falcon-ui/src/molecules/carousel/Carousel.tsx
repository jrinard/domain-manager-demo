import React, { ReactNode } from 'react'
import {
  Carousel as CarouselContainer,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './CarouselPrimitives'
import { mergeClasses } from '@falcon/style'
import type { VariantProps } from '@falcon/style'
import { cva } from '@falcon/style'

const carouselItemVariants = cva('', {
  variants: {
    cardSize: {
      dynamic: 'sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
      'training-tile':
        'h-trainingtile max-h-trainingtile w-trainingtile max-w-trainingtile',
    },
  },
  defaultVariants: {
    cardSize: 'dynamic',
  },
})

export interface CarouselProps
  extends VariantProps<typeof carouselItemVariants> {
  carouselItems: ReactNode[]
  className?: string
  itemClassName?: string
}

const Carousel = ({ carouselItems, className, cardSize }: CarouselProps) => {
  return (
    <CarouselContainer className={mergeClasses('mx-10', className)}>
      <CarouselContent>
        {carouselItems.map((child, indx) => {
          return (
            <CarouselItem
              key={indx}
              className={carouselItemVariants({ cardSize })}
            >
              {child}
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselContainer>
  )
}
Carousel.displayName = 'Carousel'

export { Carousel }
