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

import { useCreateInboxCommentMutation } from './useCreateInboxCommentMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

export const restHandlers = [
  rest.post<Endpoints.Tyto.Inbox.Post.Response>(
    `http://localhost:4400/api${TYTO_ENDPOINT_PATHS.INBOX_COMMENT}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          noticeCommentID: 123,
        }),
      )
    },
  ),
]

const server = setupServer(...restHandlers)

describe('useCreateInboxCommentMutation', () => {
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
  it('returns the noticeID of the newly created Conversation', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () => useCreateInboxCommentMutation({ onSuccess: noop }),
      { wrapper },
    )

    act(() => {
      result.current.mutate({
        body: 'This is a Test Conversation',
        noticeID: 123,
      })
    })

    await waitFor(() => !result.current.isPending)

    expect(typeof result.current.data?.noticeCommentID).toBe('number')
    expect(result.current.data?.noticeCommentID).not.toEqual(0)
  })
})
