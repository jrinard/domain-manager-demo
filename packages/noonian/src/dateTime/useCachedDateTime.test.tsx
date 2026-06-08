import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCachedDateTime } from './useCachedDateTime'
import { DateTime } from 'luxon'
import { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@spacedock/holoprojector'

describe('useCachedDateTime', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })
  it('returns now DateTime as default', async () => {
    vi.setSystemTime(
      DateTime.fromFormat('October 10 2023', 'MMMM d yyyy').toJSDate()
    )
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useCachedDateTime(), { wrapper })

    expect(result.current[0].toFormat('MMMM d yyyy')).toEqual('October 10 2023')
  })

  it('returns set DateTime', async () => {
    vi.setSystemTime(
      DateTime.fromFormat('October 12 2023', 'MMMM d yyyy').toJSDate()
    )
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useCachedDateTime(), { wrapper })

    act(() => {
      result.current[1](DateTime.fromFormat('October 26 2022', 'MMMM d yyyy'))
    })
    waitFor(() =>
      expect(result.current[0].toFormat('MMMM d yyyy')).toEqual(
        'October 26 2022'
      )
    )
    act(() => {
      result.current[1](DateTime.fromFormat('July 1 2025', 'MMMM d yyyy'))
    })
    waitFor(() =>
      expect(result.current[0].toFormat('MMMM d yyyy')).toEqual('July 1 2025')
    )
  })
})
