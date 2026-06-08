import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, TeamAdmin } from '@tyto/client'

export interface UseTeamAdminQueryProps {
  teamID: number
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof TeamAdmin.prototype.get>>

type UseUseTeamAdminQueryQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

const EMPTY_ADMIN_RESPONSE = {
  admin: { adminDetail: undefined, permissions: [] },
} as unknown as ResponseProps

export const useTeamAdminQuery = ({
  teamID,
  disabled,
}: UseTeamAdminQueryProps): UseUseTeamAdminQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.TeamAdmin.endpoint, { teamID }]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () =>
        tytoClient.TeamAdmin.get({ teamID }).catch(
          (err: Error & { response?: { status?: number } }) => {
            if (err?.response?.status === 403) {
              return EMPTY_ADMIN_RESPONSE
            }
            throw err
          },
        ),
      retry: (failureCount, error: Error & { response?: { status?: number } }) => {
        if (failureCount > 2) {
          return false
        }
        return error?.response?.status !== 403
      },
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useTeamAdminQuery
