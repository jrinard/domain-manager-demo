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

import { EventAttendees } from './EventAttendeesResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('Resource EventAttendees', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has an endpoint property', () => {
    const resource = new EventAttendees(axios.create())
    expect(resource.endpoint).toEqual('/EventAttendees')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new EventAttendees(axiosInstance)

      const result = await resource.get({ eventID: 123 })
      expect(result).toHaveProperty('eventAttendees')
      expect(result).toHaveProperty('eventAttendees[0].eventAttendeeID', 701954)
    })
  })
})
