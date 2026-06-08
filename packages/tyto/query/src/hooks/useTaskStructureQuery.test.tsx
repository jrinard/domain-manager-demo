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

import { useTaskStructureQuery } from './useTaskStructureQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useTaskStructureQuery', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  it('returns expected unfiltered', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () => useTaskStructureQuery({ taskID: 123 }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.task.tasks).toHaveLength(3)
  })
  it('returns only expected taskTypes', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const { result } = renderHook(
      () => useTaskStructureQuery({ taskID: 124, taskType: 'ocMEETINGAGENDA' }),
      {
        wrapper,
      },
    )

    //
    await waitFor(() => expect(result.current.isPending).toEqual(false))
    expect(result.current.data?.task.tasks).toHaveLength(2)
    expect(result.current.data?.task.tasks[0].taskType).toEqual(
      'ocMEETINGAGENDA',
    )
    expect(result.current.data?.task.tasks[1].taskType).toEqual(
      'ocMEETINGAGENDA',
    )
  })
})
