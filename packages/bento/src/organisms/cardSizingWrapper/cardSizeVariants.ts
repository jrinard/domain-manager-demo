import { cva, type VariantProps } from '@falcon/style'

/**
 * Generic card sizing for any organism (links, buttons, tiles).
 * Not tied to a single component — import where you need consistent card proportions.
 */
export const cardSizeVariants = cva('', {
  variants: {
    cardSize: {
      /** No forced min-height (card grows with content / row stretch). */
      none: '',
      /** Fixed height 230px — matches legacy link/tab cards in grid. */
      'section-card': 'h-[230px]',
    },
  },
  defaultVariants: {
    cardSize: 'none',
  },
})

export type CardSize = NonNullable<VariantProps<typeof cardSizeVariants>['cardSize']>
