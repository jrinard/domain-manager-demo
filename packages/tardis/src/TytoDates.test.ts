import { describe, expect } from 'vitest'
import { isTytoNullDate } from './TytoDates'

describe('TytoDates', () => {
  describe('isTytoNullDate', () => {
    it('is true for 1900-01-01T00:00:00+00:00', () => {
      expect(isTytoNullDate('1900-01-01T00:00:00+00:00')).toEqual(true)
    })
    it('is true for 1900-01-01T00:00:00.000Z', () => {
      expect(isTytoNullDate('1900-01-01T00:00:00.000Z')).toEqual(true)
    })

    it('is false', () => {
      expect(isTytoNullDate(new Date(Date.now()))).toEqual(false)
      expect(isTytoNullDate('1902-02-01T00:00:00.000Z')).toEqual(false)
    })
  })
})
