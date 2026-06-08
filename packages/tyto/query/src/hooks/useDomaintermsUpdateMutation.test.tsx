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
import { PropsWithChildren } from 'react'
import {
  TytoClientProvider,
  QueryClientProvider,
} from '@spacedock/holoprojector'
import { setupTestServer } from '@tyto/msw/test-setup'

import { useDomaintermsUpdateMutation } from './useDomaintermsUpdateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useDomaintermsUpdateMutation', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
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
    } = renderHook(() => useDomaintermsUpdateMutation({ onSuccess, onError }), {
      wrapper,
    })

    act(() => {
      current.mutate({
        domainID: 123,
        termsOfService: 'Test TOS',
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onError).not.toHaveBeenCalled())
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      policy: {
        PolicyID: 259,
        PolicyText: 'Test Terms of TOS',
        createdDate: '2023-11-14T22:34:49.487',
        createdUser: 2043811,
        domainID: 2365525,
        language: '',
        modifiedDate: '2024-07-19T18:52:56.053',
        modifiedUser: 1960713,
      },
    })
  })
})
