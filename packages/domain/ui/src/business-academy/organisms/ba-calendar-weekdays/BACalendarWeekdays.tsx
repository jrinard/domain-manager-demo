import React from 'react'

const BACalendarWeekdays = () => {
  return (
    <div className="mt-3 flex w-full flex-col gap-4">
      <div className="flex w-full gap-3">
        <div className="font-body w-9 rounded-md text-center text-sm font-bold">
          Sun
        </div>
        <div className="font-body w-9 rounded-md text-center text-sm font-bold">
          Mon
        </div>
        <div className="font-body w-9 rounded-md text-center text-sm font-bold">
          Tue
        </div>
        <div className="font-body w-9 rounded-md text-center text-sm font-bold">
          Wed
        </div>
        <div className="font-body w-9 rounded-md text-center text-sm font-bold">
          Thu
        </div>
        <div className="font-body w-9 rounded-md text-center text-sm font-bold">
          Fri
        </div>
        <div className="font-body w-9 rounded-md text-center text-sm font-bold">
          Sat
        </div>
      </div>
      <div className="h-px w-full bg-neutral-600/60" />
    </div>
  )
}
BACalendarWeekdays.displayName = 'BACalendarWeekdays'

export { BACalendarWeekdays }
