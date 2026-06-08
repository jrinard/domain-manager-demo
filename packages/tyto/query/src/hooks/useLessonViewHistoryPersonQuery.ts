import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, LessonViewHistoryPerson } from '@tyto/client'

type EndpointArgs = Parameters<typeof LessonViewHistoryPerson.prototype.get>[0]

export interface UseLessonViewHistoryPersonQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof LessonViewHistoryPerson.prototype.get>
>

type UseUseLessonViewHistoryPersonQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useLessonViewHistoryPersonQuery = ({
  disabled,
  ...args
}: UseLessonViewHistoryPersonQueryProps): UseUseLessonViewHistoryPersonQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [
    tytoClient.LessonViewHistoryPerson.endpoint,
    params,
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.LessonViewHistoryPerson.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useLessonViewHistoryPersonQuery
