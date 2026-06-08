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

import { DomainUIConfiguration } from './DomainUIConfigurationResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource DomainUIConfiguration', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new DomainUIConfiguration(axios.create())
    expect(resource.endpoint).toEqual('/domain/ui/configuration')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new DomainUIConfiguration(axiosInstance)

      try {
        const result = await resource.get({
          UIconfigGUID: 'abcd-12345678-90ab-cdef',
        })
        expect(result).toHaveProperty('UIConfiguration')
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

      const resource = new DomainUIConfiguration(axiosInstance)

      try {
        const result = await resource.post({
          mimeType: 'application/json',
          domainID: 1234,
          configType: 'ocTRYYBSTART',
          attachments: [],
        })
        expect(result).toHaveProperty('recordsAffected', -1)
        expect(result).toHaveProperty('configName', '')
        expect(result).toHaveProperty('UIconfigGUID', '')
        expect(result).toHaveProperty('lastModifiedOfstDate', '')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })

  describe('put()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new DomainUIConfiguration(axiosInstance)

      try {
        const result = await resource.put({
          UIconfigGUID: 'abcd-12345678-90ab-cdef',
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
