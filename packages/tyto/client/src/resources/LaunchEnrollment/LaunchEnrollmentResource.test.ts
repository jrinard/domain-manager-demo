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

import { LaunchEnrollment } from './LaunchEnrollmentResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource EnrollmentHistory', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new LaunchEnrollment(axios.create())
    expect(resource.endpoint).toEqual('/launch/enrollment')
  })

  describe('put()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new LaunchEnrollment(axiosInstance)

      try {
        const result = await resource.put({
          enrollmentID: 5657355,
          completeStatus: 'ocCOMPLETE',
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
