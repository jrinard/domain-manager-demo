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

import { usePrerequisiteEnrollmentsQuery } from './usePrerequisiteEnrollmentsQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('usePrerequisiteEnrollmentsQuery', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  it('returns data', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () => usePrerequisiteEnrollmentsQuery({ memberID: 123, blockID: 1234 }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.prerequisiteEnrollments.length).toBeGreaterThan(
      0,
    )
  })
})
