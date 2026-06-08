import { TYTO_NULL_DATE } from '@spacedock/tardis'
import React from 'react'
import { Popover, PopoverContent, PopoverAnchor } from '@spacedock/falcon-ui'
import { noop } from 'lodash'
import { format } from 'date-fns'
import { DateInput, DateInputProps } from '../dateInput/DateInput'
import { onChangeDate } from '../dateInput/utils'
import { DatePickerCalendar } from '../datePickerCalendar/DatePickerCalendar'
import { mergeClasses } from '@falcon/style'

export interface DatePickerInputProps
  extends Omit<DateInputProps, 'onDateChange'> {
  date?: Date | string
  onDateChange?: (newDate: Date) => void
  className?: string
}

const DatePickerInput = ({
  date,
  className,
  ...props
}: DatePickerInputProps) => {
  const [inputText, setInputText] = React.useState('')
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (date) {
      if (TYTO_NULL_DATE === new Date(date).toISOString()) {
        setInputText(TYTO_NULL_DATE)
      } else {
        const tempDate = toLocalDate(new Date(date))
        setInputText(format(tempDate, 'MM/dd/yyyy'))
      }
    } else {
      setInputText('')
    }
  }, [date])

  const isInvalidLocally = React.useMemo(() => {
    if (!date) {
      return false
    } else if (!inputText) {
      return date !== inputText
    }

    return (
      toLocalDate(new Date(inputText)).toISOString() !==
      toLocalDate(new Date(date || Date.now())).toISOString()
    )
  }, [inputText, date])

  return (
    <div className="relative flex">
      <DateInput
        {...props}
        trailingIcon="calendar-blank"
        onTrailingClick={() => {
          setOpen(true)
        }}
        onDateChange={(newDate) => {
          const results = onChangeDate(newDate.toString(), inputText)

          if (TYTO_NULL_DATE === newDate) {
            setInputText(TYTO_NULL_DATE)
          } else {
            setInputText(
              results.date
                ? format(toLocalDate(results.date), 'MM/dd/yyyy')
                : results.dateString,
            )

            if (results.date && props.onDateChange) {
              props.onDateChange(toLocalDate(results.date))
            }
          }
        }}
        date={inputText}
        className={mergeClasses(
          `min-w-60`,
          isInvalidLocally && 'border-error',
          className,
        )}
      />
      <Popover modal={false} open={open} onOpenChange={setOpen}>
        <PopoverAnchor className="absolute bottom-1 right-2/4" />
        <PopoverContent hideHeader onInteractOutside={noop}>
          <DatePickerCalendar
            className="p-3"
            selected={inputText ? new Date(inputText) : new Date()}
            onSelect={(newDate) => {
              if (newDate != null) {
                const localDate = toLocalDate(newDate)
                setInputText(format(localDate, 'MM/dd/yyyy'))
                if (props.onDateChange) {
                  props.onDateChange(localDate)
                }
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const toLocalDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

DatePickerInput.displayName = 'DatePickerInput'

export { DatePickerInput }
