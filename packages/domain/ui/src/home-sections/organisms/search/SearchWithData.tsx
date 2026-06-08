import React, { useMemo, useState } from 'react'
import type { SearchSectionData } from '@domain/schemas'
import type { SearchSection as SearchSectionType } from '@domain/configs'
import type { DomainUI } from '@spacedock/manifest'
import { useSearchInput } from '../../hooks/useSearchInput'
import { useMenuItemsSearch } from '../../hooks/useMenuItemsSearch'
import { usePeopleSearch } from '../../hooks/usePeopleSearch'
import { useMatchingAttachment } from '../../hooks/useMatchingAttachment'
import { useSearchPhraseRecentQuery, useMenuQuery } from '@tyto/query'
import { SearchResults } from './SearchResults'
import { SearchMenuItem } from './SearchMenuItem'
import { SearchPerson } from './SearchPerson'
import { SearchPhraseSuggestion } from './SearchPhraseSuggestion'
import { SearchLessonResultsDialog } from './SearchLessonResultsDialog'
import { Icon } from '@falcon/icons'
import { TextBody } from '@spacedock/falcon-ui'

export interface SearchWithDataProps {
  section: SearchSectionType
  sectionData: SearchSectionData
  attachments?: DomainUI.Attachment[]
  domainID?: number
}

/**
 * Functional search component with data integration
 * Based on legacy SearchInput from Tryyb
 */
