import React from 'react'

import { DatePickerInputProps, DatePickerInput } from '@falcon/date-picker'

export type DateInputProps = Omit<DatePickerInputProps, 'date' | 'value'> & {
  value?: Date | string
}

/**
 * `DateInput` from @spacedock/falcon-ui isn't what you would expect.
 */
const DateInput = ({ value, dense, ...props }: DateInputProps) => {
  return (
    <DatePickerInput
      {...props}
      date={value}
      dense={dense === undefined ? true : dense}
    />
  )
}
DateInput.displayName = 'DateInput'

export { DateInput }
