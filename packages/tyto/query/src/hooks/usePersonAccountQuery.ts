import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PersonAccount } from '@tyto/client'

export interface UsePersonAccountQueryProps {
  personID: number
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof PersonAccount.prototype.get>>

type UseUsePersonAccountQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const usePersonAccountQuery = ({
  personID,
  disabled,
}: UsePersonAccountQueryProps): UseUsePersonAccountQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.PersonAccount.endpoint, { personID }]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.PersonAccount.get({ personID }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default usePersonAccountQuery
