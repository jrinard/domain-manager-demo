import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Tasks } from '@tyto/client'
import { omit, get, isArray } from 'lodash'

type PutResponse = Awaited<ReturnType<typeof Tasks.prototype.put>>
interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<PutResponse, 'session' | 'links' | 'error'> | null,
  ) => void
  onError?: (error: unknown) => void
}
/**
 * Endpoint is Called `api/Tasks` even though it is for updating a Single Task... 🤷‍♂️
 */
function useTasksUpdateMutation({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Tasks.endpoint, cacheKey],
    mutationFn: async (
      props:
        | Parameters<typeof Tasks.prototype.put>[0]
        | Parameters<typeof Tasks.prototype.put>[0][],
    ) => {
      if (!isArray(props)) {
        return await tytoClient.Tasks.put(props)
      }
      const calls: Promise<PutResponse>[] = []
      props.forEach((props) => {
        calls.push(tytoClient.Tasks.put(props))
      })
      return await Promise.allSettled<Promise<PutResponse>>(calls)
    },
    onSettled(data, error) {
      if (!isArray(data)) {
        if (
          !error &&
          data &&
          ['initialized', 'cmdPersistTask'].includes(get(data, 'error.msg'))
        ) {
          onSuccess(omit(data, 'error', 'links', 'session') || null)
        } else if (error) {
          onError?.(error)
        } else {
          onError?.(get(data, 'error.msg'))
        }
      } else {
        data.forEach((item: PromiseSettledResult<PutResponse>, index) => {
          if (
            !error &&
            item &&
            ['initialized', 'cmdPersistTask'].includes(
              get(item, 'value.error.msg', ''),
            )
          ) {
            // success
          } else if (error) {
            onError?.(error)
          } else {
            onError?.(get(item, 'error.msg'))
          }
        })
        onSuccess(null)
      }
    },
  })
}

export { useTasksUpdateMutation }
export default useTasksUpdateMutation
