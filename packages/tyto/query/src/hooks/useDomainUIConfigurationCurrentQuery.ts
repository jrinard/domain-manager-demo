import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, DomainUIConfigurationCurrent } from '@tyto/client'

type EndpointArgs = Parameters<
  typeof DomainUIConfigurationCurrent.prototype.get
>[0]

export interface UseDomainUIConfigurationCurrentQueryProps
  extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof DomainUIConfigurationCurrent.prototype.get>
>

type UseUseDomainUIConfigurationCurrentQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useDomainUIConfigurationCurrentQuery = ({
  disabled,
  ...args
}: UseDomainUIConfigurationCurrentQueryProps): UseUseDomainUIConfigurationCurrentQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [
    tytoClient.DomainUIConfigurationCurrent.endpoint,
    params,
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.DomainUIConfigurationCurrent.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useDomainUIConfigurationCurrentQuery
