import React from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Link } from '@spacedock/navigator'
import type { PersonSearchResult } from '../../hooks/usePeopleSearch'

export interface SearchPersonProps {
  person: PersonSearchResult
  searchTerm: string
  isActive?: boolean
  onSelect: () => void
}

/**
 * Component to render a person search result
 * Based on legacy SearchPerson from Tryyb
 */
export const SearchPerson = ({
  person,
  searchTerm,
  isActive,
  onSelect,
}: SearchPersonProps) => {
  const handleClick = () => {
    onSelect()
  }

  return (
    <li
      className={`border-grayscale-100 dark:border-grayscale-700 dark:hover:bg-grayscale-700 flex items-center gap-3 border-b transition-colors hover:bg-blue-50 ${
        isActive ? 'dark:bg-grayscale-700 bg-blue-100' : ''
      }`}
    >
      <Link
        to={`/profile/${person.userID}`}
        target="_blank"
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 no-underline"
        onClick={handleClick}
      >
        {/* User Avatar Placeholder */}
        <div className="bg-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
          {person.userName.charAt(0).toUpperCase()}
        </div>

        {/* User Name with highlighting */}
        <TextBody className="text-primary text-sm">
          {highlightText(person.userName, searchTerm)}
        </TextBody>
      </Link>
    </li>
  )
}

/**
 * Simple text highlighter - highlights matching search terms
 */
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
