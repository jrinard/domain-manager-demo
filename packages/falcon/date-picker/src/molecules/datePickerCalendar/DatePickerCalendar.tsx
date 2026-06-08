import { Icon } from '@falcon/icons'
import { mergeClasses } from '@falcon/style'
import { TYTO_NULL_DATE } from '@spacedock/tardis'
import React from 'react'

import {
  DayPicker,
  PropsSingle,
  PropsBase,
  ClassNames as DayPickerClassNames,
  CustomComponents as DayPickerCustomComponents,
  Formatters,
} from 'react-day-picker'

const DEAFULT_CLASSNAMES = {
  root: '',
  months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
  month: 'flex flex-row justify-between flex-wrap max-w-[250px]',
  month_caption: 'inline-flex justify-center relative items-center h-9 mt-0',
  caption_label: 'hidden',
  dropdowns: 'flex gap-2',
  dropdown_root: '',
  months_dropdown: 'bg-inherit rounded',
  years_dropdown: 'bg-inherit rounded',
  dropdown: '',
  chevron: 'hidden',
  nav: 'absolute inset-0 flex justify-between items-center pointer-events-none',
  button_previous:
    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto mt-0.5',
  button_next:
    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto mt-0.5',
  month_grid: 'w-full border-collapse',
  weekdays: 'flex',
  weekday: 'w-9 font-body text-sm',
  week: 'flex w-full mt-2',
  day: 'w-9 h-9 text-center text-sm p-0 relative rounded hover:bg-bg-contrast-medium hover:text-site-fg',
  day_button:
    'font-body w-full h-full p-0 aria-selected:opacity-100 rounded-md',
  selected: 'bg-primary text-primary-fg hover:bg-primary',
  today: 'border border-muted',
  outside: 'opacity-50',
  disabled: 'opacity-50',
  range_middle: 'aria-selected:bg-accent',
  hidden: 'invisible',
}

const BA_CLASSNAMES = {
  root: '',
  months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
  month: 'flex flex-row justify-between flex-wrap max-w-[430px]',
  month_caption: 'flex justify-center pt-1 relative items-center mb-3 h-9',
  caption_label: 'font-bold text-sm',
  dropdowns: 'flex gap-2',
  dropdown_root: '',
  months_dropdown: 'bg-inherit rounded',
  years_dropdown: 'bg-inherit rounded',
  dropdown: '',
  chevron: 'hidden',
  nav: 'absolute inset-0 flex justify-between items-center pointer-events-none',
  button_previous:
    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto',
  button_next:
    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto',
  month_grid: 'w-full border-collapse',
  weekdays: 'flex gap-3 mb-4',
  weekday: 'w-9 font-body text-sm',
  week: 'flex gap-3 w-full mt-3',
  day: 'w-9 h-9 text-center text-sm p-0 relative',
  day_button:
    'font-body w-full h-full p-0 aria-selected:opacity-100 rounded-full',
  selected: 'bg-rose-600/30 rounded-full',
  today: 'bg-accent aria-selected:bg-accent',
  outside: '!text-pink-100/30',
  disabled: 'text-pink-100/60',
  range_middle: 'aria-selected:bg-accent',
  hidden: 'invisible',
}

const DROPDOWN_END_MONTH = (() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 5, 11, 31)
  return date
})()

export type DatePickerCalendarProps = Omit<
  PropsSingle,
  'mode' | 'onSelect' | 'showOutsideDays'
> &
  PropsBase & {
    className?: string
    classNames?: Partial<DayPickerClassNames>
    components?: Partial<DayPickerCustomComponents>
    formatters?: Partial<Formatters>
    onSelect?: (newDate: Date | undefined) => void
    version?: 'default' | '10xba'
    disableSelection?: boolean
  }

const DatePickerCalendar = ({
  className,
  classNames,
  version = 'default',
  captionLayout = 'dropdown',
  components,
  formatters,
  disableSelection,
  ...props
}: DatePickerCalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    props.selected ? props.selected : new Date(),
  )
  const [monthShowing, setMonthShowing] = React.useState<Date | undefined>(date)

  const getVersionClassNames = () => {
    switch (version) {
      case '10xba':
        return BA_CLASSNAMES
      case 'default':
      default:
        return DEAFULT_CLASSNAMES
    }
  }

  React.useEffect(() => {
    if (props.selected) {
      if (props.selected instanceof Date) {
        setDate(new Date(props.selected))
      }

      if (
        TYTO_NULL_DATE === new Date(props.selected || Date.now()).toISOString()
      ) {
        setMonthShowing(new Date())
      }
    }
  }, [props.selected])

  const defaultFormatters: Partial<Formatters> = {
    formatMonthDropdown: (month) => {
      return month.toLocaleString('en-US', { month: 'short' })
    },
    formatYearDropdown: (date) => {
      return date.getFullYear().toString()
    },
  }

  return (
    <DayPicker
      {...props}
      selected={date}
      mode="single"
      captionLayout={captionLayout}
      navLayout="around"
      endMonth={DROPDOWN_END_MONTH}
      onSelect={(newDate) => {
        if (disableSelection) {
          return
        }
        setDate(newDate)
        if (props.onSelect) {
          props.onSelect(newDate)
          setMonthShowing(newDate)
        }
      }}
      onMonthChange={(newMonth) => {
        setMonthShowing(newMonth)
      }}
      month={monthShowing}
      showOutsideDays
      className={mergeClasses(className)}
      classNames={{
        ...getVersionClassNames(),
        ...classNames,
      }}
      formatters={{
        ...defaultFormatters,
        ...formatters,
      }}
      components={{
        Chevron: (props) => (
          <Icon
            icon={
              props.orientation === 'left' ? 'chevron-left' : 'chevron-right'
            }
            size="2xl"
          />
        ),
        Nav: (props) => <div>{props.children}</div>,
        // PreviousMonthButton: ({ ...props }) => (
        //   <Icon icon="chevron-left" size="2xl" />
        // ),
        // NextMonthButton: ({ ...props }) => (
        //   <Icon icon="chevron-right" size="2xl" />
        // ),
        ...components,
      }}
    />
  )
}
DatePickerCalendar.displayName = 'DatePickerCalendar'

export { DatePickerCalendar }
