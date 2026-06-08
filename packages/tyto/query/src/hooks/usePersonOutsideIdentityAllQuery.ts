import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PersonOutsideIdentityAll } from '@tyto/client'

export interface UsePersonOutsideIdentityAllQueryProps {
  personID: number
}

type ResponseProps = Awaited<
  ReturnType<typeof PersonOutsideIdentityAll.prototype.get>
>

type UseUsePersonOutsideIdentityAllQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const usePersonOutsideIdentityAllQuery = ({
  personID,
}: UsePersonOutsideIdentityAllQueryProps): UseUsePersonOutsideIdentityAllQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.PersonOutsideIdentityAll.endpoint,
    { personID },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !!personID,
      queryKey,
      queryFn: () =>
        tytoClient.PersonOutsideIdentityAll.get({
          personID,
        }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default usePersonOutsideIdentityAllQuery
