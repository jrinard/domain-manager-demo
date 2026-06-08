import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'
import type { AxiosProgressEvent } from 'axios'

type SaveForLessonArgs = Endpoints.Tyto.SaveForLesson.Post.Parameters

function useSaveForLessonMutation<TypeOverrides>({
  uploadKey,
  onUploadProgress,
  onSuccess,
  onError,
}: {
  uploadKey?: string
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onSuccess: (
    responseData: Endpoints.Tyto.SaveForLesson.Post.Response | null,
    args: SaveForLessonArgs
  ) => void
  onError?: (error: unknown) => void
}) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Upload.endpoint, uploadKey],
    mutationFn: async (args: SaveForLessonArgs & TypeOverrides) => {
      return await tytoClient.SaveForLesson.post(
        {
          ...args,
        },
        {
          axiosConfig: {
            onUploadProgress: (progressEvent) => {
              onUploadProgress?.(progressEvent)
            },
          },
        }
      )
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data || null, variables)
      } else if (error) {
        onError?.(error)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}

export { useSaveForLessonMutation }
export default useSaveForLessonMutation
