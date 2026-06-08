import { useState, useCallback } from 'react'
import { useThrottledSearchTerm } from '@spacedock/noonian'

export interface UseSearchInputReturn {
  searchValue: string
  inputValue: string
  hasFocus: boolean
  setSearchValue: (value: string) => void
  setHasFocus: (focus: boolean) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
  handleBlur: () => void
  clearSearch: () => void
}

/**
 * Hook to manage search input state and handlers
 * Uses throttled search term to avoid network requests on every keystroke
 */
export function useSearchInput(initialValue = ''): UseSearchInputReturn {
  const { searchTermForInput, searchTermForFiltering, setSearchTerm } =
    useThrottledSearchTerm({
      initialSearchTerm: initialValue,
      delayMS: 800, // Increased delay to reduce API calls - waits 800ms after user stops typing
    })

  const [hasFocus, setHasFocus] = useState(false)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    [setSearchTerm],
  )

  const handleFocus = useCallback(() => {
    setHasFocus(true)
  }, [])

  const handleBlur = useCallback(() => {
    // Delay to allow click events on results to fire
    setTimeout(() => {
      setHasFocus(false)
    }, 200)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setHasFocus(false)
  }, [setSearchTerm])

  return {
    searchValue: searchTermForFiltering,
    inputValue: searchTermForInput,
    hasFocus,
    setSearchValue: setSearchTerm,
    setHasFocus,
    handleInputChange,
    handleFocus,
    handleBlur,
    clearSearch,
  }
}
