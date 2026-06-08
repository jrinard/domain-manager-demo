import axios from 'axios'
import { describe, expect, it, vi } from 'vitest'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { PathParams, rest } from 'msw'
import { fixtureResourcePeopleAdvancedSearchGet } from '../../fixtures/resources/People/AdvancedSearch/Get/fixtureResourcePeopleAdvancedSearchGet'
import { TYTO_ENDPOINT_PATHS } from '../constants'

import { Endpoints } from '../typings'
import { PeopleAdvancedSearch } from './People.AdvancedSearch'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(
  ...[
    rest.get<
      Endpoints.Tyto.PeopleAdvancedSearch.Get.Parameters,
      PathParams,
      Endpoints.Tyto.PeopleAdvancedSearch.Get.Response
    >(
      `https://localhost:8080/api${TYTO_ENDPOINT_PATHS.PEOPLE_ADVANCEDSEARCH}`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(fixtureResourcePeopleAdvancedSearchGet())
        )
      }
    ),
  ]
)

describe('Resource People.AdvancedSearch', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  //  Close server after all tests
  afterAll(() => server.close())
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('has get() method returns', async () => {
    const axiosInstance = axios.create({
      baseURL: 'https://localhost:8080/api',
      data: {
        sessionKey: 'key',
      },
    })

    const resource = new PeopleAdvancedSearch(axiosInstance)

    //
    const result = await resource.get({
      functionName: 'Notices Person',
      operation: 'ocADD',
      generalName: '%Austin B%',
      top: 10,
    })

    expect(result.ret.people).toHaveLength(4)
  })
})
