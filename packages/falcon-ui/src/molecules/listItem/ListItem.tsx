import { mergeClasses } from '@falcon/style'
import { forwardRef, MouseEvent, PropsWithChildren } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { ListItemMain } from './ListItemMain'
import { ListItemSide } from './ListItemSide'

const variants = cva(
  'group/item bg-site-bg font-body text-secondary-fg status-new/item:bg-site-bg-new group-surface-light:text-primary relative z-0 flex items-center rounded-lg p-2 transition-colors duration-150',
  {
    variants: {
      gap: {
        '0': 'gap-0',
        '1': 'gap-1',
        '2': 'gap-2',
        '3': 'gap-3',
        '4': 'gap-4',
        '5': 'gap-5',
      },
      selected: {
        true: '!bg-site-bg-selected hover:invert-0 focus:invert-0',
        false: '',
      },
      disabled: {
        true: 'text-secondary/50',
        false: 'cursor-not-allowed',
      },
      unselectable: {
        false: '',
        true: 'cursor-default',
      },
    },
    compoundVariants: [
      {
        unselectable: false,
        disabled: false,
        className:
          'hover:drop-shadow-l group-surface-light:hover:outline-1 group-surface-light:hover:outline-primary cursor-pointer hover:z-20 hover:outline hover:outline-1',
      },
    ],
    defaultVariants: {
      selected: false,
      disabled: false,
      unselectable: false,
    },
  },
)

export interface ListItemProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  onClick?: (e: MouseEvent) => void
  isNew?: boolean
  gap?: '0' | '1' | '2' | '3' | '4' | '5'
  className?: string
  to?: string
  width?: string
  height?: string
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      onClick,
      selected,
      children,
      isNew,
      gap = '2',
      disabled,
      className,
      unselectable,
      width,
      height,
      to,
    }: ListItemProps,
    ref,
  ) => {
    return to ? (
      <li
        ref={ref}
        data-status={isNew ? 'new' : ''}
        onClick={onClick}
        className={mergeClasses([
          variants({ selected, disabled, unselectable }),
          className,
        ])}
        style={{ width, height }}
      >
        <Link
          to={to}
          className={mergeClasses(
            'relative z-0 flex w-full items-center font-medium',
            variants({ gap }),
            className,
          )}
        >
          {children}
        </Link>
      </li>
    ) : (
      <li
        ref={ref}
        data-status={isNew ? 'new' : ''}
        className={mergeClasses([
          variants({ selected, disabled, unselectable, gap }),
          className,
        ])}
        onClick={onClick}
        style={{ width, height }}
      >
        {children}
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'

export { ListItem, ListItemMain, ListItemSide }
