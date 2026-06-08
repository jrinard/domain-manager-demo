import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, PeopleSearch } from '@tyto/client'

type GetArgs = Parameters<typeof PeopleSearch.prototype.get>[0]

export interface UsePeopleSearchQueryProps extends GetArgs {
  isEnabled?: boolean
}

export const usePeopleSearchQuery = ({
  isEnabled = true,
  ...args
}: UsePeopleSearchQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof PeopleSearch.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: GetArgs = {
    ...args,
  }

  return useQuery<
    Awaited<ReturnType<typeof PeopleSearch.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.PeopleSearch.endpoint, params],
    queryFn: () => tytoClient.PeopleSearch.get({ ...params }),
    enabled: isEnabled,
  })
}

export default usePeopleSearchQuery
