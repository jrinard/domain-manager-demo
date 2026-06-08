import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export interface CreateConversationMutationArgs {
  attachmentLessonID?: number
  attachmentLessonType?: Endpoints.Tyto.Inbox.Post.Parameters['aboutTypes']
  body: string
  isDraft?: boolean
  recipientsUserIDs: number[]
  subject: string
}

/**
 * For updating Meta Information about a Conversation
 * @param onSucess - Callback to run on success. This is for hooking into success to update cache and/or invalidate queries
 * @returns `useMutation` hook
 */
const useCreateConversationMutation = ({
  onSuccess,
}: {
  onSuccess: (
    responseData: Endpoints.Tyto.Inbox.Member.Post.Response,
    args: CreateConversationMutationArgs
  ) => void
}) => {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async (args: CreateConversationMutationArgs) => {
      const formattedArgs: Endpoints.Tyto.Inbox.Post.Parameters = {
        noticeSubject: args.subject,
        noticeText: args.body,
        aboutIDs: args.attachmentLessonID ? `${args.attachmentLessonID}` : '',
        aboutTypes: args.attachmentLessonType ? args.attachmentLessonType : '',
        toElementIDs: (args.recipientsUserIDs || []).join(','),
        isDraft: !!args.isDraft,
      }

      const resp = await tytoClient.Inbox.ConversationItem.post(formattedArgs)

      return resp
    },
    onSettled(data, error, variables) {
      if (!data?.noticeID) {
        throw new Error('No identifier found for new Conversation')
      }
      if (!error) {
        onSuccess(data, variables)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}
export { useCreateConversationMutation }
export default useCreateConversationMutation
