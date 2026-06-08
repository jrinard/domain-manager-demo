import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export const useDISCProfilesQuery = (
  args: Endpoints.Tyto.DISCProfilesMini.Get.Parameters,
  options?: Pick<UseQueryOptions, 'enabled'>,
): UseQueryResult<Endpoints.Tyto.DISCProfilesMini.Get.Response, Error> => {
  const tytoClient = useTytoClient()

  const safeArgs: Endpoints.Tyto.DISCProfilesMini.Get.Parameters = {
    ...args,
    personIDs: Array.isArray(args.personIDs)
      ? args?.personIDs.join(',')
      : args?.personIDs,
  }

  return useQuery<Endpoints.Tyto.DISCProfilesMini.Get.Response, Error>({
    enabled: typeof options?.enabled === 'boolean' ? options.enabled : true,
    queryKey: [tytoClient.DiscProfiles.Mini.endpoint, safeArgs],
    queryFn: () => tytoClient.DiscProfiles.Mini.get(safeArgs),
  })
}

export default useDISCProfilesQuery
