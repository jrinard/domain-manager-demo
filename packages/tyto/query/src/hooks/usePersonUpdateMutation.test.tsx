import { act, renderHook, waitFor } from '@testing-library/react'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { setupServer } from 'msw/node'
import { PropsWithChildren } from 'react'
import {
  TytoClientProvider,
  QueryClientProvider,
} from '@spacedock/holoprojector'
import { createHandlers } from '@tyto/msw'

import { usePersonUpdateMutation } from './usePersonUpdateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('usePersonUpdateMutation', () => {
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
  it('returns the response from a Successfully mutation', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const onSuccess = vi.fn()
    const onError = vi.fn()

    const {
      result: { current },
    } = renderHook(() => usePersonUpdateMutation({ onSuccess, onError }), {
      wrapper,
    })

    act(() => {
      current.mutate({
        personID: 2184472,
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onError).not.toHaveBeenCalledOnce())
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      personID: 2184472,
    })
  })
})
