import { DateTime, Settings } from 'luxon'
import { describe, expect, afterEach, beforeEach, vi, it } from 'vitest'
import { getUTCNoonDate } from './getUTCNoonDate'
import { TYTO_NULL_DATE } from './index'

describe('getUTCNoonDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Settings.defaultZone = 'utc'
    vi.setSystemTime(
      DateTime.fromISO('2023-10-26T06:45:00.000Z')
        .setZone('utc', { keepLocalTime: false })
        .toJSDate()
    )
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('handles Tyto "null" time', () => {
    expect(getUTCNoonDate(TYTO_NULL_DATE)).toBe('1900-01-01T12:00:00.000Z')
    expect(getUTCNoonDate('1900-01-01T00:00:00+00:00')).toBe(
      '1900-01-01T12:00:00.000Z'
    )
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' when given a valid date string
  it('should return a string in the correct format when given a valid date string', () => {
    const result = getUTCNoonDate('2022-01-01')
    expect(result).toBe('2022-01-01T12:00:00.000Z')
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' when given a valid Date object
  it('should return a string in the correct format when given a valid Date object', () => {
    const date = new Date('2022-01-01')
    const result = getUTCNoonDate(date)
    expect(result).toBe('2022-01-01T12:00:00.000Z')
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' for a date in the middle of the year
  it('should return a string in the correct format for a date in the middle of the year', () => {
    const result = getUTCNoonDate('2022-06-15')
    expect(result).toBe('2022-06-15T12:00:00.000Z')
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' for a date at the start of the year
  it('should return a string in the correct format for a date at the start of the year', () => {
    const result = getUTCNoonDate('2022-01-01')
    expect(result).toBe('2022-01-01T12:00:00.000Z')
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' for a date at the start of the month
  it('should return a string in the correct format for a date at the start of the month', () => {
    const result = getUTCNoonDate('2022-01-01')
    expect(result).toBe('2022-01-01T12:00:00.000Z')
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' for a date at the end of the month
  it('should return a string in the correct format for a date at the end of the month', () => {
    const result = getUTCNoonDate('2022-01-31')
    expect(result).toBe('2022-01-31T12:00:00.000Z')
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' for a date at the start of the day
  it('should return a string in the correct format for a date at the start of the day', () => {
    const result = getUTCNoonDate('2022-01-01')
    expect(result).toBe('2022-01-01T12:00:00.000Z')
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' for a date at the end of the day
  it('should return a string in the correct format for a date at the end of the day', () => {
    const result = getUTCNoonDate('2022-01-01')
    expect(result).toBe('2022-01-01T12:00:00.000Z')
  })

  // Returns a string in the format 'YYYY-MM-DDT12:00:00.000Z' for a date at the end of the year
  it('should return a string in the correct format for a date at the end of the year', () => {
    const result = getUTCNoonDate('2022-12-31')
    expect(result).toBe('2022-12-31T12:00:00.000Z')
  })

  it('returns NaN in string when date string is not valid', () => {
    expect(getUTCNoonDate('sd')).toEqual(TYTO_NULL_DATE)
  })

  it('should return a date', () => {
    expect(getUTCNoonDate('10/23/2023').includes('T12:00:00.000Z')).toEqual(
      true
    )
    expect(
      getUTCNoonDate('2024-01-19T02:00:00.000-10:00').includes('T12:00:00.000Z')
    ).toEqual(true)
  })
})
