import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export const useInboxCommentDeleteMutation = ({
  onSuccess,
}: {
  onSuccess: (
    responseData: Endpoints.Tyto.Inbox.Comment.Delete.Response,
    args: Endpoints.Tyto.Inbox.Comment.Delete.Parameters
  ) => void
}) => {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async (
      args: Endpoints.Tyto.Inbox.Comment.Delete.Parameters
    ) => {
      return await tytoClient.Inbox.Comment.delete(args)
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data, variables)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}
export default useInboxCommentDeleteMutation
