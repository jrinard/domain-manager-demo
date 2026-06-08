import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  useTytoClient,
  CatalogCurriculumPublicationEnhancedPermissions as EnhancedPermissions,
} from '@tyto/client'

export interface UseCatalogCurriculumPublicationEnhancedPermissionsQueryProps {
  catalogID: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof EnhancedPermissions.prototype.get>
>

type UseCatalogCurriculumPublicationEnhancedPermissionsQueryResult =
  UseQueryResult<ResponseProps, Error> & {
    queryKey: QueryKey
    invalidate: () => Promise<void>
  }

export const useCatalogCurriculumPublicationEnhancedPermissionsQuery = ({
  catalogID,
  disabled,
  ...props
}: UseCatalogCurriculumPublicationEnhancedPermissionsQueryProps): UseCatalogCurriculumPublicationEnhancedPermissionsQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const queryKey: QueryKey = [
    tytoClient.CatalogCurriculumPublicationEnhancedPermissions.endpoint,
    { catalogID, ...props },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () =>
        tytoClient.CatalogCurriculumPublicationEnhancedPermissions.get({
          catalogID,
          ...props,
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

export default useCatalogCurriculumPublicationEnhancedPermissionsQuery
