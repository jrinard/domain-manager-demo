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

import { TrainingCatalogLessonCompletionSummarySB2165 } from './TrainingCatalogLessonCompletionSummarySB2165Resource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource TrainingCatalogLessonCompletionSummarySB2165', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new TrainingCatalogLessonCompletionSummarySB2165(
      axios.create(),
    )
    expect(resource.endpoint).toEqual(
      '/TrainingCatalogLessonCompletionSummary_SB2165',
    )
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new TrainingCatalogLessonCompletionSummarySB2165(
        axiosInstance,
      )

      try {
        const result = await resource.get({ teamID: 1234, catalogID: 1234 })
        expect(result).toHaveProperty(
          'TrainingCatalogLessonCompletionSummary_SB2165',
        )
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
