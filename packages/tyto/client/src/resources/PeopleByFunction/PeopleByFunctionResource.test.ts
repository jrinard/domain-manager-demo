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

import { PeopleByFunction } from './PeopleByFunctionResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource PeopleByFunction', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new PeopleByFunction(axios.create())
    expect(resource.endpoint).toEqual('/People/ByFunction')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new PeopleByFunction(axiosInstance)

      try {
        const result = await resource.get({
          functionName: 'Team%20Membership',
          teamID: 4798,
        })
        expect(result).toHaveProperty('people')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
