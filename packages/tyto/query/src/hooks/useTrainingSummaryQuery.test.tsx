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

import { useTrainingSummaryQuery } from './useTrainingSummaryQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useTrainingSummaryQuery', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  it('returns data', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () =>
        useTrainingSummaryQuery({
          afterDate: '2024-01-01',
          beforeDate: '2025-01-01',
          catalogID: 0,
          teamID: 1234,
          disabled: false,
        }),
      {
        wrapper,
      },
    )

    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.trainingSummary).toHaveLength(1)
  })
})
