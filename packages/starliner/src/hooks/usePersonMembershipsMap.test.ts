import { renderHook } from '@testing-library/react'

import { PeopleAdvancedSearchEndpointResponses } from '@tyto/lore'

import { usePersonMembershipsMap } from './usePersonMembershipsMap'

const TEST_DATA = PeopleAdvancedSearchEndpointResponses.success().ret

describe('usePersonMembershipsMap', () => {
  it('should return a map of Realtionships between Users and Teams', () => {
    const { result } = renderHook(() =>
      usePersonMembershipsMap(TEST_DATA.memberships)
    )

    expect(result.current?.teamIDsByUserID[4650]?.length).toBeTruthy()
    expect(result.current?.userIDsByTeamID[501865]?.length).toBeTruthy()
  })
})
