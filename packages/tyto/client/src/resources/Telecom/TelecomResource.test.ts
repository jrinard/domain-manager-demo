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

import { Telecom } from './TelecomResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource Telecom', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new Telecom(axios.create())
    expect(resource.endpoint).toEqual('/Telecom')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Telecom(axiosInstance)

      try {
        const result = await resource.get({ elementID: 2043811 })
        expect(result).toHaveProperty('telecom')
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

      const resource = new Telecom(axiosInstance)

      try {
        const result = await resource.post({
          elementID: 2043811,
          label: 'Fake Phone',
          address: '1234567890',
        })
        expect(result).toHaveProperty(
          'telecomGUID',
          '9e3afd57-b9b7-4831-99b2-81a7ec6cbee2'
        )
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

      const resource = new Telecom(axiosInstance)

      try {
        const result = await resource.put({
          telecomGUID: '9e3afd57-b9b7-4831-99b2-81a7ec6cbee2',
          label: 'Fake Phone',
          address: '1234567890',
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
