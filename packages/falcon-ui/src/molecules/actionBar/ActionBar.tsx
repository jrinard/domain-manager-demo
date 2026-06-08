import { mergeClasses } from '@falcon/style'
import * as React from 'react'

import { ButtonGroupItems } from '../buttonGroup/ButtonGroupItems'
import { ButtonGroupOverflowMenuContent } from '../buttonGroup/ButtonGroupOverflowMenuContent'
import type { ButtonGroupItemType } from '../buttonGroup/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../dropdownMenu/DropdownMenu'
import { IconButton } from '../iconButton/IconButton'

import './ActionBar.scss'

export interface ActionBarProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={mergeClasses(
          'action-bar flex min-w-0 flex-col gap-2',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
ActionBar.displayName = 'ActionBar'

export interface ActionBarRowProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

const ActionBarRow = React.forwardRef<HTMLDivElement, ActionBarRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={mergeClasses(
          'flex min-h-10 min-w-0 flex-row flex-nowrap items-center justify-between gap-3 overflow-x-auto px-2 py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
ActionBarRow.displayName = 'ActionBarRow'

export interface ActionBarSectionProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
  align?: 'start' | 'end'
}

const ActionBarSection = React.forwardRef<
  HTMLDivElement,
  ActionBarSectionProps
>(({ className, children, align = 'start', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={mergeClasses(
        'flex min-w-0 flex-nowrap items-center gap-2',
        align === 'start' && 'min-w-0 flex-1 justify-start',
        align === 'end' && 'max-w-full shrink-0 justify-end',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ActionBarSection.displayName = 'ActionBarSection'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EXPAND_PAD_PX = 40

function itemRendersToDOM(item: ButtonGroupItemType): boolean {
  if (item.type === 'separator') return true
  return !('hidden' in item && item.hidden)
}

function countDomSlots(items: ButtonGroupItemType[]): number {
  return items.filter(itemRendersToDOM).length
}

function takeByDomSlots(
  items: ButtonGroupItemType[],
  domCount: number,
): ButtonGroupItemType[] {
  if (domCount <= 0) return []
  let seen = 0
  const out: ButtonGroupItemType[] = []
  for (const it of items) {
    out.push(it)
    if (itemRendersToDOM(it)) {
      seen++
      if (seen >= domCount) break
    }
  }
  return out
}

function dropByDomSlots(
  items: ButtonGroupItemType[],
  domCount: number,
): ButtonGroupItemType[] {
  if (domCount <= 0) return items
  let seen = 0
  for (let i = 0; i < items.length; i++) {
    if (itemRendersToDOM(items[i])) {
      seen++
      if (seen >= domCount) return items.slice(i + 1)
    }
  }
  return []
}

/**
 * Read per-child widths from the ButtonGroup inside `root`.
 * Uses getBoundingClientRect for sub-pixel accuracy.
 */
function getChildWidths(root: HTMLElement | null): number[] {
  if (!root) return []
  const group = root.querySelector(
    ':scope > [data-slot="button-group"]',
  ) as HTMLElement | null
  if (!group) return []
  const kids = Array.from(group.children) as HTMLElement[]
  return kids.map((el) => el.getBoundingClientRect().width)
}

// ---------------------------------------------------------------------------
// ActionBarRowOverflow
// ---------------------------------------------------------------------------

export interface ActionBarRowOverflowProps extends Omit<
  React.ComponentProps<'div'>,
  'children'
> {
  items: ButtonGroupItemType[]
  overflowMenuAriaLabel?: string
}

/**
 * Renders a single row of action-bar items.  When the row is too narrow to
 * show every item, the rightmost items that don't fit collapse behind a
 * single vertical-dots overflow menu.
 *
 * Measurement strategy: ALL items are always rendered in a visually-hidden
 * inner div so the browser lays them out at natural width. We read each
 * child's `getBoundingClientRect().width`, sum left-to-right, and find the
 * cutoff. Items past the cutoff are hidden with `visibility:hidden;
 * position:absolute` (kept in the DOM for measurement) and mirrored in the
 * overflow dropdown.
 */
const ActionBarRowOverflow = React.forwardRef<
  HTMLDivElement,
  ActionBarRowOverflowProps
>(
  (
    { className, items, overflowMenuAriaLabel = 'More actions', ...props },
    ref,
  ) => {
    const containerRef: React.MutableRefObject<HTMLDivElement | null> =
      React.useRef(null)
    const measureRef: React.MutableRefObject<HTMLDivElement | null> =
      React.useRef(null)
    const dotsBtnRef: React.MutableRefObject<HTMLButtonElement | null> =
      React.useRef(null)

    const totalDomSlots = React.useMemo(() => countDomSlots(items), [items])

    const [visibleCount, setVisibleCount] = React.useState(totalDomSlots)
    const prevVisRef = React.useRef(visibleCount)
    prevVisRef.current = visibleCount

    const setContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          const r = ref as React.MutableRefObject<HTMLDivElement | null>
          r.current = node
        }
      },
      [ref],
    )

    const recompute = React.useCallback(() => {
      const container = containerRef.current
      const measureRoot = measureRef.current
      if (!container || !measureRoot) return

      const childWidths = getChildWidths(measureRoot)
      if (totalDomSlots > 0 && childWidths.length === 0) return

      const n = childWidths.length

      const cs = getComputedStyle(container)
      const contentW =
        container.clientWidth -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight)

      const containerGap = parseFloat(cs.columnGap) || 0

      const dotsW = dotsBtnRef.current?.getBoundingClientRect().width ?? 36

      const groupEl = measureRoot.querySelector(
        ':scope > [data-slot="button-group"]',
      ) as HTMLElement | null
      const groupGap = groupEl
        ? parseFloat(getComputedStyle(groupEl).columnGap) || 0
        : 0

      const totalNatural = childWidths.reduce(
        (s, w) => s + w,
        groupGap * Math.max(0, n - 1),
      )

      if (totalNatural <= contentW) {
        setVisibleCount(n)
        return
      }

      // Budget for items when the dots button is also present:
      // [items] <containerGap> [dotsButton]
      const budget = contentW - containerGap - dotsW

      let cummul = 0
      let fits = 0
      for (let i = 0; i < n; i++) {
        const needed = childWidths[i] + (i > 0 ? groupGap : 0)
        if (cummul + needed > budget) break
        cummul += needed
        fits = i + 1
      }

      // Hysteresis: only re-expand when there's comfortable room
      const prev = prevVisRef.current
      if (fits > prev) {
        const conservativeBudget = budget - EXPAND_PAD_PX
        let cumC = 0
        let fitsC = 0
        for (let i = 0; i < n; i++) {
          const needed = childWidths[i] + (i > 0 ? groupGap : 0)
          if (cumC + needed > conservativeBudget) break
          cumC += needed
          fitsC = i + 1
        }
        setVisibleCount(fitsC > prev ? fitsC : prev)
      } else {
        setVisibleCount(fits)
      }
    }, [totalDomSlots])

    React.useLayoutEffect(() => {
      setVisibleCount((v) => Math.min(v, totalDomSlots))
    }, [totalDomSlots])

    React.useLayoutEffect(() => {
      recompute()
    }, [recompute, items])

    React.useLayoutEffect(() => {
      const el = containerRef.current
      if (!el) return
      const ro = new ResizeObserver(() => recompute())
      ro.observe(el)
      return () => ro.disconnect()
    }, [recompute])

    const safeVis = Math.min(visibleCount, totalDomSlots)
    const hasOverflow = safeVis < totalDomSlots

    const shownItems = takeByDomSlots(items, safeVis)
    const overflowItems = hasOverflow
      ? dropByDomSlots(items, safeVis)
      : ([] as ButtonGroupItemType[])

    return (
      <div
        ref={setContainerRef}
        className={mergeClasses(
          'relative flex min-h-10 w-full min-w-0 flex-row items-center gap-2 px-2 py-1.5',
          className,
        )}
        {...props}
      >
        {/*
         * Measurement row: always renders ALL items at natural width.
         * It's invisible but remains in-flow so offsetParent and
         * getBoundingClientRect work reliably.
         */}
        <div
          ref={measureRef}
          className="pointer-events-none invisible absolute left-0 top-0 flex h-0 w-max flex-row items-center overflow-hidden"
          aria-hidden
        >
          <ButtonGroupItems className="gap-2" items={items} />
        </div>

        {/* Hidden dots button for width measurement */}
        <IconButton
          ref={dotsBtnRef}
          type="button"
          icon="dots-vertical"
          aria-hidden
          dense
          size="sm"
          tabIndex={-1}
          className="pointer-events-none invisible absolute left-0 top-0"
        />

        {/* Visible items */}
        {safeVis > 0 ? (
          <ButtonGroupItems className="gap-2" items={shownItems} />
        ) : null}

        {/* Overflow dots trigger */}
        {hasOverflow ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                type="button"
                icon="dots-vertical"
                aria-label={overflowMenuAriaLabel}
                dense
                size="sm"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="max-h-[min(24rem,70vh)] overflow-y-auto"
            >
              <ButtonGroupOverflowMenuContent items={overflowItems} />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    )
  },
)
ActionBarRowOverflow.displayName = 'ActionBarRowOverflow'

// ---------------------------------------------------------------------------
// Legacy two-section split (kept for backward compat)
// ---------------------------------------------------------------------------

export interface ActionBarRowSplitOverflowProps extends Omit<
  React.ComponentProps<'div'>,
  'children'
> {
  leadingItems: ButtonGroupItemType[]
  trailingItems: ButtonGroupItemType[]
  overflowMenuAriaLabel?: string
}

/**
 * @deprecated Prefer `ActionBarRowOverflow` with a single `items` array.
 */
const ActionBarRowSplitOverflow = React.forwardRef<
  HTMLDivElement,
  ActionBarRowSplitOverflowProps
>(({ leadingItems, trailingItems, ...props }, ref) => {
  const items = React.useMemo(
    () => [...leadingItems, ...trailingItems],
    [leadingItems, trailingItems],
  )
  return <ActionBarRowOverflow ref={ref} items={items} {...props} />
})
ActionBarRowSplitOverflow.displayName = 'ActionBarRowSplitOverflow'

export {
  ActionBar,
  ActionBarRow,
  ActionBarRowOverflow,
  ActionBarRowSplitOverflow,
  ActionBarSection,
}
