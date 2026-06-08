import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { PropsWithChildren } from 'react'

import {
  Endpoints,
  TYTO_ENDPOINT_PATHS,
  TytoClientProvider,
} from '@tyto/client'

import { useConversationsQuery } from './useConversationsQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

export const restHandlers = [
  rest.get<Endpoints.Tyto.Inbox.Get.Response>(
    `https://localhost:8080/api${TYTO_ENDPOINT_PATHS.INBOX}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          notices: [{}],
          participants: [],
        }),
      )
    },
  ),
]

const server = setupServer(...restHandlers)

describe('useConversationsQuery', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  //  Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())
  it('returns data', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider
        axiosStatic={axios}
        baseURL={'https://localhost:8080/api'}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(() => useConversationsQuery(), {
      wrapper,
    })

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.notices).toHaveLength(1)
  })
})
