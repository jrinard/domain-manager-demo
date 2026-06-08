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

import { TeamMembershipTeam } from './TeamMembershipTeamResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource TeamMembershipTeam', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new TeamMembershipTeam(axios.create())
    expect(resource.endpoint).toEqual('/TeamMembership/Team')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new TeamMembershipTeam(axiosInstance)

      try {
        const result = await resource.put({
          parentTeamID: 2250833,
          childTeamID: 2465693,
          newTeamID: 2465695,
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
