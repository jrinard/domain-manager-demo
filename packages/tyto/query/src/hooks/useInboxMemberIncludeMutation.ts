import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export type InboxMemberIncludeMutationProps =
  | (Endpoints.Tyto.Inbox.Member.Post.Parameters & { included: boolean })
  | (Endpoints.Tyto.Inbox.Member.Delete.Parameters & { included: boolean })

interface Props {
  onSuccess: (
    responseData:
      | Endpoints.Tyto.Inbox.Member.Post.Response
      | Endpoints.Tyto.Inbox.Member.Delete.Response,
    args: InboxMemberIncludeMutationProps
  ) => void
  onError: (error: unknown) => void
}

export const useInboxMemberIncludeMutation = ({
  onSuccess,
  onError,
}: Props) => {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async ({
      included,
      ...args
    }: InboxMemberIncludeMutationProps) => {
      if (included) {
        return await tytoClient.Inbox.Member.post(args)
      } else {
        return await tytoClient.Inbox.Member.delete(args)
      }
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
export default useInboxMemberIncludeMutation
