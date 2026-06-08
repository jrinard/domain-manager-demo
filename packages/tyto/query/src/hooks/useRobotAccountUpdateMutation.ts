import { useMutation } from '@tanstack/react-query'
import { useTytoClient, RobotAccount } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof RobotAccount.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useRobotAccountUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.RobotAccount.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof RobotAccount.prototype.put>[0] & TypeOverrides,
    ) => {
      return await tytoClient.RobotAccount.put(props)
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

export { useRobotAccountUpdateMutation }
export default useRobotAccountUpdateMutation
