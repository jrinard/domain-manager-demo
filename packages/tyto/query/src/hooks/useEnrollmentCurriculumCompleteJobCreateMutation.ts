import { useMutation } from '@tanstack/react-query'
import { useTytoClient, EnrollmentCurriculumCompleteJob } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<
        ReturnType<typeof EnrollmentCurriculumCompleteJob.prototype.post>
      >,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useEnrollmentCurriculumCompleteJobCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [
      tytoClient.EnrollmentCurriculumCompleteJob.endpoint,
      cacheKey,
    ],
    mutationFn: async (
      props: Parameters<
        typeof EnrollmentCurriculumCompleteJob.prototype.post
      >[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.EnrollmentCurriculumCompleteJob.post(props)
    },
    onSettled(data, error) {
      if (
        !error &&
        data &&
        ['initialized', ''].includes(get(data, 'error.msg'))
      ) {
        onSuccess(omit(data, 'error', 'links', 'session') || null)
      } else if (error) {
        onError?.(error)
      } else {
        onError?.(get(data, 'error.msg'))
      }
    },
  })
}

export { useEnrollmentCurriculumCompleteJobCreateMutation }
export default useEnrollmentCurriculumCompleteJobCreateMutation
