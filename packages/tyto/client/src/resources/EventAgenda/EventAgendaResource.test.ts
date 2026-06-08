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

import { EventAgenda } from './EventAgendaResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource EventAgenda', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new EventAgenda(axios.create())
    expect(resource.endpoint({ eventID: 120 })).toEqual('/event/120/agenda')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new EventAgenda(axiosInstance)

      try {
        const result = await resource.post({
          displayInToDos: false,
          dueDate: '',
          durationMinutes: 0,
          memberID: 0,
          sendNotice: false,
          startDate: '',
          taskDesc: '',
          taskName: '',
          eventID: 1234,
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
