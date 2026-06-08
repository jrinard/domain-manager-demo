import { renderHook, waitFor } from '@testing-library/react'
import { setupTestServer } from '@tyto/msw/test-setup'
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

import { usePersonPermissionsQuery } from './usePersonPermissionsQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('usePersonPermissionsQuery', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  it('returns all permissions when no functionName', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () => usePersonPermissionsQuery({ personID: 1 }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data).toHaveLength(6)
  })
  it('returns data functionName', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () =>
        usePersonPermissionsQuery({
          personID: 1,
          functionName: 'Person Demographics',
        }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data).toHaveLength(4)
  })
})
