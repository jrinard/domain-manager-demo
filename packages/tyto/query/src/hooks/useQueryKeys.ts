import { useTytoClient, TeamsByFunction } from '@tyto/client'

type TeamsByFunctionArgs = Parameters<typeof TeamsByFunction.prototype.get>[0]

export function useQueryKeys() {
  const tytoClient = useTytoClient()

  return {
    team: (teamID: number) => [
      tytoClient.Team.endpoint,
      {
        teamID,
      },
    ],
    teamsByFunction: (props: TeamsByFunctionArgs) => [
      tytoClient.TeamsByFunction.endpoint,
      props,
    ],
  }
}
