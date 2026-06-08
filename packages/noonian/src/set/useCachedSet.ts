import { useEffect } from 'react'

import { useSet } from './useSet'
import { useQueryClient, useQuery } from '@tanstack/react-query'

export function useCachedSet<SetItemsType>({
  storageKey,
}: {
  storageKey: string
}) {
  const queryClient = useQueryClient()
  const setQuery = useQuery<Set<SetItemsType> | undefined>({
    queryKey: makeKey(storageKey),
    queryFn: () => {
      return new Set<SetItemsType>()
    },
  })

  const set = useSet<SetItemsType>({
    initialList: () => {
      const cacheVal = queryClient.getQueryData<Set<SetItemsType> | undefined>(
        makeKey(storageKey)
      )

      if (!cacheVal || !(cacheVal instanceof Set)) {
        return new Set<SetItemsType>()
      }

      return cacheVal
    },
    onChange: (newSet) => {
      queryClient.setQueryData(makeKey(storageKey), newSet)
    },
  })

  // * Purely for ensuring the return type is that of `useSet`, never `undefined`,
  // * and syncs accross instances of this Hook with the same `storageKey`
  useEffect(() => {
    if (!setQuery.data) return

    set.replaceAll(setQuery.data, true)
  }, [setQuery.data])

  return set
}

function makeKey<T extends string>(storageKey: T): [`useCachedSet::${T}`] {
  return [`useCachedSet::${storageKey}`]
}

export default useCachedSet
