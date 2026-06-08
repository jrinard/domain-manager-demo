import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PeopleBrowse } from '@tyto/client'

type EndpointArgs = Parameters<typeof PeopleBrowse.prototype.get>[0]

export interface UsePeopleBrowseQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof PeopleBrowse.prototype.get>>

type UseUsePeopleBrowseQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const usePeopleBrowseQuery = ({
  disabled,
  ...args
}: UsePeopleBrowseQueryProps): UseUsePeopleBrowseQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.PeopleBrowse.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.PeopleBrowse.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default usePeopleBrowseQuery
