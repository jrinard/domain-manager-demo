import { createHandlers } from '@tyto/msw'
import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import axios from 'axios'
import { setupServer } from 'msw/node'

import { Team } from './TeamResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

//* Part 1 setup data for the handler
const server = setupServer(...createHandlers())

//* Part 2 test to call fake endpoints
describe('Resource Team', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  //Testing class itself is set up correctly
  it('has an endpoint property', () => {
    const resource = new Team(axios.create())
    expect(resource.endpoint).toEqual('/team')
  })

  describe('get()', () => {
    it('returns team', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Team(axiosInstance)

      const result = await resource.get({ teamID: 1081395 })

      expect(result).toHaveProperty('team')
    })
  })
})
