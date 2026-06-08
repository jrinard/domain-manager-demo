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

import { CurriculumSummaryReport } from './CurriculumSummaryReportResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource CurriculumSummaryReport', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new CurriculumSummaryReport(axios.create())
    expect(resource.endpoint).toEqual('/CurriculumSummaryReport')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new CurriculumSummaryReport(axiosInstance)

      try {
        const result = await resource.get({
          curriculumIDs: [1234],
          teamPath: '%,1234,%',
        })
        expect(result).toHaveProperty('results')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
