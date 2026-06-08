import { QueryClientProvider } from '@spacedock/holoprojector'
import { act, renderHook } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { describe, expect, it } from 'vitest'

import useCachedSetExtended from './useCachedSetExtended'

describe('useCachedSetExtended', () => {
  it('replaces all', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider>{children}</QueryClientProvider>
    )
    const { result } = renderHook(
      () => useCachedSetExtended<number>('my-set'),
      { wrapper }
    )
    act(() => {
      result.current[0].replaceAll([1, 2, 3, 4, 5])
      expect(result.current[0].toArray()).toHaveLength(5)
    })
    expect(result.current[0].toArray()).toEqual([1, 2, 3, 4, 5])
    act(() => {
      result.current[0].replaceAll([10])
      expect(result.current[0].toArray()).toHaveLength(1)
    })
    expect(result.current[0].toArray()).toEqual([10])
  })
  it('onChange triggered', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider>{children}</QueryClientProvider>
    )
    const { result } = renderHook(
      () => useCachedSetExtended<number>('my-set'),
      { wrapper }
    )
    result.current[0].onChange = vi.fn()
    act(() => {
      result.current[0].replaceAll([1, 2, 3, 4, 5])
    })
    expect(result.current[0].onChange).toHaveBeenCalledTimes(1)
    act(() => {
      result.current[0].replaceAll([1, 2, 3, 4, 5])
    })
    expect(result.current[0].onChange).toHaveBeenCalledTimes(2)
    act(() => {
      result.current[0].add(3242)
    })
    expect(result.current[0].onChange).toHaveBeenCalledTimes(3)
    act(() => {
      result.current[0].delete(3242)
    })
    expect(result.current[0].onChange).toHaveBeenCalledTimes(4)
    act(() => {
      result.current[0].delete(3242)
    })
    expect(result.current[0].onChange).toHaveBeenCalledTimes(4)
  })
})
