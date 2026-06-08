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

import { PersonOutsideIdentity } from './PersonOutsideIdentityResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource PersonOutsideIdentity', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new PersonOutsideIdentity(axios.create())
    expect(resource.endpoint).toEqual('/PersonOutsideIdentity')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new PersonOutsideIdentity(axiosInstance)

      try {
        const result = await resource.get({
          identityProviderGUID: 'guid',
          outsideID: 'id',
        })
        expect(result).toHaveProperty('outsideIdentity')
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

      const resource = new PersonOutsideIdentity(axiosInstance)

      try {
        const result = await resource.post({ stateCSRF: '{ "foo": "bar" }' })
        expect(result).toEqual({})
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
