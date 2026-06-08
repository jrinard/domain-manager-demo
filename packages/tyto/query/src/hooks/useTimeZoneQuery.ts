import { TytoData } from '@spacedock/manifest'
import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, TimeZone } from '@tyto/client'

type EndpointArgs = Parameters<typeof TimeZone.prototype.get>[0]

export interface UseTimeZoneQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof TimeZone.prototype.get>>

type UseTimeZoneQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useTimeZoneQuery = ({
  disabled,
  ...args
}: UseTimeZoneQueryProps): UseTimeZoneQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = { ...args }
  const queryKey: QueryKey = [tytoClient.TimeZone.endpoint, params]

  const query = useQuery<ResponseProps, Error>({
    enabled: !disabled,
    queryKey,
    queryFn: async () => {
      const response = await tytoClient.TimeZone.get({ ...params })

      const today = new Date()

      // group time zones by nameGeneral
      const grouped: Record<string, TytoData.TimeZones.TimeZone[]> = {}
      response.timeZones?.forEach((tz: TytoData.TimeZones.TimeZone) => {
        if (!grouped[tz.nameGeneral]) grouped[tz.nameGeneral] = []
        grouped[tz.nameGeneral].push(tz)
      })

      // pick the active entry per location
      const activeZones: TytoData.TimeZones.TimeZone[] = Object.values(
        grouped,
      ).map((tzGroup) => {
        const active = tzGroup.find((tz) => {
          const startDate = new Date(tz.startDate)
          if (today < startDate) return false

          if (tz.observanceType === 'ocDAYLIGHT') {
            const localOffset = -today.getTimezoneOffset()
            return localOffset === tz.offSetFromMinutes
          }

          return (
            tz.observanceType === 'ocSTANDARD' ||
            tz.observanceType === 'ocCONSTANT'
          )
        })

        return active ?? tzGroup[0]
      })

      return {
        ...response,
        timeZones: activeZones,
      }
    },
  })

  return {
    ...query,
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({ queryKey })
    },
  }
}

export default useTimeZoneQuery
