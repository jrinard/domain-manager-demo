import { useEffect, useState } from 'react'
import { SetExtended } from './SetExtended'

import { useQueryClient, useQuery } from '@tanstack/react-query'

export function useCachedSetExtended<
  SetItemsType extends string | number | boolean | symbol | object
>(
  storageKey: string
): [SetExtended<SetItemsType>, (value: SetExtended<SetItemsType>) => void] {
  const queryClient = useQueryClient()
  const queryKey = [`useCachedSetExtended::${storageKey}`]
  const [value, setValueInternal] = useState<SetExtended<SetItemsType>>(
    queryClient.getQueryData<SetExtended<SetItemsType>>(queryKey) ||
      new SetExtended<SetItemsType>([])
  )
  const setValue = (value: SetExtended<SetItemsType>) => {
    const newSet = new SetExtended<SetItemsType>(value.toArray())
    newSet.onChange = syncOnChange
    queryClient.setQueryData(queryKey, newSet)
  }
  const syncOnChange = (set: SetExtended<SetItemsType>) => {
    setValue(set)
  }

  if (!value.onChange) {
    value.onChange = syncOnChange
  }
  const query = useQuery<SetExtended<SetItemsType>>({
    queryKey: queryKey,
    queryFn: () => {
      const value = new SetExtended<SetItemsType>([])
      value.onChange = syncOnChange
      return value
    },
  })
  useEffect(() => {
    if (query.data) {
      setValueInternal(query.data)
    }
  }, [query.data])

  return [value, setValue]
}

export default useCachedSetExtended
