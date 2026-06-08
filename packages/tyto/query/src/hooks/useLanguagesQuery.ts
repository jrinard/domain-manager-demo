import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, Languages } from '@tyto/client'

type EndpointArgs = Parameters<typeof Languages.prototype.get>[0]

export interface UseLanguagesQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof Languages.prototype.get>>

type UseUseLanguagesQueryQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useLanguagesQuery = ({
  disabled,
  ...args
}: UseLanguagesQueryProps): UseUseLanguagesQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.Languages.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.Languages.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useLanguagesQuery
