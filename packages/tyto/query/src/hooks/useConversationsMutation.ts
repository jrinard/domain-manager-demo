import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TytoResponseNonGet, useTytoClient } from '@tyto/client'
import { useConversationsQueryKeyFactory } from './useConversationsQuery'

interface MutatorProps {
  noticeIDs: number[]
  isCritical?: boolean
  isNew?: boolean
  status?: 'ocDISABLED' | 'ocENABLED' | 'ocARCHIVE'
}
interface UseMutationProps {
  onSuccess?: (responseData: TytoResponseNonGet[]) => void
  onError?: (error: unknown) => void
}

function useConversationsMutation({ onSuccess, onError }: UseMutationProps) {
  const tytoClient = useTytoClient()
  const queryClient = useQueryClient()
  const queryKey = useConversationsQueryKeyFactory()
  return useMutation({
    mutationFn: async ({
      noticeIDs,
      status,
      isCritical,
      isNew,
    }: MutatorProps): Promise<TytoResponseNonGet[]> => {
      const calls: Promise<TytoResponseNonGet>[] = []
      noticeIDs.forEach((noticeID) => {
        if (isCritical !== undefined) {
          calls.push(
            tytoClient.Inbox.ConversationItem.Star.put({
              noticeID,
              isCritical,
            }),
          )
        }

        if (isNew !== undefined) {
          calls.push(
            tytoClient.Inbox.ConversationItem.ReadStatus.put({
              noticeID,
              noticeIDs: [noticeID],
              isNew,
            }),
          )
        }

        if (status !== undefined) {
          calls.push(
            tytoClient.Inbox.ConversationItem.delete({
              noticeID,
              activeStatus: status,
            }),
          )
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await Promise.all<Promise<TytoResponseNonGet>>(calls)
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        void queryClient.invalidateQueries({
          queryKey: queryKey,
        })
        onSuccess && onSuccess(data)
      } else if (error) {
        onError?.(error)
      }
    },
  })
}

export { useConversationsMutation }
export default useConversationsMutation
