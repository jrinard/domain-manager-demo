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

import { PersonAbsence } from './PersonAbsenceResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource PersonAbsence', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new PersonAbsence(axios.create())
    expect(resource.endpoint).toEqual('/PersonAbsence')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new PersonAbsence(axiosInstance)

      try {
        const result = await resource.get({ personID: 2043811 })
        expect(result).toHaveProperty('personAbsences')
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

      const resource = new PersonAbsence(axiosInstance)

      try {
        const result = await resource.put({
          personID: 2043811,
          timeZoneNameGeneral: 'US-Central',
          message: '',
          startTimeLocal: '1900-01-01T08:00:00',
          endTimeLocal: '1900-01-01T08:00:00',
        })
        expect(result).toHaveProperty(
          'iCalUID',
          '0E938EDC-F683-4F5F-B33B-0A70D38B9E75'
        )
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
