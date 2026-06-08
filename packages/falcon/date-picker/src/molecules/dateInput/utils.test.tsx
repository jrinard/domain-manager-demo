import { expect, describe, it } from 'vitest'

import { onChangeDate } from './utils'

describe('DateInput', () => {
  describe('utils', () => {
    describe('onChangeDate', () => {
      it('should not return non-number characters', () => {
        const dateTest = onChangeDate('sdfgsdfgs', '3')
        expect(dateTest.dateString === '3').toBeTruthy()
      })

      it('should return a date', () => {
        const dateTest = onChangeDate('10/23/2023', '10/23/202')
        expect(dateTest.date).toEqual(new Date('2023-10-23T12:00:00.000Z'))
      })
    })
  })
})
