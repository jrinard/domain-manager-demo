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

import { useCustomTabCreateMutation } from './useCustomTabCreateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('useCustomTabCreateMutation', () => {
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

    const {
      result: { current },
    } = renderHook(() => useCustomTabCreateMutation({ onSuccess }), { wrapper })

    act(() => {
      current.mutate({
        destinationURI: 'www.google.com',
        menuItemDescription: 'google',
        methodType: 'ocVACANT',
        name: 'Test Tab 2',
        navigationTarget: '_blank',
        teamRoot: 2365525,
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      recordsAffected: 1,
      traitID: 922,
    })
  })
})
