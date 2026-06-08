import { useTeamAdminQuery } from '@tyto/query'

export function useTeamAdminPermissions(teamID: number) {
  const team = useTeamAdminQuery({ teamID: teamID ?? 0 })

  return {
    admin: team.data?.admin,
  }
}

export default useTeamAdminPermissions
