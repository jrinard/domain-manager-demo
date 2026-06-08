import React from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Link } from '@spacedock/navigator'
import type { MenuSearchResult } from '../../hooks/useMenuItemsSearch'

export interface SearchMenuItemProps {
  item: MenuSearchResult
  searchTerm: string
  isActive?: boolean
  onSelect: () => void
}

/**
 * Component to render a menu item search result
 * Based on legacy SearchMenuItem from Tryyb
 */
export const SearchMenuItem = ({
  item,
  searchTerm,
  isActive,
  onSelect,
}: SearchMenuItemProps) => {
  const handleClick = () => {
    onSelect()
  }

  // Fix icon path for localhost development
  const iconSrc = item.iconPath ? getFullIconPath(item.iconPath) : undefined
  const href = item.href || '#'

  return (
    <li
      className={`border-grayscale-100 dark:border-grayscale-700 dark:hover:bg-grayscale-700 flex items-start gap-3 border-b transition-colors hover:bg-blue-50 ${
        isActive ? 'dark:bg-grayscale-700 bg-blue-100' : ''
      }`}
    >
      <Link
        to={href}
        target="_blank"
        className="flex w-full cursor-pointer items-start gap-3 px-4 py-3 no-underline"
        onClick={handleClick}
      >
        {/* Icon */}
        {iconSrc && (
          <img
            src={iconSrc}
            alt=""
            className="mt-1 h-4 w-4 flex-shrink-0 object-contain"
          />
        )}

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <TextBody className="text-grayscale-900 dark:text-grayscale-100 font-medium">
            {highlightText(item.displayName, searchTerm)}
          </TextBody>
          {item.description && (
            <TextBody className="text-grayscale-600 dark:text-grayscale-400 text-xs">
              - {highlightText(item.description, searchTerm)}
            </TextBody>
          )}
        </div>
      </Link>
    </li>
  )
}

/**
 * Get full icon path, handling localhost development
 */
function getFullIconPath(iconPath: string): string {
  // If already a full URL, return as-is
  if (iconPath.startsWith('http://') || iconPath.startsWith('https://')) {
    return iconPath
  }

  // If localhost, use cherry.mocaworks.com for images
  if (window.location.hostname === 'localhost') {
    return `https://cherry.mocaworks.com${iconPath}`
  }

  // Otherwise use relative path
  return iconPath
}

function highlightText(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm || !text) {
    return text
  }

  try {
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 font-semibold">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  } catch {
    return text
  }
}
