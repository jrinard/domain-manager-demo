import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, RobotAccounts } from '@tyto/client'

type EndpointArgs = Parameters<typeof RobotAccounts.prototype.get>[0]

export interface UseRobotAccountsQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof RobotAccounts.prototype.get>>

type UseUseRobotAccountsQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useRobotAccountsQuery = ({
  disabled,
  ...args
}: UseRobotAccountsQueryProps): UseUseRobotAccountsQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.RobotAccounts.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.RobotAccounts.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useRobotAccountsQuery
