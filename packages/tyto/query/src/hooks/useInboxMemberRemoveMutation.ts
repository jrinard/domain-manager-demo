import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

interface Props {
  onSuccess: (
    responseData: Endpoints.Tyto.Inbox.Member.Delete.Response,
    args: Endpoints.Tyto.Inbox.Member.Delete.Parameters
  ) => void
  onError: (error: unknown) => void
}
export const useInboxMemberRemoveMutation = ({ onSuccess, onError }: Props) => {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async (args: Endpoints.Tyto.Inbox.Member.Delete.Parameters) => {
      return await tytoClient.Inbox.Member.delete(args)
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data, variables)
      }
      if (error) {
        onError(error)
      }
    },
  })
}
export default useInboxMemberRemoveMutation
