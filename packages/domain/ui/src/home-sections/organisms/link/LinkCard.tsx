import React from 'react'
import { cva, mergeClasses } from '@falcon/style'

import { TextBody, TextHeading } from '@spacedock/falcon-ui'
import { Link } from '@spacedock/navigator'
import { Icon } from '@falcon/icons'
import { cardSizeVariants, type CardSize } from '@spacedock/bento'

/** Card bgColor variants - matches section Background Color options */
const CARD_BG_MAP: Record<string, string> = {
  transparent: 'bg-transparent',
  site: 'bg-site-bg',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  grey: 'bg-grayscale-200 dark:bg-grayscale-900',
  'contrast-low': 'bg-bg-contrast-low',
  'contrast-medium': 'bg-bg-contrast-medium',
  'contrast-high': 'bg-bg-contrast-high',
  inherit: 'bg-inherit',
}
/** Card textColor variants for inverted styling. Use ! to override TextBody/TextHeading group-surface defaults. */
const CARD_TEXT_MAP: Record<string, string> = {
  inherit: '!text-inherit',
  primary: '!text-primary',
  secondary: '!text-secondary',
  muted: '!text-muted',
  site: '!text-site',
  'grayscale-light': '!text-grayscale-100',
  'grayscale-dark': '!text-grayscale-900',
}

const linkWidthVariants = cva('flex flex-col gap-2', {
  variants: {
    width: {
      auto: '',
      sm: 'min-w-32',
      md: 'min-w-40',
      lg: 'min-w-48',
      xl: 'min-w-64',
      '2xl': 'min-w-80',
      full: 'w-full',
    },
  },
  defaultVariants: {
    width: 'full',
  },
})

export interface LinkProps {
  title: string
  link: string
  app?: string
  isPreview?: boolean
  topRender?: React.ReactNode
  titleRender?: React.ReactNode
  isExternal?: boolean
  disabled?: boolean
  hideIcon?: boolean
  hideArrow?: boolean
  /** Card background color - independent of section. "none" or undefined = no card. */
  itemBgColor?:
    | 'none'
    | 'transparent'
    | 'site'
    | 'primary'
    | 'secondary'
    | 'grey'
    | 'contrast-low'
    | 'contrast-medium'
    | 'contrast-high'
  /** Card text color for inverted styling (e.g. primary bg + light text) */
  itemTextColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'muted'
    | 'site'
    | 'grayscale-light'
    | 'grayscale-dark'
  /**
   * Card dimensions (bento cardSizeVariants). Explicit value always wins.
   * When omitted and card is on: auto height in row/column; fixed ~230px height in grid only.
   */
  cardSize?: CardSize
  /** When true (e.g. items-group grid), fill the cell and avoid min-width overflow into neighbors. */
  inGrid?: boolean
  /** When true (e.g. items-group row), stretch to the row line height so siblings match the tallest tab/icon. */
  stretchWithRow?: boolean
  alignVerticalClass?: string
  alignHorizontalClass?: string
  mockMinWidthClass?: string
  target?: string
  variant?: 'stacked'
  /** When true, render as a non-clickable block (images/text only). */
  staticDisplay?: boolean
}

const LinkCard = ({
  title,
  link,
  app,
  isPreview,
  topRender,
  titleRender,
  target,
  variant,
  width,
  itemBgColor,
  itemTextColor,
  cardSize,
  inGrid,
  stretchWithRow,
  staticDisplay,
  ...props
}: LinkProps) => {
  const Tag = staticDisplay ? 'div' : props.disabled ? 'div' : props.isExternal ? 'a' : Link
  const TitleTag = variant === 'stacked' ? TextHeading : TextBody

  // Card mode: itemBgColor set (and not 'none')
  const effectiveBg =
    itemBgColor && itemBgColor !== 'none' ? itemBgColor : undefined
  const hasCardStyle = !!effectiveBg
  const effectiveCardSize: CardSize = hasCardStyle
    ? (cardSize ?? (inGrid ? 'section-card' : 'none'))
    : 'none'

  const cardClasses = hasCardStyle
    ? mergeClasses(
        'flex rounded-md border border-[var(--bg-contrast-medium)] p-2',
        cardSizeVariants({ cardSize: effectiveCardSize }),
        CARD_BG_MAP[effectiveBg],
        itemTextColor ? CARD_TEXT_MAP[itemTextColor] : undefined,
      )
    : undefined

  const widthLayout = inGrid
    ? 'box-border flex min-w-0 w-full max-w-full flex-col gap-2'
    : mergeClasses('box-border', linkWidthVariants({ width }))

  const rowStretchClasses = stretchWithRow ? 'min-h-0 self-stretch' : undefined
  const showTitleRow = staticDisplay
    ? !!title?.trim() || !!titleRender
    : true

  return (
    <Tag
      className={mergeClasses(
        widthLayout,
        variant === 'stacked' && 'grid',
        cardClasses,
        rowStretchClasses,
        props.mockMinWidthClass,
        props.alignVerticalClass,
      )}
      to={link}
      href={link}
      target={target}
      app={app}
      rel="noopener noreferrer"
    >
      {topRender ? (
        <div
          className={mergeClasses(
            'flex flex-col gap-2',
            variant === 'stacked' && 'col-span-full row-span-full',
          )}
        >
          {topRender}
        </div>
      ) : null}

      {showTitleRow ? (
      <div
        className={mergeClasses(
          'flex w-full items-center',
          variant === 'stacked' && 'col-span-full row-span-full',
          props.hideIcon ? 'justify-center' : 'justify-between',
          hasCardStyle && itemTextColor && CARD_TEXT_MAP[itemTextColor],
        )}
      >
        <TitleTag
          className={mergeClasses(
            'flex w-full flex-row items-center gap-2 p-2 leading-[18px]',
            hasCardStyle && itemTextColor && CARD_TEXT_MAP[itemTextColor],
            props.alignHorizontalClass,
          )}
        >
          {titleRender ? titleRender : null}
          {title}
        </TitleTag>
        {!props.hideArrow && (
          <div
            className={
              hasCardStyle && itemTextColor ? CARD_TEXT_MAP[itemTextColor] : ''
            }
          >
            <Icon
              icon="arrow-right"
              color={hasCardStyle && itemTextColor ? 'current' : 'muted'}
              size="xl"
            />
          </div>
        )}
      </div>
      ) : null}
    </Tag>
  )
}

LinkCard.displayName = 'LinkCard'

export { LinkCard }
