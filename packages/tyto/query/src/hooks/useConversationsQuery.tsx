import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

interface QueryParams {
  params?: Endpoints.Tyto.Inbox.Get.Parameters
  enabled?: boolean
}

export type UseConversationQueryResult = UseQueryResult<
  Endpoints.Tyto.Inbox.Get.Response,
  Error
>

export const useConversationsQueryKeyFactory = (
  params?: Endpoints.Tyto.Inbox.Get.Parameters,
) => {
  const tytoClient = useTytoClient()
  return [tytoClient.Inbox.Conversations.endpoint, params]
}

export const useConversationsQuery = (
  params?: QueryParams,
): UseConversationQueryResult => {
  const tytoClient = useTytoClient()

  const safeArgs: Endpoints.Tyto.Inbox.Get.Parameters = {
    excludeCategorized:
      params?.params && params?.params.activeStatus === 'ocENABLED', // All Cataloged should use useConversationsByCategoryID
    top: 10_000,
    activeStatus: 'ocENABLED',
    ...(params?.params || {}),
  }

  if (!safeArgs.findText) {
    delete safeArgs.findText
  } else {
    delete safeArgs.excludeCategorized
    safeArgs.findText = `%${safeArgs.findText.replace(/\s+/g, '%20')}%`
    safeArgs.top = 100
  }

  return useQuery<Endpoints.Tyto.Inbox.Get.Response, Error>({
    queryKey: useConversationsQueryKeyFactory(safeArgs),
    queryFn: () => tytoClient.Inbox.Conversations.get({ ...safeArgs }),
    enabled: params?.enabled === undefined ? true : params.enabled,
    gcTime: 0,
  })
}

export default useConversationsQuery
