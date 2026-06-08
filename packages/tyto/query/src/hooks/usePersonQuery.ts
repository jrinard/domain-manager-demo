import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Person, useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

interface UsePersonQueryProps {
  params: Endpoints.Tyto.Person.Get.Parameters
  enabled?: boolean
}
export const usePersonQuery = ({
  params,
  enabled,
}: UsePersonQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof Person.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()
  return useQuery<Awaited<ReturnType<typeof Person.prototype.get>>, Error>({
    queryKey: [tytoClient.Person.endpoint, params],
    queryFn: () => tytoClient.Person.get({ ...params }),
    enabled,
  })
}

export default usePersonQuery
