import { renderHook } from '@testing-library/react'
import { TytoData } from '@spacedock/manifest'
import { TeamsByFunctionEndpointResponses } from '@tyto/lore'

import { useTopLevelTeams } from './useTopLevelTeams'

const TEST_DATA = TeamsByFunctionEndpointResponses.success()
  .teams as TytoData.Team[]

describe('useTopLevelTeams', () => {
  it('should return Returns top level Teams (team.level of 3 w/sample Data)', () => {
    const { result } = renderHook(() => useTopLevelTeams(TEST_DATA))

    expect(result.current[0]?.level).toBe(3)
  })

  it('should return No Items whose level is not 3', () => {
    const { result } = renderHook(() => useTopLevelTeams(TEST_DATA))

    expect(result.current.find((team) => team.level !== 3)).toBeFalsy()
  })
})
