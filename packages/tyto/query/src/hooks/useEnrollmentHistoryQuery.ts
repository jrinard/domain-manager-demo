import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useTytoClient, EnrollmentHistory } from '@tyto/client'

export interface UseEnrollmentHistoryQueryProps {
  memberID: number
  curriculumID: number
}

type UseEnrollmentHistoryQueryOptions = Omit<
  UseQueryOptions<
    Awaited<ReturnType<typeof EnrollmentHistory.prototype.get>>,
    Error
  >,
  'queryKey' | 'queryFn'
>

export const useEnrollmentHistoryQuery = (
  { memberID, curriculumID }: UseEnrollmentHistoryQueryProps,
  options?: UseEnrollmentHistoryQueryOptions,
): UseQueryResult<
  Awaited<ReturnType<typeof EnrollmentHistory.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof EnrollmentHistory.prototype.get>[0] = {
    memberID,
    curriculumID,
  }

  return useQuery<
    Awaited<ReturnType<typeof EnrollmentHistory.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.EnrollmentHistory.endpoint, params],
    queryFn: () => tytoClient.EnrollmentHistory.get({ ...params }),
    ...options,
  })
}

export default useEnrollmentHistoryQuery
