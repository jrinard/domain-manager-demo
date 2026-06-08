import { useQuery } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Data } from '@spacedock/manifest'

import { SANE_REACT_QUERY_DEFAULTS } from '../constants'

export interface SingleConversationResponse {
  conversation: Data.ConversationNotice
  participants: Array<Data.Notice.Participant>
}

type GetCall = ReturnType<typeof useTytoClient>['Inbox']['Conversations']['get']
type Args = Parameters<GetCall>[0]

export const useSingleConversationQuery = (
  args: {
    conversationID: number
  } & Partial<Omit<Args, 'noticeID'>>,
) => {
  const tytoClient = useTytoClient()

  return useQuery<SingleConversationResponse, Error>({
    ...SANE_REACT_QUERY_DEFAULTS,
    gcTime: 0,
    queryKey: [tytoClient.Inbox.Conversations.endpoint, args],
    queryFn: async () => {
      const resp = await tytoClient.Inbox.Conversations.get({
        ...args,
        noticeID: args.conversationID,
      })

      return {
        conversation: resp.notices[0],
        participants: resp.participants,
      } as SingleConversationResponse
    },
  })
}
