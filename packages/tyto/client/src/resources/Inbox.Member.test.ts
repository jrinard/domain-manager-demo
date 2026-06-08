import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { PathParams, rest } from 'msw'

import { InboxMember } from './Inbox.Member'
import type { Endpoints } from '../typings'
import { createTytoResponseBase } from '../../tests/TDM'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(
  ...[
    rest.post<
      Endpoints.Tyto.Inbox.Member.Post.Parameters,
      PathParams,
      Endpoints.Tyto.Inbox.Member.Post.Response
    >(`https://localhost:8080/api${InboxMember.endpoint}`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json<Endpoints.Tyto.Inbox.Member.Post.Response>({
          ...createTytoResponseBase(),
          recordsAffected: 1,
          noticeID: 0,
        })
      )
    }),
  ]
)

describe('Resource InboxMember', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  describe('post()', () => {
    it('returns recordsAffected', async () => {
      const axiosInstance = axios.create({
        baseURL: 'https://localhost:8080/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new InboxMember(axiosInstance)

      const result = await resource.post({
        noticeID: 1,
        memberID: 1,
      })
      expect(result).toHaveProperty('recordsAffected', 1)
    })
  })
})
