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

import { CustomTab } from './CustomTabResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource CustomTab', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new CustomTab(axios.create())
    expect(resource.endpoint).toEqual('/CustomTab')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new CustomTab(axiosInstance)

      try {
        const result = await resource.post({
          destinationURI: 'www.google.com',
          menuItemDescription: 'google',
          methodType: 'ocVACANT',
          name: 'Test Tab 2',
          navigationTarget: '_blank',
          teamRoot: 2365525,
        })
        expect(result).toHaveProperty('traitID', 922)
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

      const resource = new CustomTab(axiosInstance)

      try {
        const result = await resource.put({
          destinationURI: 'www.google.com',
          name: 'Test Tab',
          navigationTarget: '_blank',
          traitID: 922,
        })
        expect(result).toHaveProperty('traitID', 922)
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

      const resource = new CustomTab(axiosInstance)

      try {
        const result = await resource.delete({
          traitID: 920,
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
