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
import { useTelecomUpdateMutation } from './useTelecomUpdateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useTelecomUpdateMutation', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
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
    } = renderHook(() => useTelecomUpdateMutation({ onSuccess }), { wrapper })

    act(() => {
      current.mutate({
        telecomGUID: '9e3afd57-b9b7-4831-99b2-81a7ec6cbee2',
        label: 'Fake Phone',
        address: '1234567890',
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      recordsAffected: -1,
    })
  })
})
