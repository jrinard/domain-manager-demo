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

import { PersonCustomTab } from './PersonCustomTabResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource PersonCustomTab', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new PersonCustomTab(axios.create())
    expect(resource.endpoint).toEqual('/Person/CustomTab')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new PersonCustomTab(axiosInstance)

      try {
        const result = await resource.post({ traitID: 922, personID: 2043811 })
        expect(result).toHaveProperty('itemTraitID', 31386)
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

      const resource = new PersonCustomTab(axiosInstance)

      try {
        const result = await resource.delete({
          itemTraitID: 31386,
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
