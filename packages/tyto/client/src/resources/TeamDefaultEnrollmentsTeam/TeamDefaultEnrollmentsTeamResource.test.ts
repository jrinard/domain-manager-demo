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

import { TeamDefaultEnrollmentsTeam } from './TeamDefaultEnrollmentsTeamResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource TeamDefaultEnrollmentsTeam', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new TeamDefaultEnrollmentsTeam(axios.create())
    expect(resource.endpoint).toEqual('/teamDefaultEnrollments/Team')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new TeamDefaultEnrollmentsTeam(axiosInstance)

      try {
        const result = await resource.get({ teamID: 12345 })
        expect(result).toHaveProperty('defaultEnrollments')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
