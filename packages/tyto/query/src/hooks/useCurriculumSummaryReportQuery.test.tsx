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

import { useCurriculumSummaryReportQuery } from './useCurriculumSummaryReportQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useCurriculumSummaryReportQuery', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  it('returns data', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () =>
        useCurriculumSummaryReportQuery({
          curriculumIDs: [1234],
          teamPath: '%,1234,%',
        }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.results?.curriculum).toHaveLength(1)
    expect(result.current.data?.results?.graphs).toHaveLength(2)
    expect(result.current.data?.results?.recentMemberCompletions).toHaveLength(
      1,
    )
  })
})
