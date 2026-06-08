import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, DomainUIConfiguration } from '@tyto/client'

type EndpointArgs = Parameters<typeof DomainUIConfiguration.prototype.get>[0]

export interface UseDomainUIConfigurationQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof DomainUIConfiguration.prototype.get>
>

type UseUseDomainUIConfigurationQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useDomainUIConfigurationQuery = ({
  disabled,
  ...args
}: UseDomainUIConfigurationQueryProps): UseUseDomainUIConfigurationQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.DomainUIConfiguration.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: async () => {
        const response = await tytoClient.DomainUIConfiguration.get({
          ...params,
        })

        return response
      },
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useDomainUIConfigurationQuery
