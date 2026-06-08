import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import axios from 'axios'
import { noop } from 'lodash'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { PropsWithChildren } from 'react'
import type { Data } from '@spacedock/manifest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { TytoClientProvider } from '@tyto/client'

import { useConversationItemMutation } from './useConversationItemMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

export const restHandlers = [
  rest.get<Data.NonGetTytoResponse>(
    `https://localhost:8080/v25/nl/components/inbox/functions.vb.asp`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          recordsAffected: 1,
          success: [{ notice: 123 }],
        }),
      )
    },
  ),
]

const server = setupServer(...restHandlers)

describe('useConversationItemMutation', () => {
  // Start server before all tests
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })

  //  Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test `important for test isolation`
  afterEach(() => {
    server.resetHandlers()
  })
  // * Happy Path 1 (Starring)
  it('returns a flag saying a Conversation is now "Starred"', async () => {
    const queryClient = createQueryClient()

    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider
        axiosStatic={axios}
        baseURL={'https://localhost:8080/'}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TytoClientProvider>
    )
    const mutation = renderHook(
      () =>
        useConversationItemMutation({
          onSuccess: noop,
        }),
      { wrapper },
    )

    await mutation.result.current.mutateAsync({
      noticeID: 123,
      isCritical: true,
    })
    mutation.rerender()

    await waitFor(() => {
      expect(mutation.result.current.isPending).toBe(false)
    })

    expect(typeof mutation.result.current.data).toBe('object')
  })
  // * Happy Path 2 (Toggling "Read Status")
  it('returns a flag saying a Conversation is now "Unread"', async () => {
    const queryClient = createQueryClient()

    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider
        axiosStatic={axios}
        baseURL={'https://localhost:8080'}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TytoClientProvider>
    )
    const { result, rerender } = renderHook(
      () =>
        useConversationItemMutation({
          onSuccess: noop,
        }),
      { wrapper },
    )

    await result.current.mutateAsync({
      noticeID: 123,
      isNew: true,
    })
    rerender()
    await waitFor(() => {
      expect(result.current.isPending).toBe(false)
    })

    expect(typeof result.current.data).toBe('object')
    expect(result.current.data).toHaveProperty('recordsAffected', 1)
  })
})
