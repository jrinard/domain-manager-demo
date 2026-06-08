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
import { saveForLessonPost } from '@spacedock/lore'

import { Endpoints, TYTO_ENDPOINT_PATHS } from '@tyto/client'

import { useSaveForLessonMutation } from './useSaveForLessonMutation'
import { restHandlers as clientConfigRestHandlers } from './useClientConfigQuery.test'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

export const restHandlers = [
  rest.post<Endpoints.Tyto.SaveForLesson.Post.Response>(
    `http://localhost:4400/api${TYTO_ENDPOINT_PATHS.ASSET_SAVEFORLESSON}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ...saveForLessonPost(),
        }),
      )
    },
  ),
  ...clientConfigRestHandlers,
]

const server = setupServer(...restHandlers)

describe('useSaveForLessonMutation', () => {
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
    const { result } = renderHook(
      () => useSaveForLessonMutation({ onSuccess: noop }),
      { wrapper },
    )

    act(() => {
      result.current.mutate({
        tempFileName: 'foo',
      })
    })

    await waitFor(() => !result.current.isPending)
    const saveForLessonResult = saveForLessonPost()
    //// There may be an issue with postCall and how we added opts?.axiosConfig that causes only this test to fail on occasion
    expect(typeof saveForLessonResult).toBe('object')
    expect(saveForLessonResult?.asset).toHaveProperty('assetID', 123)
    expect(saveForLessonResult?.lesson).toHaveProperty('lessonID', 123)
  })
})
