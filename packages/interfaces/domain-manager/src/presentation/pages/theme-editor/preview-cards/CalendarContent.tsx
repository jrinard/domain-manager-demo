import { useState } from 'react'
import { DatePickerCalendar } from '@falcon/date-picker'

const CalendarContent = () => {
  const [date, updateDate] = useState(() => {
    const futureDate = new Date()

    futureDate.setDate(futureDate.getDate() + 5)

    return futureDate
  })

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <DatePickerCalendar
          selected={date}
          onSelect={(date) => {
            updateDate(date ?? new Date())
          }}
        />
      </div>
    </section>
  )
}

export default CalendarContent
