import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, LibraryLegacy } from '@tyto/client'

type EndpointArgs = Parameters<typeof LibraryLegacy.prototype.get>[0]

export interface UseLibraryLegacyQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof LibraryLegacy.prototype.get>>

type UseUseLibraryLegacyQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useLibraryLegacyQuery = ({
  disabled,
  ...args
}: UseLibraryLegacyQueryProps): UseUseLibraryLegacyQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.LibraryLegacy.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.LibraryLegacy.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useLibraryLegacyQuery
