import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, TeamDefaultEnrollmentsTeam } from '@tyto/client'

export interface UseTeamDefaultEnrollmentsTeamQueryProps {
  teamID: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof TeamDefaultEnrollmentsTeam.prototype.get>
>

type UseUseTeamDefaultEnrollmentsTeamQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useTeamDefaultEnrollmentsTeamQuery = ({
  teamID,
  disabled,
}: UseTeamDefaultEnrollmentsTeamQueryProps): UseUseTeamDefaultEnrollmentsTeamQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.TeamDefaultEnrollmentsTeam.endpoint,
    { teamID },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.TeamDefaultEnrollmentsTeam.get({ teamID }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useTeamDefaultEnrollmentsTeamQuery
