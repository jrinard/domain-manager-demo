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

import { PrerequisiteEnrollments } from './PrerequisiteEnrollmentsResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource PrerequisiteEnrollments', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new PrerequisiteEnrollments(axios.create())
    expect(resource.endpoint).toEqual('/prerequisiteEnrollments3')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new PrerequisiteEnrollments(axiosInstance)

      try {
        const result = await resource.get({ memberID: 1234, blockID: 1233556 })
        expect(result).toHaveProperty('prerequisiteEnrollments')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
