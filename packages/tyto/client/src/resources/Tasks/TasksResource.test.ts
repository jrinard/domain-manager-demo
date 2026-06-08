import { TYTO_NULL_DATE } from '@spacedock/tardis'
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

import { Tasks } from './TasksResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource Tasks', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new Tasks(axios.create())
    expect(resource.endpoint).toEqual('/tasks')
  })

  it('does not have a get method', () => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:4400/api',
      data: {
        sessionKey: 'key',
      },
    })

    const resource = new Tasks(axiosInstance)
    expect(resource).not.toHaveProperty('get')
  })
  describe('put()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new Tasks(axiosInstance)

      try {
        const result = await resource.put({
          displayInToDos: false,
          taskID: 3451786,
          taskDesc: 'test',
        })
        expect(result).toHaveProperty('taskID', 3451786)
      } catch (e) {
        console.error(
          'response data',
          get(e, 'response.data', 'no response.data')
        )
        console.error(
          'statusText',
          get(e, 'response.statusText', 'no statusText')
        )
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

      const resource = new Tasks(axiosInstance)

      try {
        const result = await resource.post({
          taskDesc: '',
          aboutID: 123,
          parentTaskID: 1,
          dueDate: TYTO_NULL_DATE,
          aboutType: 'ocEVENT',
          displayInToDos: false,
          sendNotice: false,
          startDate: TYTO_NULL_DATE,
          taskType: 'ocMEETINGAGENDA',
        })
        expect(result).toHaveProperty('recordsAffected', -1)
      } catch (e) {
        console.error(
          'response data',
          get(e, 'response.data', 'no response.data')
        )
        console.error(
          'statusText',
          get(e, 'response.statusText', 'no statusText')
        )
        throw e
      }
    })
  })
})
