import { useMutation } from '@tanstack/react-query'
import { TytoResponseNonGet } from '@tyto/client'
import useConversationsMutation from './useConversationsMutation'

export interface ConversationItemMutationArgs {
  noticeID: number
  isCritical?: boolean
  isNew?: boolean
  status?: 'ocDISABLED' | 'ocENABLED' | 'ocARCHIVE'
}

/**
 * For updating Meta Information about a Conversation
 * @param onSuccess - Callback to run on success. This is for hooking into success to update cache and/or invalidate queries
 * @returns `useMutation` hook
 */
const useConversationItemMutation = ({
  onSuccess,
}: {
  onSuccess: (
    data: TytoResponseNonGet | undefined,
    props: ConversationItemMutationArgs
  ) => void
}) => {
  const conversationsMutation = useConversationsMutation({})
  return useMutation({
    mutationFn: async ({
      isCritical,
      isNew,
      status,
      noticeID,
    }: ConversationItemMutationArgs) => {
      const result = await conversationsMutation.mutateAsync({
        noticeIDs: [noticeID],
        isNew,
        isCritical,
        status,
      })
      return result[0]
    },
    onSettled(data, error, variables) {
      if (!error) {
        onSuccess(data, variables)
        return
      }
      throw error
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}

export { useConversationItemMutation }
export default useConversationItemMutation
