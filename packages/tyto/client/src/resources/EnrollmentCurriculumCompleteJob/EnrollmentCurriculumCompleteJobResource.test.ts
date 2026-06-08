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

import { EnrollmentCurriculumCompleteJob } from './EnrollmentCurriculumCompleteJobResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource EnrollmentCurriculumCompleteJob', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new EnrollmentCurriculumCompleteJob(axios.create())
    expect(resource.endpoint).toEqual('/enrollment/CurriculumCompleteJob')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new EnrollmentCurriculumCompleteJob(axiosInstance)

      try {
        const result = await resource.post({ memberIDs: [1960713] })
        expect(result).toHaveProperty('curriculumCompleteJobID') //TODO ? []
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
