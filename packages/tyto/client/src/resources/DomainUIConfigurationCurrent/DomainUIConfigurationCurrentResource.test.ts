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

import { DomainUIConfigurationCurrent } from './DomainUIConfigurationCurrentResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource DomainUIConfigurationCurrent', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new DomainUIConfigurationCurrent(axios.create())
    expect(resource.endpoint).toEqual('/domain/ui/configuration/current')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new DomainUIConfigurationCurrent(axiosInstance)

      try {
        const result = await resource.get({
          configType: 'ocTRYYBSTART',
          domainID: 551,
        })
        expect(result).toHaveProperty('UIConfigurationCurrent')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
