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

import { useDomainInvitationEmailCreateMutation } from './useDomainInvitationEmailCreateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useDomainInvitationEmailCreateMutation', () => {
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
    } = renderHook(
      () => useDomainInvitationEmailCreateMutation({ onSuccess }),
      { wrapper },
    )

    act(() => {
      current.mutate({
        memberID: 2279712,
        subject: 'Reset',
        body: 'Please Reset',
        fromName: 'Johann',
        replyAddress: 'jloch@cardoneventures.com',
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      recordsAffected: 1,
    })
  })
})
