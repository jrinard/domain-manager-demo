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

import { PeopleSearch } from './PeopleSearchResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource PeopleSearch', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new PeopleSearch(axios.create())
    expect(resource.endpoint).toEqual('/People/Search')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new PeopleSearch(axiosInstance)

      try {
        const result = await resource.get({
          securityHashfunctionName: 'Block Enroll',
          securityHashoperation: 'ocADD',
          functionName: 'Team Membership',
          operation: 'ocVIEW',
        })
        expect(result).toHaveProperty('people')
        expect(result?.people).toHaveLength(4)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
