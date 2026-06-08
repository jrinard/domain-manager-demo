import { set } from 'lodash'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, PeopleAdvancedSearch } from '@tyto/client'
import { isDeactivated } from '@spacedock/tardis'

export type UsePeopleAdvancedSearchQueryProps = Parameters<
  typeof PeopleAdvancedSearch.prototype.get
>[0] & {
  isEnabled?: boolean
}

export const usePeopleAdvancedSearchQuery = ({
  isEnabled = true,
  ...props
}: UsePeopleAdvancedSearchQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof PeopleAdvancedSearch.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  return useQuery<
    Awaited<ReturnType<typeof PeopleAdvancedSearch.prototype.get>>,
    Error
  >({
    enabled: isEnabled && props.teamIDs !== '0',
    queryKey: [tytoClient.PeopleAdvancedSearch.endpoint, { ...props }],
    queryFn: async () => {
      const resp = await tytoClient.PeopleAdvancedSearch.post({ ...props })

      if (resp?.ret?.people?.length) {
        resp.ret.people = resp.ret.people.map((person) => {
          set(
            person,
            '_LOCAL_isDeactivated',
            isDeactivated(person.outsideTerminateDate),
          )

          return person
        })
      }

      return resp
    },
  })
}

export default usePeopleAdvancedSearchQuery
