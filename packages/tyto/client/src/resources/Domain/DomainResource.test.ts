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

import { Domain } from './DomainResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('Resource Domain', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has an endpoint property', () => {
    const resource = new Domain(axios.create())
    expect(resource.endpoint).toEqual('/domain')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Domain(axiosInstance)

      try {
        const result = await resource.get({ domainID: 1234 })
        expect(result).toHaveProperty('domain.domainID', 551)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
    it('passes required parameters', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Domain(axiosInstance)
      await expect(async () => {
        await resource.get({ domainID: -1 })
      }).rejects.toThrow()
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

      const resource = new Domain(axiosInstance)

      try {
        const result = await resource.put({
          domainID: 2365525,
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
