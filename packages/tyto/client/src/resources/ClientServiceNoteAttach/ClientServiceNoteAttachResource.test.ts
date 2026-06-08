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

import { ClientServiceNoteAttach } from './ClientServiceNoteAttachResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource ClientServiceNoteAttach', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new ClientServiceNoteAttach(axios.create())
    expect(resource.endpoint).toEqual('/ClientServiceNote/Attach')
  })

  describe('delete()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new ClientServiceNoteAttach(axiosInstance)

      try {
        const result = await resource.delete({
          clientServiceNoteAttachID: 333,
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

      const resource = new ClientServiceNoteAttach(axiosInstance)

      try {
        const result = await resource.post({
          clientServiceNoteID: 111,
          uploadBinaryKey: 'FakeKey',
        })
        expect(result).toHaveProperty('clientServiceNoteAttachID')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
