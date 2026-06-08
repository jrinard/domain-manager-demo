import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, EnrollmentCurriculumCompleteJobs } from '@tyto/client'

export interface UseEnrollmentCurriculumCompleteJobsQueryProps {
  createdByID: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof EnrollmentCurriculumCompleteJobs.prototype.get>
>

type UseUseEnrollmentCurriculumCompleteJobsQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useEnrollmentCurriculumCompleteJobsQuery = ({
  createdByID,
  disabled,
}: UseEnrollmentCurriculumCompleteJobsQueryProps): UseUseEnrollmentCurriculumCompleteJobsQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params = {
    createdByID,
  }

  const queryKey: QueryKey = [
    tytoClient.EnrollmentCurriculumCompleteJobs.endpoint,
    params,
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () =>
        tytoClient.EnrollmentCurriculumCompleteJobs.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useEnrollmentCurriculumCompleteJobsQuery
