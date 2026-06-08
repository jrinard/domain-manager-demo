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

import { TeamBanner } from './TeamBannerResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource TeamBanner', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new TeamBanner(axios.create())
    expect(resource.endpoint).toEqual('/team/banner')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new TeamBanner(axiosInstance)

      try {
        const result = await resource.post({
          teamID: 4798,
          uploadKey:
            '4e68fcd9-6dd8-480d-b82c-fed415d04b50_b320e145-61cf-48fd-b7b2-05e084cedae3_0',
        })
        expect(result).toHaveProperty('profileImageID', 2197102)
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

      const resource = new TeamBanner(axiosInstance)

      try {
        const result = await resource.put({
          assetID: 2197102,
        })
        expect(result).toHaveProperty('recordsAffected', -2)
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

      const resource = new TeamBanner(axiosInstance)

      try {
        const result = await resource.delete({
          assetID: 2197102,
          activeStatus: 'ocDISABLED',
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
