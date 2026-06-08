import { useQuery, useQueryClient } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

export const useCachedDateTime = (
  storageKey = 'global'
): [DateTime, (value: DateTime) => void] => {
  const queryClient = useQueryClient()
  const queryKey = [`useCachedDateTime::${storageKey}`]
  const query = useQuery<DateTime>({
    queryKey: queryKey,
    queryFn: () => {
      return DateTime.now()
    },
  })
  const [value, setValueInternal] = useState<DateTime>(
    queryClient.getQueryData<DateTime>(queryKey) || DateTime.now()
  )
  useEffect(() => {
    setValueInternal(query.data || DateTime.now())
  }, [query.data])

  const setValue = (value: DateTime) => {
    queryClient.setQueryData(queryKey, value)
  }

  return [value, setValue]
}
