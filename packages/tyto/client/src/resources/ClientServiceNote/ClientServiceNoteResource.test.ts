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

import { ClientServiceNote } from './ClientServiceNoteResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource ClientServiceNote', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new ClientServiceNote(axios.create())
    expect(resource.endpoint).toEqual('/ClientServiceNote')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new ClientServiceNote(axiosInstance)

      try {
        const result = await resource.get({ clientServiceNoteID: 3 })
        expect(result).toHaveProperty('clientServiceNote')
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

      const resource = new ClientServiceNote(axiosInstance)

      try {
        const result = await resource.post({ elementID: 1234 })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
