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

import { IdentityAuthorizationConnect } from './IdentityAuthorizationConnectResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource IdentityAuthorizationConnect', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new IdentityAuthorizationConnect(axios.create())
    expect(resource.endpoint).toEqual('/Identity/Authorization/connect')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new IdentityAuthorizationConnect(axiosInstance)

      try {
        const result = await resource.post({
          identityProviderGUID: 'guid',
          callbackURI: 'uri',
        })
        // * Has no body in response (value is a Header)
        expect(result).toBeTruthy()
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
