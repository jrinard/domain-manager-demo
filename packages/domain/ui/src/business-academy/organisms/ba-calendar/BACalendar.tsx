import React from 'react'

import { DatePickerCalendar } from '@falcon/date-picker'
import { BACalendarWeekdays } from '../ba-calendar-weekdays/BACalendarWeekdays'
import { SkeletonSquare, SkeletonText } from '@spacedock/falcon-ui'

export interface BACalendarProps {
  isLoading?: boolean
  onDateSelect: (date: Date | undefined) => void
  selected?: Date
  disableSelection?: boolean
}

const BACalendar = ({
  isLoading,
  onDateSelect,
  selected,
  disableSelection,
  ...props
}: BACalendarProps) => {
  const [startMonth] = React.useState(new Date())
  const [endMonth] = React.useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() + 2)

    return d
  })

  if (isLoading) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <SkeletonText className="w-full" />
        <SkeletonSquare className="h-72 w-full" />
      </div>
    )
  }

  return (
    <DatePickerCalendar
      startMonth={startMonth}
      endMonth={endMonth}
      disableSelection={disableSelection}
      selected={selected}
      onSelect={onDateSelect}
      version="10xba"
      captionLayout="label"
      disabled={{ before: new Date() }}
      modifiersClassNames={{ daysWithEvents: 'font-bold' }}
      components={{
        Weekdays: () => <BACalendarWeekdays />,
      }}
    />
  )
}

BACalendar.displayName = 'BACalendar'

export { BACalendar }
