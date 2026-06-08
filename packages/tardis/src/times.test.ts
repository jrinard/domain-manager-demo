import { Interval } from 'luxon'
import { describe, expect } from 'vitest'
import { createTimeOfDayIntervals } from './times'

describe('times', () => {
  describe('createTimeOfDayIntervals', () => {
    it('15 minutes from 12:00 AM to 11:45 PM', () => {
      const results: Map<Interval, string> = createTimeOfDayIntervals(15)
      const resultsAsArray = Array.from(results.entries())
      expect(resultsAsArray).toHaveLength(96)
      expect(resultsAsArray[0][1]).toEqual('12:00 AM')
      expect(resultsAsArray[1][1]).toEqual('12:15 AM')
    })
    // Returns a Map object with time intervals split by the given intervalMinutes.
    it('should return a Map object with time intervals split by the given intervalMinutes', () => {
      const results = createTimeOfDayIntervals(15)
      expect(results).toBeInstanceOf(Map)
      expect(results.size).toBeGreaterThan(0)
    })

    // The Map object should have the correct number of entries based on the start and end times.
    it('should return a Map object with the correct number of entries based on the start and end times', () => {
      const results = createTimeOfDayIntervals(15)
      expect(results.size).toBe(96)
    })

    // The first entry in the Map object should have the correct time based on the start time.
    it('should return a Map object with the first entry having the correct time based on the start time', () => {
      const results = createTimeOfDayIntervals(15)
      const firstEntry = Array.from(results.entries())[0]
      expect(firstEntry[1]).toEqual('12:00 AM')
    })

    // The last entry in the Map object should have the correct time based on the end time.
    it('should return a Map object with the last entry having the correct time based on the end time', () => {
      const results = createTimeOfDayIntervals(15)
      const lastEntry = Array.from(results.entries())[95]
      expect(lastEntry[1]).toEqual('11:45 PM')
    })

    // Returns an empty Map object if the start time is after the end time.
    it('should return an empty Map object if the start time is after the end time', () => {
      const results = createTimeOfDayIntervals(15, '12:00 PM', '11:00 AM')
      expect(results.size).toBe(0)
    })

    // Returns an empty Map object if the start time or end time is not in 'HH:mm' format.
    it('should return an empty Map object if the start time or end time is not in `HH:mm` format', () => {
      const results = createTimeOfDayIntervals(15, '12:00 PM', '24:00')
      expect(results.size).toBe(0)
    })

    // Returns an empty Map object if the intervalMinutes is less than or equal to 0.
    it('should return an empty Map object if the intervalMinutes is less than or equal to 0', () => {
      const results = createTimeOfDayIntervals(0)
      expect(results.size).toBe(0)
    })

    // Returns a Map object with a single entry if the start and end times are the same.
    it('should return a Map object with a no entries if the start and end times are the same', () => {
      const results = createTimeOfDayIntervals(15, '12:00 PM', '12:00 PM')
      expect(results.size).toBe(0)
    })
  })
})
