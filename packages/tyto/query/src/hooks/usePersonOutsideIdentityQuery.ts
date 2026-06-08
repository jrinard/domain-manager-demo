import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PersonOutsideIdentity } from '@tyto/client'

export interface UsePersonOutsideIdentityQueryProps {
  identityProviderGUID: string
  outsideID: string
}

type ResponseProps = Awaited<
  ReturnType<typeof PersonOutsideIdentity.prototype.get>
>

type UseUsePersonOutsideIdentityQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const usePersonOutsideIdentityQuery = ({
  identityProviderGUID,
  outsideID,
}: UsePersonOutsideIdentityQueryProps): UseUsePersonOutsideIdentityQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.PersonOutsideIdentity.endpoint,
    { identityProviderGUID, outsideID },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !!identityProviderGUID && !!outsideID,
      queryKey,
      queryFn: () =>
        tytoClient.PersonOutsideIdentity.get({
          identityProviderGUID,
          outsideID,
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

export default usePersonOutsideIdentityQuery
