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
import axios, { AxiosError } from 'axios'
import { setupServer } from 'msw/node'

import { Events } from './EventsResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('Resource Events', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has an endpoint property', () => {
    const resource = new Events(axios.create())
    expect(resource.endpoint).toEqual('/events')
  })

  describe('get()', () => {
    it('successful on passing filter for datetime range', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Events(axiosInstance)

      try {
        const result = await resource.get({
          filterTimeUTC_max: '2023-10-01T05:00:00.000Z',
          filterTimeUTC_min: '2023-10-31T05:00:00.000Z',
        })
        expect(result).toHaveProperty('events')
        expect(result.events).toHaveLength(13)
        expect(result).toHaveProperty('error.msg', 'initialized')
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const requiredProps = ['direct', 'below', 'above']
          requiredProps.forEach((prop) => {
            expect((e as AxiosError).response).not.toHaveProperty(
              'data.error.msg',
              `validation error: ${prop} required`
            )
          })
          expect((e as AxiosError).status).toEqual(200)
        } else {
          throw e
        }
      }
    })
  })
})
