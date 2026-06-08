import { useMemo } from 'react'

import { getTeamIDsUnderTargetTeamIDs } from '../helpers/team-ids'

export function useTeamIDsBelow(
  args: Parameters<typeof getTeamIDsUnderTargetTeamIDs>[0],
) {
  const ids = useMemo(() => {
    return getTeamIDsUnderTargetTeamIDs(args)
  }, [args.targetTeamIDs || null, args.teams || null, args.includeTargetTeams])

  return ids
}
