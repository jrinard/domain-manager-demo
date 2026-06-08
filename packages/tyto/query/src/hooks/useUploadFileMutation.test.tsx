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
import {
  mockTextFile as mockFile,
  uploadPost,
  UPLOAD_KEY,
  UPLOAD_KEY_PARTIAL,
} from '@spacedock/lore'

import { Endpoints } from '@tyto/client'

import { restHandlers as ClientConfigHandlers } from './useClientConfigQuery.test'
// * import { restHandlers as SaveForLessonHandlers } from './useSaveForLessonMutation.test'
import { useUploadFileMutation } from './useUploadFileMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const API_PATH = '/upload-service'

export const restHandlers = [
  rest.post<Endpoints.Tyto.Inbox.Post.Response>(
    `http://localhost:4400/api${API_PATH}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ...uploadPost(),
        }),
      )
    },
  ),
  ...ClientConfigHandlers,
  // * ...SaveForLessonHandlers, // * Contains Client Config Rest Handlers
]

const server = setupServer(...restHandlers)

describe('useUploadFileMutation', () => {
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
  it('returns the response from a Successful Upload', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () => useUploadFileMutation({ onSuccess: noop }),
      { wrapper },
    )

    act(() => {
      result.current.mutate({
        endpointURL: `http://localhost:4400/api${API_PATH}`,
        file: mockFile('text/plain', 1_024),
      })
    })

    await waitFor(() => !result.current.isPending)

    expect(result.current.data).toHaveProperty('uploadKey', UPLOAD_KEY_PARTIAL)
    expect(result.current.data?.uploadFiles).toHaveLength(1)
    expect(result.current.data?.uploadFiles).to.have.lengthOf(1)
    expect(result.current.data?.uploadFiles?.[0]).toHaveProperty(
      'fileUploadKey',
      UPLOAD_KEY,
    )
  })
})
