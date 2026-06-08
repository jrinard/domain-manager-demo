import { useState } from 'react'

/**
 * Hook for avoiding Boilerplate when "deffered searching/filtering" is needed
 * such as serachTerm for input that updates searchTerm for network request on event
 * @param initialSearchTerm - The initial value of `searchTermForInput` and `searchTermForFiltering`
 * @returns
 */
export function useDeferredSearchTerm({
  initialSearchTerm = '',
}: {
  initialSearchTerm?: string
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [deferredSearchTerm, setDeferredSearchTerm] =
    useState(initialSearchTerm)

  return {
    searchTermForInput: searchTerm,
    searchTermForFiltering: deferredSearchTerm,
    setSearchTerm,
    mergeSearchTerm: (overrideSearchTerm?: string) => {
      if (typeof overrideSearchTerm === 'string') {
        setSearchTerm(overrideSearchTerm)
        setDeferredSearchTerm(overrideSearchTerm)
      } else {
        setDeferredSearchTerm(searchTerm)
      }
    },
    clearSearchTerm: () => {
      setSearchTerm('')
      setDeferredSearchTerm('')
    },
  }
}

export default useDeferredSearchTerm
