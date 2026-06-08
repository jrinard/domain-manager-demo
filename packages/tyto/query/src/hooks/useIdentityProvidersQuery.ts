import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, IdentityProviders } from '@tyto/client'

type Args = Parameters<IdentityProviders['get']>[0]

export type UseIdentityProvidersQueryProps = Args

type ResponseProps = Awaited<ReturnType<typeof IdentityProviders.prototype.get>>

type UseUseIdentityProvidersQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useIdentityProvidersQuery = ({
  loginDomainID,
  onCourseURL,
  activeStatus,
  isAuthorizationProvider = false,
}: UseIdentityProvidersQueryProps): UseUseIdentityProvidersQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.IdentityProviders.endpoint,
    { loginDomainID, onCourseURL, activeStatus, isAuthorizationProvider },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !!loginDomainID || !!onCourseURL,
      queryKey,
      queryFn: () =>
        tytoClient.IdentityProviders.get({
          loginDomainID,
          onCourseURL,
          activeStatus,
          isAuthorizationProvider,
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

export default useIdentityProvidersQuery
