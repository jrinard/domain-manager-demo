import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PrerequisiteEnrollments } from '@tyto/client'

type RequestProps = Parameters<typeof PrerequisiteEnrollments.prototype.get>[0]
type ResponseProps = Awaited<
  ReturnType<typeof PrerequisiteEnrollments.prototype.get>
>

export interface UsePrerequisiteEnrollmentsQueryProps extends RequestProps {
  disabled?: boolean
}

type UseUsePrerequisiteEnrollmentsQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const usePrerequisiteEnrollmentsQuery = ({
  disabled,
  ...props
}: UsePrerequisiteEnrollmentsQueryProps): UseUsePrerequisiteEnrollmentsQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.PrerequisiteEnrollments.endpoint,
    { ...props },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.PrerequisiteEnrollments.get({ ...props }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default usePrerequisiteEnrollmentsQuery
