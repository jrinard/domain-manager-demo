import { renderHook, waitFor } from '@testing-library/react'
import { createHandlers } from '@tyto/msw'
import { describe, expect, it, vi } from 'vitest'
import { setupServer } from 'msw/node'
import { PropsWithChildren } from 'react'
import {
  QueryClientProvider,
  TytoClientProvider,
} from '@spacedock/holoprojector'

import { useQueryKeys } from './useQueryKeys'
import { useTeamsByFunctionQuery } from './useTeamsByFunctionQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: {
    getActiveSessionKey: () => 'key',
  },
}))

const server = setupServer(...createHandlers())
describe('useTeamsByFunctionQuery', () => {
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
      () =>
        useTeamsByFunctionQuery({
          operation: 'ocVIEW',
          functionName: 'Team Membership',
        }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data).toHaveProperty('teams')
  })
  describe('useQueryKey', () => {
    it('returns unique results', async () => {
      const wrapper = ({ children }: PropsWithChildren) => (
        <TytoClientProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </TytoClientProvider>
      )
      const { result } = renderHook(() => useQueryKeys(), {
        wrapper,
      })

      //
      const first = result.current.teamsByFunction({
        functionName: 'VCEPlan',
        operation: 'ocVIEW',
      })
      const second = result.current.teamsByFunction({
        functionName: 'VCEPlan',
        operation: 'ocVIEW',
        above: true,
      })
      expect(first[1]).not.toHaveProperty('above')
      expect(second[1]).toHaveProperty('above', true)
    })
  })
})
