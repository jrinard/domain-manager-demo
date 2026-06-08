import { fixtureClientConfigGet } from '@spacedock/lore'
import { renderHook, waitFor } from '@testing-library/react'
import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { PropsWithChildren } from 'react'
import { Endpoints, TYTO_ENDPOINT_PATHS } from '@tyto/client'
import {
  QueryClientProvider,
  TytoClientProvider,
} from '@spacedock/holoprojector'

import { useClientConfigQuery } from './useClientConfigQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

export const restHandlers = [
  rest.get<Endpoints.Tyto.Configuration.Client.Get.Response>(
    `http://localhost:4400/api${TYTO_ENDPOINT_PATHS.CONFIGURATION_CLIENT}`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fixtureClientConfigGet()))
    },
  ),
]

const server = setupServer(...restHandlers)

describe('useClientConfig', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  //  Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())
  it('returns data', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(() => useClientConfigQuery({}), {
      wrapper,
    })

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data).toHaveProperty('uploadServices')
  })
})
