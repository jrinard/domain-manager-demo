import React from 'react'
import { Icon } from '@falcon/icons'
import { TextBody } from '@spacedock/falcon-ui'

export interface SearchResultSection {
  title?: string
  icon?: string
  results: React.ReactNode[]
  showSearchingPlaceholder?: boolean
  searchPlaceholder?: string
}

export interface SearchResultsProps {
  sections: SearchResultSection[]
  activeSearch: string
}

/**
 * Container component that renders structured search results
 * Based on legacy SearchResults from Tryyb
 */
export const SearchResults = ({
  sections,
  activeSearch,
}: SearchResultsProps) => {
  return (
    <div className="border-grayscale-300 dark:border-grayscale-700 dark:bg-grayscale-800 absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-y-auto rounded-md border bg-white shadow-lg">
      {sections.map((section, idx) => (
        <div key={idx}>
          {section.title && section.icon && (
            <div className="border-grayscale-200 dark:border-grayscale-700 flex items-center gap-2 border-b px-4 py-2">
              <Icon icon={section.icon} className="text-primary h-4 w-4" />
              <TextBody className="text-primary text-sm font-bold">
                {section.title}
              </TextBody>
            </div>
          )}

          <ul className="list-none p-0">
            {section.results.length > 0 ? (
              section.results
            ) : section.showSearchingPlaceholder !== false ? (
              <li className="flex items-center gap-2 px-4 py-2">
                <Icon
                  icon="search"
                  className="text-grayscale-400 dark:text-grayscale-500 h-4 w-4 animate-pulse"
                />
                <TextBody className="text-grayscale-500 dark:text-grayscale-400 text-xs italic">
                  {section.searchPlaceholder || 'Searching...'}
                </TextBody>
                <TextBody className="text-grayscale-600 dark:text-grayscale-300 text-xs">
                  {activeSearch}
                </TextBody>
              </li>
            ) : (
              <li className="flex items-center gap-2 px-4 py-2">
                <Icon
                  icon="alert-circle-outline"
                  className="text-grayscale-400 dark:text-grayscale-500 h-4 w-4"
                />
                <TextBody className="text-grayscale-500 dark:text-grayscale-400 text-xs italic">
                  No Matches
                </TextBody>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}
