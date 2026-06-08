import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import axios from 'axios'
import { setupServer } from 'msw/node'
import { createHandlers } from '@tyto/msw'

import { Transcript } from './TranscriptResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('Resource Transcript', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has an endpoint property', () => {
    const resource = new Transcript(axios.create())
    expect(resource.endpoint).toEqual('/transcript')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Transcript(axiosInstance)
      const result = await resource.get({ forUserID: 1960713 })
      expect(result).toHaveProperty('Transcript')
    })
  })
})
