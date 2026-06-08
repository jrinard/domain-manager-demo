import { describe, expect, it, vi } from 'vitest'
import { SetExtended } from './SetExtended'

describe('SetExtended', () => {
  describe('replaceAll()', () => {
    it('replaces all existing values with new and triggers only one onChange', () => {
      const onChange = vi.fn()
      const result = new SetExtended<number>([5, 6], { onChange })
      expect(onChange).not.toHaveBeenCalled()
      result.replaceAll([1, 2, 3])
      expect(result.toArray()).toEqual([1, 2, 3])
      expect(onChange).toHaveBeenCalledOnce()
    })
  })
  describe('add()', () => {
    it('adds to list and triggers expected onChange', () => {
      const onChange = vi.fn()
      const result = new SetExtended<number>([1], { onChange })
      expect(onChange).not.toHaveBeenCalled()
      result.add(2)
      result.add(3)
      expect(result.toArray()).toEqual([1, 2, 3])
      expect(onChange).toHaveBeenCalledTimes(2)
    })
  })
  describe('toggle()', () => {
    it('toggle an item being in the set and triggers only one onChange', () => {
      const onChange = vi.fn()
      const result = new SetExtended<string>(['a'], { onChange })
      expect(onChange).not.toHaveBeenCalled()
      result.toggle('b')
      expect(result.has('a')).toEqual(true)
      expect(result.has('b')).toEqual(true)
      result.toggle('a')
      expect(result.has('a')).toEqual(false)
      result.toggle('a')
      expect(result.has('a')).toEqual(true)
      expect(onChange).toHaveBeenCalledTimes(3)
    })
  })
})
