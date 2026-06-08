import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, Training } from '@tyto/client'

export interface UseTrainingQueryProps {
  memberID: number
}

export const useTrainingQuery = ({
  isEnabled = true,
  memberID,
}: UseTrainingQueryProps & { isEnabled?: boolean }): UseQueryResult<
  Awaited<ReturnType<typeof Training.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof Training.prototype.get>[0] = {
    memberID,
  }

  return useQuery<Awaited<ReturnType<typeof Training.prototype.get>>, Error>({
    enabled: isEnabled,
    queryKey: [tytoClient.Training.endpoint, params],
    queryFn: () => tytoClient.Training.get({ ...params }),
  })
}

export default useTrainingQuery
