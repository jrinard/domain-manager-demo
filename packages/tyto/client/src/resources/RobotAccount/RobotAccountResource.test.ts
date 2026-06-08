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

import { RobotAccount } from './RobotAccountResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource RobotAccount', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new RobotAccount(axios.create())
    expect(resource.endpoint).toEqual('/robot/account')
  })

  describe('put()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new RobotAccount(axiosInstance)

      try {
        const result = await resource.put({
          personID: 1234,
          company: 'openai',
        })
        expect(result).toBeTruthy()
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

      const resource = new RobotAccount(axiosInstance)

      try {
        const result = await resource.post({
          primaryElementID: 1234,
          roleID: 1234,
          givenName: 'test',
          familyName: 'test',
          nativeLanguage: 'en',
          company: 'openai',
          jobTitle: 'test',
          experience: 'Exam_Evaluation',
          outsideType: 'test',
          outsideID: 'test',
          password: 'test',
        })
        expect(result).toHaveProperty('newUserID')
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
