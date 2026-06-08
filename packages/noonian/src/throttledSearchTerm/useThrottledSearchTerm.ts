import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

const DEFAULT_DELAY_MS = 120

/**
 * Hook for avoiding Boilerplate when "live searching/filtering" is needed
 * @param delayMS - The time (in `MS`) between change and updating `searchTermForFiltering`
 * @param leading - Whether to trigger the `searchTermForFiltering` update on the leading edge of the `delayMS` interval
 * @param trailing - Whether to trigger the `searchTermForFiltering` update on the trailing edge of the `delayMS` interval
 * @param initialSearchTerm - The initial value of `searchTermForInput` and `searchTermForFiltering`
 * @returns
 */
export function useThrottledSearchTerm({
  delayMS = DEFAULT_DELAY_MS,
  leading = false,
  trailing = true,
  initialSearchTerm = '',
}: {
  delayMS?: number
  initialSearchTerm?: string
  leading?: boolean
  trailing?: boolean
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [delayedSearchTerm, setDelayedSearchTerm] = useState(initialSearchTerm)

  const throttledUpdate = useCallback(
    debounce(
      (newSearchTerm: string) => {
        setDelayedSearchTerm(() => newSearchTerm)
      },
      delayMS,
      { leading, trailing },
    ),
    [],
  )

  useEffect(() => {
    throttledUpdate(searchTerm)

    // Cleanup: cancel any pending debounced calls when component unmounts
    return () => {
      throttledUpdate.cancel()
    }
  }, [searchTerm, throttledUpdate])

  return {
    searchTermForInput: searchTerm,
    searchTermForFiltering: delayedSearchTerm,
    setSearchTerm,
  }
}

export default useThrottledSearchTerm
