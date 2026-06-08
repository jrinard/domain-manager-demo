import { renderHook, waitFor } from '@testing-library/react'
import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import { PropsWithChildren } from 'react'
import {
  QueryClientProvider,
  TytoClientProvider,
} from '@spacedock/holoprojector'

import { useTeamBannersQuery } from './useTeamBannersQuery'
import { setupTestServer } from '@tyto/msw/test-setup'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useTeamBannersQuery', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })

  it('returns data', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(() => useTeamBannersQuery({ teamID: 551 }), {
      wrapper,
    })

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.banners).toHaveLength(4)
  })
})
