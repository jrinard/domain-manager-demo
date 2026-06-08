import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  useTytoClient,
  TrainingCatalogLessonCompletionSummarySB2165,
} from '@tyto/client'

type EndpointArgs = Parameters<
  typeof TrainingCatalogLessonCompletionSummarySB2165.prototype.get
>[0]

export interface UseTrainingCatalogLessonCompletionSummarySB2165QueryProps
  extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof TrainingCatalogLessonCompletionSummarySB2165.prototype.get>
>

type UseUseTrainingCatalogLessonCompletionSummarySB2165QueryQueryResult =
  UseQueryResult<ResponseProps, Error> & {
    queryKey: QueryKey
    invalidate: () => Promise<void>
  }

export const useTrainingCatalogLessonCompletionSummarySB2165Query = ({
  disabled,
  ...args
}: UseTrainingCatalogLessonCompletionSummarySB2165QueryProps): UseUseTrainingCatalogLessonCompletionSummarySB2165QueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [
    tytoClient.TrainingCatalogLessonCompletionSummarySB2165.endpoint,
    params,
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () =>
        tytoClient.TrainingCatalogLessonCompletionSummarySB2165.get({
          ...params,
        }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useTrainingCatalogLessonCompletionSummarySB2165Query
