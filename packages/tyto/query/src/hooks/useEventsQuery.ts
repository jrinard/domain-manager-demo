import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Events, useTytoClient } from '@tyto/client'
import { DateTime } from 'luxon'

export type UseEventsQueryProps = Omit<
  Parameters<typeof Events.prototype.get>[0],
  'filterTimeUTC_max' | 'filterTimeUTC_min'
> & {
  range: 'month' | 'day' | 'week'
  of: DateTime
  timezone?: ''
}

export const useEventsQuery = (
  props: UseEventsQueryProps
): UseQueryResult<Awaited<ReturnType<typeof Events.prototype.get>>, Error> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof Events.prototype.get>[0] = {}
  if (props.range === 'month') {
    params.filterTimeUTC_max = props.of.endOf('month').toJSDate().toISOString()
    params.filterTimeUTC_min = props.of
      .startOf('month')
      .toJSDate()
      .toISOString()
  } else if (props.range === 'week') {
    params.filterTimeUTC_max = props.of.endOf('week').toJSDate().toISOString()
    params.filterTimeUTC_min = props.of.startOf('week').toJSDate().toISOString()
  } else if (props.range === 'day') {
    params.filterTimeUTC_max = props.of.endOf('day').toJSDate().toISOString()
    params.filterTimeUTC_min = props.of.startOf('day').toJSDate().toISOString()
  }

  return useQuery<Awaited<ReturnType<typeof Events.prototype.get>>, Error>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    queryKey: [tytoClient.Events.endpoint, params],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    queryFn: () => tytoClient.Events.get(params),
  })
}

export default useEventsQuery
