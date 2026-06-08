import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  useTytoClient,
  CatalogCurriculumPublicationEnhancedPermissionsPerson as EnhancedPermissionsPerson,
} from '@tyto/client'

export interface UseCatalogCurriculumPublicationEnhancedPermissionsPersonQueryProps {
  memberID: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof EnhancedPermissionsPerson.prototype.get>
>

type UseCatalogCurriculumPublicationEnhancedPermissionsPersonQueryResult =
  UseQueryResult<ResponseProps, Error> & {
    queryKey: QueryKey
    invalidate: () => Promise<void>
  }

export const useCatalogCurriculumPublicationEnhancedPermissionsPersonQuery = ({
  memberID,
  disabled,
  ...props
}: UseCatalogCurriculumPublicationEnhancedPermissionsPersonQueryProps): UseCatalogCurriculumPublicationEnhancedPermissionsPersonQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const queryKey: QueryKey = [
    tytoClient.CatalogCurriculumPublicationEnhancedPermissionsPerson.endpoint,
    { memberID, ...props },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () =>
        tytoClient.CatalogCurriculumPublicationEnhancedPermissionsPerson.get({
          memberID,
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

export default useCatalogCurriculumPublicationEnhancedPermissionsPersonQuery
