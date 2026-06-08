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

import { TaskStructure } from './TaskStructureResource'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('Resource TaskStructure', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('has an endpoint property', () => {
    const resource = new TaskStructure(axios.create())
    expect(resource.endpoint).toEqual('/task/structure')
  })

  describe('get()', () => {
    it('returns expected properties', async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:4400/api',
        data: {
          sessionKey: 'key',
        },
      })

      const resource = new TaskStructure(axiosInstance)

      try {
        const result = await resource.get({ taskID: 1234 })
        expect(result).toHaveProperty('task')
        expect(result.task).toHaveProperty('tasks')
        expect(result.task).toHaveProperty('taskRelations')
        expect(result.task.tasks).toHaveLength(3)
      } catch (e) {
        console.error(get(e, 'response.data', ''))
        throw e
      }
    })
  })
})
