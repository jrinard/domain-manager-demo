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

import { DomainInvitationEmail } from './DomainInvitationEmailResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource DomainInvitationEmail', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new DomainInvitationEmail(axios.create())
    expect(resource.endpoint).toEqual('/DomainInvitationEmail')
  })
  describe('post()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new DomainInvitationEmail(axiosInstance)

      try {
        const result = await resource.post({
          memberID: 2279712,
          subject: 'Reset',
          body: 'Please Reset',
          fromName: 'Johann',
          replyAddress: 'jloch@cardoneventures.com',
        })
        expect(result).toHaveProperty('recordsAffected', 1)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
