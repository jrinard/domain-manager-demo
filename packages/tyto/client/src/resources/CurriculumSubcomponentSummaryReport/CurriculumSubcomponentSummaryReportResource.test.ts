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

import { CurriculumSubcomponentSummaryReport } from './CurriculumSubcomponentSummaryReportResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource CurriculumSubcomponentSummaryReport', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new CurriculumSubcomponentSummaryReport(axios.create())
    expect(resource.endpoint).toEqual('/CurriculumSubcomponentSummaryReport')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new CurriculumSubcomponentSummaryReport(axiosInstance)

      try {
        const result = await resource.get({ curriculumID: 1234 })
        expect(result).toHaveProperty('results')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new CurriculumSubcomponentSummaryReport(axiosInstance)

      try {
        const result = await resource.post({ curriculumID: 1234 })
        expect(result).toHaveProperty('results')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
