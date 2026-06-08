import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export interface CreateNoticeCommentMutationProps
  extends Omit<Endpoints.Tyto.Inbox.Comment.Post.Parameters, 'commentText'> {
  body: string
}

/**
 * For adding / creating a comment to a Conversation
 * @param onSuccess - Callback to run on success. This is for hooking into success to update cache and/or invalidate queries
 * @returns `useMutation` hook
 */
const useCreateInboxCommentMutation = ({
  onSuccess,
}: {
  onSuccess: (
    responseData: Endpoints.Tyto.Inbox.Comment.Post.Response,
    args: CreateNoticeCommentMutationProps
  ) => void
}) => {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async (props: CreateNoticeCommentMutationProps) => {
      const resp = await tytoClient.Inbox.Comment.post({
        noticeID: props.noticeID,
        commentText: props.body,
        isDraft: !!props.isDraft,
        aboutIDs: props.aboutIDs,
        aboutTypes: props.aboutTypes,
      })

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return resp
    },
    onSettled(data, error, variables) {
      if (!data?.noticeCommentID) {
        throw new Error('No identifier found for new Comment')
      }
      if (!error) {
        onSuccess(data, variables)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}
export { useCreateInboxCommentMutation }
export default useCreateInboxCommentMutation
