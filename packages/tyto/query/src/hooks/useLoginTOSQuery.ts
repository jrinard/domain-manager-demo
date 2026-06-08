import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, LoginTOS } from '@tyto/client'

export interface UseLoginTOSQueryProps {
  domainID?: number
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof LoginTOS.prototype.get>>

type UseUseLoginTOSQueryQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useLoginTOSQuery = ({
  domainID = 0,
  disabled,
}: UseLoginTOSQueryProps): UseUseLoginTOSQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.LoginTOS.endpoint, { domainID }]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled && !!domainID,
      queryKey,
      queryFn: () => tytoClient.LoginTOS.get({ domainID }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useLoginTOSQuery
