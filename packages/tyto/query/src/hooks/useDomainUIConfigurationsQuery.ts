import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, DomainUIConfigurations } from '@tyto/client'

type EndpointArgs = Parameters<typeof DomainUIConfigurations.prototype.get>[0]

export interface UseDomainUIConfigurationsQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof DomainUIConfigurations.prototype.get>
>

type UseUseDomainUIConfigurationsQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useDomainUIConfigurationsQuery = ({
  disabled,
  ...args
}: UseDomainUIConfigurationsQueryProps): UseUseDomainUIConfigurationsQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [
    tytoClient.DomainUIConfigurations.endpoint,
    params,
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.DomainUIConfigurations.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useDomainUIConfigurationsQuery
