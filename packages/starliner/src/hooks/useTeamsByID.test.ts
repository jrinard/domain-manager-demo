import { renderHook } from '@testing-library/react'

import { useTeamsByID } from './useTeamsByID'

import type { Team } from '../types'

export const TEAMS: Team[] = [
  {
    level: 1,
    iPath: '/team1',
    parentID: 0,
    teamType: 'ocTEAM',
    teamID: 1,
    name: 'Team 1',
    ocType: 'ocTEAM',
    activeStatus: 'ocENABLED',
  },
  {
    level: 2,
    iPath: '/team2',
    parentID: 1,
    teamType: 'ocTEAM',
    teamID: 2,
    name: 'Team 2',
    ocType: 'ocTEAM',
    activeStatus: 'ocENABLED',
  },
  {
    level: 3,
    iPath: '/team3',
    parentID: 2,
    teamType: 'ocTEAM',
    teamID: 3,
    name: 'Team 3',
    ocType: 'ocTEAM',
    activeStatus: 'ocENABLED',
  },
]

describe('useTeamsByID', () => {
  it('should return an object with team IDs as keys and team objects as values when given an array of teams', () => {
    const { result } = renderHook(() => useTeamsByID(TEAMS))

    expect(result.current[1]?.teamID).toBe(1)
    expect(result.current[2]?.teamID).toBe(2)
    expect(result.current[3]?.teamID).toBe(3)
    expect(result.current[4]?.teamID).toBeUndefined()
  })
})
