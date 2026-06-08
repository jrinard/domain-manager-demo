import { useParams } from 'react-router-dom'

export function useTeamIDFromURL() {
  const { teamID: unsafeTeamID } = useParams()

  const parsedTeamID = Number(unsafeTeamID)

  return !Number.isNaN(parsedTeamID) ? parsedTeamID : undefined
}

export default useTeamIDFromURL
