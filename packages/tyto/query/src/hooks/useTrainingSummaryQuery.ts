import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, TrainingSummary } from '@tyto/client'

type EndpointArgs = Parameters<typeof TrainingSummary.prototype.get>[0]

export interface UseTrainingSummaryQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof TrainingSummary.prototype.get>>

type UseUseTrainingSummaryQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useTrainingSummaryQuery = ({
  disabled,
  ...args
}: UseTrainingSummaryQueryProps): UseUseTrainingSummaryQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.TrainingSummary.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: async () => {
        const resp = await tytoClient.TrainingSummary.get({ ...params })
        return resp
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

export default useTrainingSummaryQuery
