import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, PersonAbsence } from '@tyto/client'

export interface UsePersonAbsenceReadQueryProps {
  personID: number // <-- REPLACE / EXAMPLE
}

export const usePersonAbsenceReadQuery = ({
  personID,
}: UsePersonAbsenceReadQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof PersonAbsence.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof PersonAbsence.prototype.get>[0] = {
    personID,
  }

  return useQuery<
    Awaited<ReturnType<typeof PersonAbsence.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.PersonAbsence.endpoint, params],
    queryFn: () => tytoClient.PersonAbsence.get({ ...params }),
  })
}

export default usePersonAbsenceReadQuery
