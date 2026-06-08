import { renderHook } from '@testing-library/react'

import { PeopleAdvancedSearchEndpointResponses } from '@tyto/lore'

import { useFilteredPeople } from './useFilteredPeople'

const TEST_DATA = PeopleAdvancedSearchEndpointResponses.success().ret

describe('useFilteredPeople', () => {
  it('should return People Matching a Search Term', () => {
    const { result } = renderHook(() =>
      useFilteredPeople({
        peopleData: TEST_DATA,
        searchTerm: 'Scott',
        teamIDsBelow: [],
        personMembershipsMap: { teamIDsByUserID: {}, userIDsByTeamID: {} },
      }),
    )

    expect(
      result.current.find((item) => item.givenName === 'Scott'),
    ).toBeTruthy()
  })

  it('should not return some whose name does not Match a Search Term', () => {
    const { result } = renderHook(() =>
      useFilteredPeople({
        peopleData: TEST_DATA,
        searchTerm: 'Zac',
        teamIDsBelow: [],
        personMembershipsMap: { teamIDsByUserID: {}, userIDsByTeamID: {} },
      }),
    )

    expect(result.current.findIndex((item) => item.givenName === 'Scott')).toBe(
      -1,
    )
  })

  it('should return No People Matching an obtuse Search Term', () => {
    const { result } = renderHook(() =>
      useFilteredPeople({
        peopleData: TEST_DATA,
        searchTerm: 'd36872dfgv637298gr98372',
        teamIDsBelow: [],
        personMembershipsMap: { teamIDsByUserID: {}, userIDsByTeamID: {} },
      }),
    )

    expect(result.current).toHaveLength(0)
  })

  it('should return Not Filter Anyone when given an Empty Search Term', () => {
    const { result } = renderHook(() =>
      useFilteredPeople({
        peopleData: TEST_DATA,
        searchTerm: '',
        teamIDsBelow: [],
        personMembershipsMap: { teamIDsByUserID: {}, userIDsByTeamID: {} },
      }),
    )

    expect(result.current.length).toBe(TEST_DATA.people.length)
  })
})
