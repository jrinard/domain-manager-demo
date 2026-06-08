/**
 * Maps API completeStatus values to user-friendly display strings.
 * Use this for consistent status display across all training-related UIs.
 */
export function getTrainingStatusLabel(completeStatus: string): string {
  if (completeStatus === 'ocCOMPLETE') return 'Completed'
  if (completeStatus === 'ocINPROGRESS') return 'In Progress'
  if (completeStatus === 'ocINCOMPLETE') return 'In Progress'
  return 'Not Started'
}

export function timeInMS({
  timeQuantity,
  timeType,
}: {
  timeQuantity: number
  timeType: 'ms' | 's' | 'min' | 'hours' | 'days' | 'tomorrow-morning'
}) {
  if (timeType === 'tomorrow-morning') {
    const rightNow = new Date()
    const minutesLeftInHour = 60 - rightNow.getMinutes()

    // TODO: const hourLeftInDay = 23 - rightNow.getHours()
    // TODO: determine const fiveAMInMins = 60 * 5
    // TODO: const minsTil5AmTomorrow = fiveAMInMins + hourLeftInDay * 60 + minutesLeftInHour

    return minutesLeftInHour * 60 * 1000
  }

  switch (timeType) {
    case 'days':
      return timeQuantity * 1000 * 60 * 60 * 24
    case 'hours':
      return timeQuantity * 1000 * 60 * 60
    case 'min':
      return timeQuantity * 1000 * 60
    case 's':
      return timeQuantity * 1000
    case 'ms':
    default:
      return timeQuantity
  }
}
