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

import { BlockEnrollmentCompleteStatusForce } from './BlockEnrollmentCompleteStatusForceResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource BlockEnrollmentCompleteStatusForce', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new BlockEnrollmentCompleteStatusForce(axios.create())
    expect(resource.endpoint).toEqual('/BlockEnrollment/CompleteStatusForce')
  })

  describe('put()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new BlockEnrollmentCompleteStatusForce(axiosInstance)

      try {
        const result = await resource.put({
          blockID: 2535361,
          memberID: 1964550,
          enrollmentID: 22564229,
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
