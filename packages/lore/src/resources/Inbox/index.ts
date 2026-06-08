import {
  fixtureSingleConversationResponse,
  generateInboxGetMockRestHandlers,
  generateInboxGetResponse,
} from './Get'
import { fixtureInboxGetResponseEnabled } from './Get/fixtureEnabled'
import { fixtureInboxGetResponseArchive } from './Get/fixtureArchive'

export const LoreInboxResponses = {
  Get: {
    generate: generateInboxGetResponse,
    mockRestHandlers: { generate: generateInboxGetMockRestHandlers },
    fixtureEnabled: fixtureInboxGetResponseEnabled,
    fixtureArchive: fixtureInboxGetResponseArchive,
    byNoticeId: fixtureSingleConversationResponse,
  },
}
