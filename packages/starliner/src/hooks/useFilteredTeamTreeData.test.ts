import { renderHook } from '@testing-library/react'

import { TytoData } from '@spacedock/manifest'
import { TeamsByFunctionEndpointResponses } from '@tyto/lore'

import { useFilteredTeamTreeData } from './useFilteredTeamTreeData'

const TEST_DATA = TeamsByFunctionEndpointResponses.success()
  .teams as TytoData.Team[]

describe('useFilteredTeamTreeData', () => {
  it('should return Return a Team matching a Search Term', () => {
    const { result } = renderHook(() =>
      useFilteredTeamTreeData({
        teams: TEST_DATA,
        searchTerm: 'Cardone Ventures',
      })
    )

    expect(result.current.matchingTeamIDs.has(1698652)).toBe(true)
  })

  it("should return Return a Team's Parent Team being in Path", () => {
    const { result } = renderHook(() =>
      useFilteredTeamTreeData({
        teams: TEST_DATA,
        searchTerm: 'Aero',
      })
    )

    expect(result.current?.pathTeamIDs.has(1698652)).toBe(true)
  })

  it('should return Return a Team *NOT* in Path and *NOT matching term to not be a path Team', () => {
    const { result } = renderHook(() =>
      useFilteredTeamTreeData({
        teams: TEST_DATA,
        searchTerm: 'A&A Insulation LLC',
      })
    )

    expect(result.current?.pathTeamIDs.has(2148944)).toBe(false)
  })
})
