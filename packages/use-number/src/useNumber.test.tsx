import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useNumber } from './index'

describe('useNumber', () => {
  it('should return a tuple with a number and an object with set, increment, and decrement functions', () => {
    const { result } = renderHook(() => useNumber(5))
    expect(result.current[0]).toBe(5)
    const functions = result.current[1]
    expect(functions).toHaveProperty('set')
    expect(functions).toHaveProperty('increment')
    expect(functions).toHaveProperty('decrement')
  })
  it('should return the value passed as parameter if it is a number, or 0 if it is undefined', () => {
    const { result } = renderHook(() => useNumber(5))
    expect(result.current[0]).toBe(5)

    const { result: result2 } = renderHook(() => useNumber(0))
    expect(result2.current[0]).toBe(0)
  })

  it('should format the value passed as parameter to remove non-numeric characters if it is a string', () => {
    const { result } = renderHook(() => useNumber('5abc'))
    expect(result.current[0]).toBe(5)

    const { result: result2 } = renderHook(() => useNumber('abc'))
    expect(result2.current[0]).toBe(0)
  })
  describe('increment()', () => {
    it('does not go past max', () => {
      const { result } = renderHook(() => useNumber(1, { max: 3 }))
      act(() => {
        result.current[1].increment()
      })
      expect(result.current[0]).toEqual(2)
      act(() => {
        result.current[1].increment()
      })
      expect(result.current[0]).toEqual(3)
      act(() => {
        result.current[1].increment()
      })
      expect(result.current[0]).toEqual(3)
    })
    it('increases with step', () => {
      const { result } = renderHook(() => useNumber(1, { step: 5, max: 15 }))
      expect(result.current[0]).toEqual(0)
      act(() => {
        result.current[1].increment()
      })
      expect(result.current[0]).toEqual(5)
      act(() => {
        result.current[1].increment()
      })
      expect(result.current[0]).toEqual(10)
      act(() => {
        result.current[1].increment()
      })
      expect(result.current[0]).toEqual(15)
      act(() => {
        result.current[1].increment()
      })
      expect(result.current[0]).toEqual(15)
    })
  })
  describe('decrement()', () => {
    it('does not decrease past min', () => {
      const { result } = renderHook(() => useNumber(5, { min: 3 }))
      act(() => {
        result.current[1].decrement()
      })
      expect(result.current[0]).toEqual(4)
      act(() => {
        result.current[1].decrement()
      })
      expect(result.current[0]).toEqual(3)
      act(() => {
        result.current[1].decrement()
      })
      expect(result.current[0]).toEqual(3)
    })
    it('decrement with step', () => {
      const { result } = renderHook(() => useNumber(20, { step: 5, min: 5 }))
      act(() => {
        result.current[1].decrement()
      })
      expect(result.current[0]).toEqual(15)
      act(() => {
        result.current[1].decrement()
      })
      expect(result.current[0]).toEqual(10)
      act(() => {
        result.current[1].decrement()
      })
      expect(result.current[0]).toEqual(5)
      act(() => {
        result.current[1].decrement()
      })
      expect(result.current[0]).toEqual(5)
    })
  })
  describe('set()', () => {
    it('cannot set past max', () => {
      const { result } = renderHook(() => useNumber(1, { max: 3 }))
      act(() => {
        result.current[1].set(4)
      })
      expect(result.current[0]).toEqual(3)
      act(() => {
        result.current[1].set('4')
      })
      expect(result.current[0]).toEqual(3)
    })
    it('respects step', () => {
      const { result } = renderHook(() => useNumber(0, { step: 5 }))
      act(() => {
        result.current[1].set(6)
      })
      expect(result.current[0]).toEqual(5)
      act(() => {
        result.current[1].set(9)
      })
      expect(result.current[0]).toEqual(10)
      act(() => {
        result.current[1].set('11')
      })
      expect(result.current[0]).toEqual(10)
    })
    it('cannot set below min', () => {
      const { result } = renderHook(() => useNumber(6, { min: 5 }))
      act(() => {
        result.current[1].set(4)
      })
      expect(result.current[0]).toEqual(5)
      act(() => {
        result.current[1].set(-4)
      })
      expect(result.current[0]).toEqual(5)
    })

    it('should update the number value and return it when using the set function', () => {
      const { result } = renderHook(() => useNumber('5abc'))
      expect(result.current[0]).toBe(5)

      const functions = result.current[1]
      act(() => {
        const updatedNumber = functions.set(10)
        expect(updatedNumber).toBe(10)
      })

      expect(result.current[0]).toBe(10)
    })
  })
})
