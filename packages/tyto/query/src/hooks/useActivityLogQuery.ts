import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, PersonActivityLog } from '@tyto/client'

export interface UseActivityLogQueryProps {
  personID: number
  disabled?: boolean
}

export const useActivityLogQuery = ({
  personID,
  disabled = false,
}: UseActivityLogQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof PersonActivityLog.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof PersonActivityLog.prototype.get>[0] = {
    personID,
  }

  return useQuery<
    Awaited<ReturnType<typeof PersonActivityLog.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.PersonActivityLog.endpoint, params],
    enabled: !disabled,
    queryFn: () => tytoClient.PersonActivityLog.get({ ...params }),
  })
}

export default useActivityLogQuery
