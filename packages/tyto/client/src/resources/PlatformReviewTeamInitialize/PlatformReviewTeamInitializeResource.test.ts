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

import { PlatformReviewTeamInitialize } from './PlatformReviewTeamInitializeResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource PlatformReviewTeamInitialize', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new PlatformReviewTeamInitialize(axios.create())
    expect(resource.endpoint).toEqual('/platformreview/team/initialize')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new PlatformReviewTeamInitialize(axiosInstance)

      try {
        const result = await resource.post({
          srcTaskID: 1234,
          destTeamID: 9872,
        })
        expect(result).toHaveProperty('newTaskID', 3464983)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
