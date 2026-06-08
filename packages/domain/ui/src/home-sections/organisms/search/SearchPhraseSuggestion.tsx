import React from 'react'
import { Icon } from '@falcon/icons'
import { TextBody } from '@spacedock/falcon-ui'

export interface SearchPhraseSuggestionProps {
  phrase: string
  searchTerm: string
  isActive?: boolean
  onSelect: (phrase: string) => void
}

/**
 * Component to render a search phrase suggestion
 * Based on legacy SearchPhraseSuggestion from Tryyb
 */
export const SearchPhraseSuggestion = ({
  phrase,
  searchTerm,
  isActive,
  onSelect,
}: SearchPhraseSuggestionProps) => {
  const handleClick = () => {
    onSelect(phrase)
  }

  return (
    <li
      className={`border-grayscale-100 dark:border-grayscale-700 dark:hover:bg-grayscale-700 flex cursor-pointer items-center gap-3 border-b px-4 py-2 transition-colors hover:bg-blue-50 ${
        isActive ? 'dark:bg-grayscale-700 bg-blue-100' : ''
      }`}
      onClick={handleClick}
    >
      {/* Search Icon */}
      <Icon
        icon="magnify"
        className="text-grayscale-400 dark:text-grayscale-500 h-4 w-4 flex-shrink-0"
      />

      {/* Phrase Text */}
      <div className="flex items-baseline gap-1">
        <TextBody className="text-grayscale-500 dark:text-grayscale-400 text-xs italic">
          Search for
        </TextBody>
        <TextBody className="text-grayscale-900 dark:text-grayscale-100 text-sm">
          {phrase}
        </TextBody>
      </div>
    </li>
  )
}
