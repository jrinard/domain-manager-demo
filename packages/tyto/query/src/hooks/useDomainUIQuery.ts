import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, DomainUI } from '@tyto/client'

type EndpointArgs = Parameters<typeof DomainUI.prototype.get>[0]

export type UseDomainUIQueryProps = EndpointArgs & {
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof DomainUI.prototype.get>>

type UseUseDomainUIQueryQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useDomainUIQuery = ({
  disabled,
  ...args
}: UseDomainUIQueryProps): UseUseDomainUIQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.DomainUI.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.DomainUI.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useDomainUIQuery
