import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Person, useTytoClient } from '@tyto/client'

type KnownFunctionName =
  | 'Person Demographics'
  | 'Person Address'
  | 'Person Admin'
  | 'Person Password'
  | 'People'
  | 'Page Manage Restore'
  | 'Person Team Membership'
  | 'LibraryFront Person'
  | 'Block Enroll'
  | 'Person Activity'
  | 'DevTasks'
  | 'Impersonate'
  | 'Page Manage'
  | 'Person TraitR3'
  | 'Notices Person'
  | 'Page TeamEditor'

export interface UsePersonPermissionsQueryProps {
  personID: number | undefined
  functionName?: KnownFunctionName
  enabled?: boolean
}

type PersonPermissionType = Awaited<
  ReturnType<typeof Person.prototype.get>
>['person']['permissions']

export const usePersonPermissionsQuery = ({
  personID,
  functionName,
  enabled,
}: UsePersonPermissionsQueryProps): UseQueryResult<
  PersonPermissionType,
  Error
> => {
  const tytoClient = useTytoClient()
  return useQuery<PersonPermissionType, Error>({
    queryKey: ['person-permissions', { personID }],
    queryFn: async () => {
      const result = await tytoClient.Person.get({ personID })
      const perms =
        functionName !== undefined
          ? result?.person.permissions?.filter(
              (permission) => permission.functionName === functionName,
            )
          : result.person.permissions

      return perms
    },
    enabled,
  })
}

export default usePersonPermissionsQuery
