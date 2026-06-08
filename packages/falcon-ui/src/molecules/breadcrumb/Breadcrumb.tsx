import { kebabCase } from 'lodash'
import { Link } from 'react-router-dom'
import { mergeClasses } from '@falcon/style'
import { TextBody } from '../../atoms/textBody/TextBody'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import { useResponsiveBreadcrumb } from '../../hooks/useResponsiveBreadcrumb'

export interface BreadcrumbProps {
  items: { label: string; id: string | number; to?: string }[]
  onClick?: (id: string | number) => void
}

const Breadcrumb = ({ items, onClick, ...props }: BreadcrumbProps) => {
  const { containerRef, visibleItems, condensed } =
    useResponsiveBreadcrumb(items)

  if (!items || !items.length) return null

  return (
    <ul
      ref={containerRef}
      className="mt-2 flex max-w-[calc(100vw-16px)] items-center overflow-hidden"
      {...props}
    >
      {visibleItems.map((item, index) => {
        const isEllipsis = item.id === '__ellipsis__'
        const isLast = index === visibleItems.length - 1

        if (isEllipsis) {
          const middle = items.slice(1, -2)
          return (
            <li key="breadcrumb-ellipsis" className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="font-body leading-4 underline-offset-4 hover:underline">
                    ...
                  </button>
                </PopoverTrigger>
                <PopoverContent className="z-50 flex flex-col rounded border border-gray-700 bg-neutral-800 p-2 text-white shadow-md">
                  {middle.map((m) =>
                    m.to ? (
                      <Link
                        key={m.id}
                        to={m.to}
                        className="rounded p-1 hover:bg-neutral-700"
                      >
                        {m.label}
                      </Link>
                    ) : (
                      <button
                        key={m.id}
                        onClick={() => onClick && onClick(m.id)}
                        className="rounded p-1 text-left hover:bg-neutral-700"
                      >
                        {m.label}
                      </button>
                    ),
                  )}
                </PopoverContent>
              </Popover>
              <TextBody>/</TextBody>
            </li>
          )
        }

        return (
          <li
            key={`breadcrumb-item-${kebabCase(item.label)}`}
            className="flex gap-1"
          >
            {item.to ? (
              <Link
                to={item.to}
                className={mergeClasses(
                  'font-body mx-2 leading-4 underline-offset-4 hover:underline',
                  isLast && 'font-bold',
                )}
              >
                {item.label}
              </Link>
            ) : (
              <button
                onClick={() => onClick && onClick(item.id)}
                className={mergeClasses(
                  'font-body mx-2 leading-4 underline-offset-4 hover:underline',
                  isLast && 'font-bold',
                )}
              >
                {item.label}
              </button>
            )}
            {!isLast && <TextBody>/</TextBody>}
          </li>
        )
      })}
    </ul>
  )
}

Breadcrumb.displayName = 'Breadcrumb'

export { Breadcrumb }
