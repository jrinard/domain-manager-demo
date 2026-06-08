import { useMemo } from 'react'
import { keyBy } from 'lodash'

import type { TeamTreeProps } from './useFilteredTeamTreeData'

export function useTeamsByID(teams: TeamTreeProps['teams']) {
  return useMemo(() => keyBy(teams, 'teamID'), [teams])
}
