export function getTimeZoneAbbreviation(timeZone: string) {
  const options: { timeZone: string; timeZoneName: 'short' } = {
    timeZone,
    timeZoneName: 'short',
  }

  const formatter = new Intl.DateTimeFormat([], options)

  const formattedDate = formatter.formatToParts(new Date())

  const timeZonePart = formattedDate.find(
    (part) => part.type === 'timeZoneName',
  )

  return timeZonePart ? timeZonePart.value : undefined
}
