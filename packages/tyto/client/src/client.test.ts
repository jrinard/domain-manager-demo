import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import { setupTestServer } from '@tyto/msw/test-setup'
import axios from 'axios'
import TytoClient from './client'
import { UnauthenticatedException, UnauthenticatedReason } from './exceptions'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Client', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  describe('root resources', () => {
    it('has base resources', () => {
      const client = new TytoClient({
        axiosStatic: axios,
        baseURL: 'http://localhost:4400/api',
      })

      expect(client).toHaveProperty('Asset')
      expect(client).toHaveProperty('Inbox')
      expect(client).toHaveProperty('People')
      expect(client).toHaveProperty('Events')
      expect(client).toHaveProperty('TeamProfileImage')
      expect(client).toHaveProperty('Domain')
      expect(client).toHaveProperty('Domain.image')
      expect(client).not.toHaveProperty('Team.ProfileImage')
    })
  })
  describe('response interceptors', () => {
    it('returns response without error thrown', async () => {
      const client = new TytoClient({
        axiosStatic: axios,
        baseURL: 'http://localhost:4400/api',
      })

      await expect(
        client.Inbox.Conversations.get({ noticeID: 1 })
      ).resolves.not.toThrow()
    })
    it('throws UnauthenticatedException', async () => {
      const client = new TytoClient({
        axiosStatic: axios,
        baseURL: 'http://localhost:4400/api',
      })

      await expect(
        client.Inbox.Conversations.get({ noticeID: -297 })
      ).rejects.toThrowError(
        new UnauthenticatedException(UnauthenticatedReason.NotSpecified)
      )
    })
  })
})
