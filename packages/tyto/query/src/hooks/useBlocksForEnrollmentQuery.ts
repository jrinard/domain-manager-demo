import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, Courses, getCall } from '@tyto/client'

interface BlocksForEnrollmentQueryParams {
  name?: string
  activeStatus?: string
  teamPath?: string
  internalTitle?: string
}

export const useBlocksForEnrollmentQuery = (
  params: BlocksForEnrollmentQueryParams = {},
): UseQueryResult<
  Awaited<ReturnType<typeof Courses.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const queryParams: BlocksForEnrollmentQueryParams = {
    activeStatus: 'ocENABLED',
    ...params,
  }

  return useQuery<
    Awaited<ReturnType<typeof Courses.prototype.get>>,
    Error
  >({
    queryKey: ['Blocks/ForEnrollment', queryParams],
    queryFn: async () => {
      return getCall<
        Awaited<ReturnType<typeof Courses.prototype.get>>
      >(
        tytoClient.unsafeAxiosInstance,
        'Blocks/ForEnrollment',
        queryParams,
      )
    },
    enabled: !!(
      queryParams.name ||
      queryParams.teamPath
    ),
    gcTime: 0,
  })
}

export default useBlocksForEnrollmentQuery