export const SearchWithData = ({
  section,
  sectionData,
  attachments,
  domainID,
}: SearchWithDataProps) => {
  const {
    placeholder = 'Search',
    border_radius = '8px',
    header_image_width = '1/4',
    can_search_menu = true,
    can_search_people = true,
  } = sectionData

  // Search input state
  const {
    searchValue,
    inputValue,
    hasFocus,
    handleInputChange,
    handleFocus,
    handleBlur,
    clearSearch,
  } = useSearchInput()

  // Dialog state for knowledge object search results
  const [koSearchDialogOpen, setKoSearchDialogOpen] = useState(false)
  const [selectedSearchPhrase, setSelectedSearchPhrase] = useState('')

  // Get header image from attachments
  const { pathURL: headerImageUrl } = useMatchingAttachment(
    sectionData.header_image ?? 0,
    attachments,
  )

  // Fetch menu items once when component mounts
  const menuQuery = useMenuQuery({
    disabled: !can_search_menu,
  })

  // Only search if we have at least 2 characters (reduces API calls for single character searches)
  const shouldSearch = searchValue.length >= 2

  // Search menu items from the fetched menu - only if search term is long enough
  const menuResults = useMenuItemsSearch(
    searchValue,
    menuQuery.data?.menuItems,
    {
      enabled: can_search_menu && shouldSearch,
      maxResults: 5,
    },
  )

  // Search people - only if search term is long enough
  const peopleResults = usePeopleSearch(searchValue, domainID ?? 0, {
    enabled: can_search_people && !!domainID && shouldSearch,
    maxResults: 5,
  })

  // Search phrase suggestions - only if search term is long enough
  const phraseSuggestionsQuery = useSearchPhraseRecentQuery({
    searchString: searchValue,
    domainID: domainID ?? 0,
    enabled: !!domainID && shouldSearch,
  })

  const phraseSuggestions = useMemo(() => {
    const suggestions = phraseSuggestionsQuery.data

    // Ensure we have an array to work with
    if (!suggestions || !Array.isArray(suggestions)) {
      return []
    }

    // Filter out the current search term and return up to 5 suggestions
    return suggestions.filter((s) => s !== searchValue).slice(0, 5)
  }, [phraseSuggestionsQuery.data, searchValue])

  // Map border_radius values to styles
  const borderRadiusStyle = border_radius === 'none' ? '0' : border_radius

  // Map header_image_width to Tailwind classes
  const widthClassMap = {
    '1/4': 'w-1/4',
    '1/3': 'w-1/3',
    '1/2': 'w-1/2',
    '3/4': 'w-3/4',
    full: 'w-full',
  }
  const headerWidthClass = widthClassMap[header_image_width]

  const showResults = hasFocus && searchValue.length > 0

  // Build search result sections
  const searchSections = useMemo(() => {
    const sections = []

    // Common Searches section (phrase suggestions) - Show first
    if (
      (can_search_menu || can_search_people) &&
      phraseSuggestions.length > 0
    ) {
      sections.push({
        title: 'Common Searches',
        icon: 'file-document-outline',
        results: phraseSuggestions.map((phrase, idx) => (
          <SearchPhraseSuggestion
            key={`phrase-${idx}`}
            phrase={phrase}
            searchTerm={searchValue}
            onSelect={(selectedPhrase) => {
              setSelectedSearchPhrase(selectedPhrase)
              setKoSearchDialogOpen(true)
              clearSearch()
            }}
          />
        )),
        showSearchingPlaceholder: false,
      })
    }

    // Menu items section
    if (can_search_menu) {
      const menuResultsComponents = menuResults.map((item, idx) => (
        <SearchMenuItem
          key={`menu-${idx}`}
          item={item}
          searchTerm={searchValue}
          onSelect={clearSearch}
        />
      ))

      // Add "Search All Knowledge Objects" link at the end
      menuResultsComponents.push(
        <li
          key="search-all"
          className="border-grayscale-100 dark:border-grayscale-700 dark:hover:bg-grayscale-700 flex cursor-pointer items-center gap-3 border-b px-4 py-3 transition-colors hover:bg-blue-50"
          onClick={() => {
            setSelectedSearchPhrase(searchValue)
            setKoSearchDialogOpen(true)
            clearSearch()
          }}
        >
          <Icon
            icon="file-search"
            className="text-primary h-4 w-4 flex-shrink-0"
          />
          <TextBody className="text-primary text-sm font-medium">
            Search all knowledge objects for "{searchValue}"
          </TextBody>
        </li>,
      )

      sections.push({
        title: 'Tryyb',
        icon: 'menu',
        results: menuResultsComponents,
      })
    }

    // People section
    if (can_search_people) {
      sections.push({
        title: 'People',
        icon: 'account',
        results: peopleResults.map((person, idx) => (
          <SearchPerson
            key={`person-${person.userID}`}
            person={person}
            searchTerm={searchValue}
            onSelect={clearSearch}
          />
        )),
        showSearchingPlaceholder: peopleResults.length === 0,
        searchPlaceholder: 'Searching users for',
      })
    }

    return sections
  }, [
    searchValue,
    menuResults,
    peopleResults,
    phraseSuggestions,
    can_search_menu,
    can_search_people,
    clearSearch,
  ])

  return (
    <div className="relative flex h-full flex-col">
      {/* Header Image */}
      {headerImageUrl && (
        <div className={`mb-4 flex justify-start ${headerWidthClass}`}>
          <img
            src={headerImageUrl}
            alt="Search header"
            className="max-h-48 w-auto max-w-full object-contain"
          />
        </div>
      )}

      {/* Search Input Container */}
      <div className="relative w-full">
        {/* Search Icon */}
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Icon
            icon="magnify"
            className="text-grayscale-400 dark:text-grayscale-500 h-5 w-5"
          />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder={hasFocus ? '' : placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="focus:border-primary focus:ring-primary/20 border-grayscale-300 text-grayscale-900 dark:border-grayscale-600 dark:bg-grayscale-900 dark:text-grayscale-100 w-full border bg-white py-3 pl-10 pr-4 text-lg focus:outline-none focus:ring-2"
          style={{ borderRadius: borderRadiusStyle }}
        />

        {/* Search Results Dropdown */}
        {showResults && (
          <SearchResults sections={searchSections} activeSearch={searchValue} />
        )}
      </div>

      {/* Knowledge Object Search Results Dialog */}
      <SearchLessonResultsDialog
        open={koSearchDialogOpen}
        onOpenChange={setKoSearchDialogOpen}
        searchPhrase={selectedSearchPhrase}
      />
    </div>
  )
}
