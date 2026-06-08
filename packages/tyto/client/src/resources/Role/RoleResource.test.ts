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

import { Role } from './RoleResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource Role', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new Role(axios.create())
    expect(resource.endpoint).toEqual('/Role')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Role(axiosInstance)

      try {
        const result = await resource.get({ roleID: 1 })
        expect(result).toHaveProperty('role.roleID', 1)
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

      const resource = new Role(axiosInstance)

      try {
        const result = await resource.post({
          teamRoot: 551,
          roleName: 'Testing',
        })
        expect(result).toHaveProperty('roleID', 779)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
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

      const resource = new Role(axiosInstance)

      try {
        const result = await resource.put({
          roleID: 779,
          roleName: 'Testing123',
        })
        expect(result).toHaveProperty('recordsAffected', 1)
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

      const resource = new Role(axiosInstance)

      try {
        const result = await resource.delete({
          roleID: 779,
        })
        expect(result).toHaveProperty('recordsAffected', 1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
