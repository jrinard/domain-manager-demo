import { renderHook } from '@testing-library/react'

import { TEAMS } from './useTeamsByID.test'
import { useTeamRelationshipsMap } from './useTeamRelationshipsMap'

describe('useTeamRelationshipsMap', () => {
  it('should return a Relationships Map from a List of 3 Teams', () => {
    const { result } = renderHook(() => useTeamRelationshipsMap(TEAMS))

    expect(result.current.childrenIDsByParentID?.[1]).toHaveLength(1)
    expect(result.current.childrenIDsByParentID?.[3]).toBeUndefined()
    expect(result.current.parentIDByChildID?.[2]).toBe(1)
  })
})
