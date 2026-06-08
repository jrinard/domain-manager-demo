import { DefaultBodyType, MockedRequest, RestHandler } from 'msw'
import { setupServer } from 'msw/node'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { createHandlers } from './createHandlers'

export interface Methods {
  beforeAll: typeof beforeAll
  afterEach: typeof afterEach
  afterAll: typeof afterAll
}

export const server = setupServer(...createHandlers())

export const setupTestServer = (
  methods: Methods,
  options: {
    baseUrl?: string
    handlers?: RestHandler<MockedRequest<DefaultBodyType>>[]
  } = {},
) => {
  const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] =
    options.handlers || createHandlers(options?.baseUrl)
  const _server = options?.baseUrl ? setupServer(...handlers) : server
  // Start server before all tests
  methods.beforeAll(() => _server.listen({ onUnhandledRequest: 'error' }))

  //  Close server after all tests
  methods.afterAll(() => _server.close())

  // Reset handlers after each test `important for test isolation`
  methods.afterEach(() => _server.resetHandlers())

  return _server
}
