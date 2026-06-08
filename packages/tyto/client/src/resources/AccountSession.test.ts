import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { PathParams, rest } from 'msw'
import { TYTO_ENDPOINT_PATHS } from '../constants'

import { Endpoints } from '../typings'
import { AccountSession } from './AccountSession'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(
  ...[
    rest.post<Endpoints.Tyto.AccountSession.PostParameters, PathParams>(
      `https://localhost:8080/api${TYTO_ENDPOINT_PATHS.ACCOUNTSESSION}`,
      (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}))
      }
    ),
  ]
)

describe('Resource AccountSession', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has post() method returns', async () => {
    const axiosInstance = axios.create({
      baseURL: 'https://localhost:8080/api',
      data: {
        sessionKey: 'key',
      },
    })

    const resource = new AccountSession(axiosInstance)

    //
    const result = await resource.post({})
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Object.keys(result)).toHaveLength(0)
  })
})
