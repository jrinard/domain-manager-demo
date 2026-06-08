import { describe, expect, it, vi } from 'vitest'
import { createMonthGridData } from './createMonthGridData'
import { DateTime } from 'luxon'

describe('createMonthGridData', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  it('returns leading previous month days', async () => {
    vi.setSystemTime(
      DateTime.fromFormat('October 10 2023', 'MMMM d yyyy').toJSDate()
    )

    const result = createMonthGridData(
      DateTime.fromFormat('09 10 2023', 'MM d yyyy')
    )
    expect(result[0][0].toLocaleString(DateTime.DATE_HUGE)).toEqual(
      'Sunday, August 27, 2023'
    )
  })
  it('returns 5 rows', async () => {
    vi.setSystemTime(
      DateTime.fromFormat('October 10 2023', 'MMMM d yyyy').toJSDate()
    )

    const result = createMonthGridData(
      DateTime.fromFormat('06 21 2023', 'MM d yyyy')
    )
    expect(result).toHaveLength(6)
  })
})
