import { usePersonQuery } from '@tyto/query'
import { useParamNumber } from '@spacedock/use-param-number'

export function usePersonFromURL() {
  const personID = useParamNumber('personID')
  const person = usePersonQuery({ params: { personID } })

  return {
    data: person.data,
    isLoading: person.isLoading,
    error: person.error,
    refetch: person.refetch,
  }
}

export default usePersonFromURL
