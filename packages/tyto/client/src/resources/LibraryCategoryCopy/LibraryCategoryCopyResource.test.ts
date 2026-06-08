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

import { LibraryCategoryCopy } from './LibraryCategoryCopyResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource LibraryCategoryCopy', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new LibraryCategoryCopy(axios.create())
    expect(resource.endpoint).toEqual('/LibraryCategory/copy')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new LibraryCategoryCopy(axiosInstance)

      try {
        const result = await resource.post({
          sourceLibraryCategoryID: 1234,
          sourceMemberID: 1234,
          destParentLibraryCategoryID: 4567,
          destMemberID: 4567,
        })
        expect(result).toHaveProperty('result')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
