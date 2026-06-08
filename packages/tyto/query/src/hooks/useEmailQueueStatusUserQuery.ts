import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, EmailQueueStatusUser } from '@tyto/client'

export interface UseEmailQueueStatusUserQueryProps {
  personID?: number
  top?: number
}

export const useEmailQueueStatusUserQuery = ({
  personID,
  top,
}: UseEmailQueueStatusUserQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof EmailQueueStatusUser.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof EmailQueueStatusUser.prototype.get>[0] = {
    personID,
    top,
  }

  return useQuery<
    Awaited<ReturnType<typeof EmailQueueStatusUser.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.EmailQueueStatusUser.endpoint, params],
    queryFn: () => tytoClient.EmailQueueStatusUser.get({ ...params }),
  })
}

export default useEmailQueueStatusUserQuery
