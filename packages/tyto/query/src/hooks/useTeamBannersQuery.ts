import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, TeamBanners } from '@tyto/client'

export interface UseTeamBannersQueryProps {
  teamID: number
}

export const useTeamBannersQuery = ({
  teamID,
}: UseTeamBannersQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof TeamBanners.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof TeamBanners.prototype.get>[0] = {
    functionName: 'Team Membership',
    teamID,
    operation: 'ocVIEW',
  }

  return useQuery<Awaited<ReturnType<typeof TeamBanners.prototype.get>>, Error>(
    {
      queryKey: [tytoClient.TeamBanners.endpoint, params],
      queryFn: () => tytoClient.TeamBanners.get({ ...params }),
    }
  )
}

export default useTeamBannersQuery
