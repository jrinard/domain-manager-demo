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

import { TeamMembershipPerson } from './TeamMembershipPersonResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource TeamMembershipPerson', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new TeamMembershipPerson(axios.create())
    expect(resource.endpoint).toEqual('/TeamMembership/Person')
  })

  describe('put()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new TeamMembershipPerson(axiosInstance)

      try {
        const result = await resource.put({
          teamID: 2365525,
          memberID: 2043811,
        })
        expect(result).toHaveProperty('recordsAffected', -1)
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

      const resource = new TeamMembershipPerson(axiosInstance)

      try {
        const result = await resource.post({
          teamID: 2365525,
          memberID: 2043811,
          isTeamLeader: true,
        })
        expect(result).toHaveProperty('recordsAffected', 204594)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
  describe('delete()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new TeamMembershipPerson(axiosInstance)

      try {
        const result = await resource.delete({
          teamID: 2365525,
          memberID: 2043811,
        })
        expect(result).toHaveProperty('recordsAffected', 1434)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
