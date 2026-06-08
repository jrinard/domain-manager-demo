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

import { DomainUIConfigurationLibraryImageUpload } from './DomainUIConfigurationLibraryImageUploadResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource DomainUIConfigurationLibraryImageUpload', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new DomainUIConfigurationLibraryImageUpload(axios.create())
    expect(resource.endpoint).toEqual(
      '/domain/ui/configuration/library/imageUpload',
    )
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new DomainUIConfigurationLibraryImageUpload(
        axiosInstance,
      )

      try {
        const result = await resource.post({
          domainID: 551,
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
