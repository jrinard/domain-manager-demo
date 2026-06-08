import React, { PropsWithChildren, CSSProperties } from 'react'

import * as styling from '@falcon/style'

const variants = styling.cva('grid grid-cols-12', {
  variants: {
    columns: {
      12: 'grid-cols-12',
      9: 'grid-cols-9',
      6: 'grid-cols-6',
      4: 'grid-cols-4',
      3: 'grid-cols-3',
      2: 'grid-cols-2',
    },
    gutter: {
      sm: 'gap-2',
      md: 'gap-4',
      standard: 'gap-6',
      lg: 'gap-8',
    },
  },
  defaultVariants: {
    columns: 12,
    gutter: 'lg',
  },
})

export interface GridProps
  extends PropsWithChildren,
    styling.VariantProps<typeof variants> {
  areasByName?: Array<(string | { name: string; columnSpan: number })[]>
  className?: string
  style?: React.CSSProperties
  columnWidthsAdjustToContent?: boolean
}

const Grid = ({
  areasByName,
  className,
  columns,
  gutter,
  style: _style,
  columnWidthsAdjustToContent = true,
  ...props
}: GridProps) => {
  const style = React.useMemo(() => {
    const computedStyle: CSSProperties = _style ? { ..._style } : {}

    if (areasByName) {
      computedStyle['gridTemplateAreas'] =
        convertAreasByNameToGridTemplateAreas(columns ?? 12, areasByName)
    }

    if (!columnWidthsAdjustToContent) {
      computedStyle['gridTemplateColumns'] = `repeat(${columns}, 1fr)`
    }

    return computedStyle
  }, [columns, _style, columnWidthsAdjustToContent, areasByName])

  return (
    <div
      className={styling.mergeClasses(variants({ columns, gutter }), className)}
      style={style}
      {...props}
    >
      {props.children}
    </div>
  )
}

function convertAreasByNameToGridTemplateAreas(
  columnsCount: number,
  areasByName: Array<(string | { name: string; columnSpan: number })[]>,
) {
  const areas = areasByName.map((areaNamesRow) => {
    const row: string[] = []

    areaNamesRow.forEach((areaName) => {
      if (typeof areaName === 'string') {
        row.push(areaName)
      } else {
        const { name, columnSpan } = areaName
        const area = Array.from(
          { length: Math.min(Math.max(columnSpan || 1, 1), 12) },
          () => name,
        )
        row.push(...area)
      }
    })

    // * Apparently if you `grid-template-areas` contains a row with
    // * a length that is shorter than the columns count,
    // * it will consider the style property invalid and not apply it.
    // * So we need to fill the row with `void-fill` to make it valid and not be ignored.
    if (row.length < columnsCount) {
      const fillRows = Array.from(
        { length: columnsCount - row.length },
        () => 'void-fill',
      )
      row.push(...fillRows)
    }

    return `"${row.slice(0, columnsCount).join(' ')}"`
  })

  return areas.join(' ')
}

Grid.displayName = 'Grid'

export { Grid }
