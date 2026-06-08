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
import { setupServer } from 'msw/node'
import { createHandlers } from '@tyto/msw'

import { PeopleAdvancedSearch } from './PeopleAdvancedSearchResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('Resource PeopleAdvancedSearch', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has an endpoint property', () => {
    const resource = new PeopleAdvancedSearch(axios.create())
    expect(resource.endpoint).toEqual('/People/AdvancedSearch')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new PeopleAdvancedSearch(axiosInstance)

      try {
        const result = await resource.get({
          teamIDs: '501865',
          excludeTerminateBefore: '1900-01-01',
        })
        expect(result).toHaveProperty('ret')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
