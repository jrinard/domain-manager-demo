import { get } from 'lodash'
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

import { EventAttendeesDiscProfiles } from './EventAttendeesDiscProfilesResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('Resource EventAttendeesDiscProfiles', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has an endpoint property', () => {
    const resource = new EventAttendeesDiscProfiles(axios.create())
    expect(resource.endpoint).toEqual('/EventAttendees/DiscProfiles')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new EventAttendeesDiscProfiles(axiosInstance)

      try {
        const result = await resource.get({ eventID: 1234 })
        expect(result).toHaveProperty('discProfiles')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
