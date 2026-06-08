import { TYTO_NULL_DATE } from '@spacedock/tardis'
import React from 'react'
import { onChangeDate } from './utils'
import { Input, InputProps } from '@falcon/input'
import { format } from 'date-fns'

export interface DateInputProps extends InputProps {
  date?: Date | string
  onDateChange?: (newDate: Date | string) => void
}

/**
 * @deprecated Please use `import { DateInput } from '@falcon/inputs' instead
 * @note This component was removed of most business logic as it is only used in the DatePickerInput component which had redundant logic
 * cause errors of dates changes between multiple conversions enforcing local Timezone via `new Date(...)`
 */
const DateInput = ({ date, onDateChange, ...props }: DateInputProps) => {
  const asDateString = React.useMemo(() => {
    const parsed = onChangeDate(date?.toString() || '', date?.toString() || '')
    const d = parsed.date ? parsed.date : parsed.dateString

    if (typeof d === 'string') {
      return d
    } else if (Number.isNaN(+d)) {
      return date?.toString() ?? ''
    }

    return format(d, 'MM/dd/yyyy')
  }, [date])

  return (
    <Input
      {...props}
      value={
        !asDateString ||
        date === TYTO_NULL_DATE ||
        asDateString === TYTO_NULL_DATE
          ? ''
          : asDateString
      }
      onChange={(e) => {
        if (e.target.value === '') {
          onDateChange?.(TYTO_NULL_DATE)
        } else if (e.target.valueAsDate === null) {
          onDateChange?.(e.target.value)
        } else {
          onDateChange?.(e.target.valueAsDate ?? TYTO_NULL_DATE)
        }
      }}
    />
  )
}
DateInput.displayName = 'DateInput'

export { DateInput }
