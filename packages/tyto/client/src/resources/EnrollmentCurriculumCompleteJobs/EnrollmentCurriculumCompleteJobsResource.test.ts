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

import { EnrollmentCurriculumCompleteJobs } from './EnrollmentCurriculumCompleteJobsResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource EnrollmentCurriculumCompleteJobs', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new EnrollmentCurriculumCompleteJobs(axios.create())
    expect(resource.endpoint).toEqual('/enrollment/CurriculumCompleteJobs')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new EnrollmentCurriculumCompleteJobs(axiosInstance)

      try {
        const result = await resource.get({ createdByID: 1234 })
        expect(result).toHaveProperty('curriculumCompleteJobs')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
