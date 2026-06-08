import { createHandlers } from '@tyto/msw'
import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import axios from 'axios'
import { setupServer } from 'msw/node'

import { Event } from './EventResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('Resource Event', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has an endpoint property', () => {
    const resource = new Event(axios.create())
    expect(resource.endpoint).toEqual('/event')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Event(axiosInstance)

      const result = await resource.get({ eventID: 123 })
      expect(result).toHaveProperty('event')
      expect(result.event).toHaveProperty(
        'eventName',
        'Developer "Lunch & Learn"'
      )
    })
  })

  describe('post()', () => {
    it('success', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })
      const requested = vi.fn()

      axiosInstance.interceptors.request.use(
        (config) => {
          requested(config.data)
          return Promise.resolve(config)
        },
        (error) => Promise.reject(error)
      )
      const resource = new Event(axiosInstance)

      const result = await resource.post({
        defaultReminderMinutes: 0,
        endTime: '',
        eventDesc: '',
        eventName: '',
        eventType: 'ocITEM',
        invitationType: 'ocSELF',
        location: '',
        recurrenceRules: [],
        startTime: '',
        timeZoneIDEnd: 0,
        timeZoneIDStart: 0,
      })
      expect(result).toHaveProperty('eventID')
      expect(requested).toHaveBeenCalledWith({
        defaultReminderMinutes: 0,
        endTime: '',
        eventDesc: '',
        eventName: '',
        eventType: 'ocITEM',
        invitationType: 'ocSELF',
        location: '',
        recurrenceRules: [],
        startTime: '',
        timeZoneIDEnd: 0,
        timeZoneIDStart: 0,
        prepareAction: true,
        prepareAgenda: true,
      })
    })
  })

  describe('delete()', () => {
    it('success', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Event(axiosInstance)

      const result = await resource.delete({
        eventID: 0,
      })
      expect(result).toHaveProperty('recordsAffected')
      expect(result).not.toHaveProperty('eventID')
    })
  })
})
