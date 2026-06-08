import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import { get } from 'lodash'
import axios from 'axios'
import { setupTestServer } from '@tyto/msw/test-setup'

import { EventRsvp } from './EventRsvpResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource EventRsvp', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  it('has an endpoint property', () => {
    const resource = new EventRsvp(axios.create())
    expect(resource.endpoint).toEqual('/EventRsvp')
  })

  describe('put()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new EventRsvp(axiosInstance)
      try {
        const result = await resource.put({
          eventID: 1234,
          memberID: 1,
          rsvpStatus: 'ocMAYBE',
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
