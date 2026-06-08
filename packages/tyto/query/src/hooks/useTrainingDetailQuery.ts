import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, TrainingDetail } from '@tyto/client'

type EndpointArgs = Parameters<typeof TrainingDetail.prototype.get>[0]

export interface UseTrainingDetailQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof TrainingDetail.prototype.get>>

type UseUseTrainingDetailQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useTrainingDetailQuery = ({
  disabled,
  ...args
}: UseTrainingDetailQueryProps): UseUseTrainingDetailQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.TrainingDetail.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.TrainingDetail.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useTrainingDetailQuery
