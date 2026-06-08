import { act, renderHook, waitFor } from '@testing-library/react'
import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import { noop } from 'lodash'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { PropsWithChildren } from 'react'
import {
  TytoClientProvider,
  QueryClientProvider,
} from '@spacedock/holoprojector'

import { Endpoints, TYTO_ENDPOINT_PATHS } from '@tyto/client'
import useConversationsMutation from './useConversationsMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

export const restHandlers = [
  rest.delete<Endpoints.Tyto.SaveForLesson.Post.Response>(
    `http://localhost:4400/api${TYTO_ENDPOINT_PATHS.INBOX}`,
    (_req, res, ctx) => {
      return res(ctx.status(201), ctx.json({}))
    },
  ),
]

const server = setupServer(...restHandlers)

describe('useConversationsMutation', () => {
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
  // * Happy path
  it('returns the response from a Successfully Saved Asset', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const {
      result: { current },
    } = renderHook(
      () => useConversationsMutation({ onSuccess: noop, onError: noop }),
      { wrapper },
    )

    act(() => {
      current.mutate({
        noticeIDs: [1],
      })
    })

    await waitFor(() => !current.isPending)

    expect(current.data).toEqual(undefined)
  })
})
