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

import { useTeamBannerCreateMutation } from './useTeamBannerCreateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useTeamBannerCreateMutation', () => {
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
    } = renderHook(() => useTeamBannerCreateMutation({ onSuccess }), {
      wrapper,
    })

    act(() => {
      current.mutate({
        teamID: 551,
        uploadKey:
          'dee1507b-ef58-4cff-ae50-6cdcb6dbfa50_92e4d10f-5fee-4af0-a879-07571bf84152_0',
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      profileImageID: 2197102,
    })
  })
})
