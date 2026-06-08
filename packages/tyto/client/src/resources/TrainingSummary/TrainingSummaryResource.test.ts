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

import { TrainingSummary } from './TrainingSummaryResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource TrainingSummary', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new TrainingSummary(axios.create())
    expect(resource.endpoint).toEqual('/Training/Summary')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new TrainingSummary(axiosInstance)

      try {
        const result = await resource.get({
          catalogID: 0,
          teamID: 123,
          afterDate: '2025-01-01',
          beforeDate: new Date().toISOString(),
        })
        expect(result).toHaveProperty('trainingSummary')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
