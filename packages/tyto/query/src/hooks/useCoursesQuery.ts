import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, Courses } from '@tyto/client'

interface CoursesQueryParams {
  activeStatus?: string
  teamPath?: string
}

export const useCoursesQuery = (
  params: CoursesQueryParams = {},
): UseQueryResult<Awaited<ReturnType<typeof Courses.prototype.get>>, Error> => {
  const tytoClient = useTytoClient()

  const queryParams: CoursesQueryParams = {
    activeStatus: 'ocENABLED',
    ...params,
  }

  return useQuery<Awaited<ReturnType<typeof Courses.prototype.get>>, Error>({
    queryKey: [tytoClient.Courses.endpoint, queryParams],
    queryFn: () => tytoClient.Courses.get(queryParams),
  })
}

export default useCoursesQuery
