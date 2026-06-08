import { renderHook, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useThrottledSearchTerm } from './useThrottledSearchTerm'

describe('useThrottledSearchTerm', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should debounce search term updates', async () => {
    const { result } = renderHook(() =>
      useThrottledSearchTerm({
        delayMS: 100,
        initialSearchTerm: '',
      }),
    )

    // Initial state
    expect(result.current.searchTermForInput).toBe('')
    expect(result.current.searchTermForFiltering).toBe('')

    // Update search term
    act(() => {
      result.current.setSearchTerm('test')
    })
    expect(result.current.searchTermForInput).toBe('test')
    expect(result.current.searchTermForFiltering).toBe('') // Still old value

    // Advance timers to trigger debounce
    await act(async () => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current.searchTermForFiltering).toBe('test')
  })

  it('should cancel pending debounced calls on unmount', () => {
    const { result, unmount } = renderHook(() =>
      useThrottledSearchTerm({
        delayMS: 100,
        initialSearchTerm: '',
      }),
    )

    // Update search term to trigger debounce
    act(() => {
      result.current.setSearchTerm('test')
    })

    // Unmount before debounce completes - this should cancel the pending callback
    unmount()

    // Advance timers - the callback should not execute after unmount
    expect(() => {
      vi.advanceTimersByTime(200)
    }).not.toThrow()
  })

  it('should cancel previous debounced call when search term changes', async () => {
    const { result } = renderHook(() =>
      useThrottledSearchTerm({
        delayMS: 100,
        initialSearchTerm: '',
      }),
    )

    // Update search term multiple times
    act(() => {
      result.current.setSearchTerm('t')
    })
    await act(async () => {
      vi.advanceTimersByTime(50)
    })

    act(() => {
      result.current.setSearchTerm('te')
    })
    await act(async () => {
      vi.advanceTimersByTime(50)
    })

    act(() => {
      result.current.setSearchTerm('tes')
    })
    await act(async () => {
      vi.advanceTimersByTime(50)
    })

    act(() => {
      result.current.setSearchTerm('test')
    })

    // Only the last value should be used after full delay
    await act(async () => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current.searchTermForFiltering).toBe('test')
  })
})
