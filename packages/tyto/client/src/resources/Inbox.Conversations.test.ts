import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { PathParams, rest } from 'msw'

import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants/index'
import { InboxConversations } from './Inbox.Conversations'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(
  ...[
    rest.get<
      Endpoints.Tyto.Inbox.Get.Parameters,
      PathParams,
      Endpoints.Tyto.Inbox.Get.Response
    >(
      `https://localhost:8080/api${TYTO_ENDPOINT_PATHS.INBOX}`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json<Endpoints.Tyto.Inbox.Get.Response>({
            notices: [],
            participants: [],
            error: {
              msg: 'initialized',
              sts: 0
            },
            links: [],
          })
        )
      }
    ),
  ]
)

describe('Resource Inbox', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has an endpoint property', () => {
    const resource = new InboxConversations(axios.create())
    expect(resource.endpoint).toEqual(TYTO_ENDPOINT_PATHS.INBOX)
  })

  describe('get()', () => {
    it('returns notices and participants', async () => {
      const axiosInstance = axios.create({
        baseURL: 'https://localhost:8080/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new InboxConversations(axiosInstance)

      const result = await resource.get({})
      expect(result).toHaveProperty('notices', [])
      expect(result).toHaveProperty('participants', [])
    })
  })
})
