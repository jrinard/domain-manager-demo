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

import { ClientServiceNotesByElement } from './ClientServiceNotesByElementResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource ClientServiceNotesByElement', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new ClientServiceNotesByElement(axios.create())
    expect(resource.endpoint).toEqual('/ClientServiceNotes/ByElement')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new ClientServiceNotesByElement(axiosInstance)

      try {
        const result = await resource.get({ elementID: 182571 })
        expect(result).toHaveProperty('clientServiceNotes')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
