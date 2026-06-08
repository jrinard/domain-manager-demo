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
import useBlocksForEnrollmentQuery from './useBlocksForEnrollmentQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useBlocksForEnrollmentQuery', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  it('returns data when name parameter is provided', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () => useBlocksForEnrollmentQuery({ name: '%test%' }),
      {
        wrapper,
      },
    )

    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.result).toHaveProperty('blocks')
  })
})
