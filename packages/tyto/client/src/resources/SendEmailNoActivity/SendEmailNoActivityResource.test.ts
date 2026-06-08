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

import { SendEmailNoActivity } from './SendEmailNoActivityResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource SendEmailNoActivity', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new SendEmailNoActivity(axios.create())
    expect(resource.endpoint).toEqual('/sendEmail/noactivityAnnouncement')
  })

  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new SendEmailNoActivity(axiosInstance)

      try {
        const result = await resource.post({
          memberID: 1234,
          subject: 'Subject Test',
          body: 'Body Test',
          fromName: 'Joshua R',
          replyAddress: 'test@kv.com',
        })
        expect(result).toHaveProperty('emailResults')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
