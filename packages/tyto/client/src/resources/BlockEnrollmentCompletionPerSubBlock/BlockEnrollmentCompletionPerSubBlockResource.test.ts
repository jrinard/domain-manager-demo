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

import { BlockEnrollmentCompletionPerSubBlock } from './BlockEnrollmentCompletionPerSubBlockResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource BlockEnrollmentCompletionPerSubBlock', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new BlockEnrollmentCompletionPerSubBlock(axios.create())
    expect(resource.endpoint).toEqual('/BlockEnrollment/CompletionPerSubBlock')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new BlockEnrollmentCompletionPerSubBlock(axiosInstance)

      try {
        const result = await resource.get({ blockID: 2495576, teamID: 2478024 })
        expect(result).toHaveProperty('blocks')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
