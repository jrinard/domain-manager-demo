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

import { DomainInvitationEmailTemplate } from './DomainInvitationEmailTemplateResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource DomainInvitationEmailTemplate', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new DomainInvitationEmailTemplate(axios.create())
    expect(resource.endpoint).toEqual('/DomainInvitationEmail/Template')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new DomainInvitationEmailTemplate(axiosInstance)

      try {
        const result = await resource.get({ domainID: 1234 })
        expect(result).toHaveProperty('template')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
