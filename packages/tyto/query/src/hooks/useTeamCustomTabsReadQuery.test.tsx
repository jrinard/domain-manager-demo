import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { PropsWithChildren } from 'react'
import {
  QueryClientProvider,
  TytoClientProvider,
} from '@spacedock/holoprojector'
import { createHandlers } from '@tyto/msw'

import { useTeamCustomTabsReadQuery } from './useTeamCustomTabsReadQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

const server = setupServer(...createHandlers())

describe('useTeamCustomTabsReadQuery', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  //  Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())
  it('returns data', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () => useTeamCustomTabsReadQuery({ teamID: 2060224 }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.membersTabs).toHaveLength(1)
  })
})
