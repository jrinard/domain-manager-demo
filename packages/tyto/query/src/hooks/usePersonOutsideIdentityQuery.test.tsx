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
import { setupTestServer } from '@tyto/msw/test-setup'

import { usePersonOutsideIdentityQuery } from './usePersonOutsideIdentityQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('usePersonOutsideIdentityQuery', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  it('returns data', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () =>
        usePersonOutsideIdentityQuery({
          identityProviderGUID: '123',
          outsideID: '456',
        }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.outsideIdentity).toBeDefined()
  })
})
