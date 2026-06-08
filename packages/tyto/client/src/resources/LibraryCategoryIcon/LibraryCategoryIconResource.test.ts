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

import { LibraryCategoryIcon } from './LibraryCategoryIconResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource LibraryCategoryIcon', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new LibraryCategoryIcon(axios.create())
    expect(resource.endpoint).toEqual('/LibraryCategory/Icon')
  })

  describe('delete()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new LibraryCategoryIcon(axiosInstance)

      try {
        const result = await resource.delete({
          imageID: 1234,
        })
        expect(result).toHaveProperty('recordsAffected')
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

      const resource = new LibraryCategoryIcon(axiosInstance)

      try {
        const result = await resource.post({
          libraryCategoryID: 1234,
          memberID: 4567,
          fileUploadKey: 'key',
        })
        expect(result).toHaveProperty('imageID')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
