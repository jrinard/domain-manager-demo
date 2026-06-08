import { useMemo } from 'react'

import { usePersonMembershipsMap } from './usePersonMembershipsMap'

import type { PeopleData } from '../types'

interface Props {
  peopleData?: PeopleData
  searchTerm?: string
  personMembershipsMap: ReturnType<typeof usePersonMembershipsMap>
  teamIDsBelow: number[]
}

export function useFilteredPeople({
  peopleData,
  searchTerm,
  teamIDsBelow,
  personMembershipsMap,
}: Props) {
  return useMemo(() => {
    return getFilteredPeople({
      peopleData,
      searchTerm,
      personMembershipsMap,
      teamIDsBelow,
    })
  }, [personMembershipsMap, teamIDsBelow, peopleData, searchTerm])
}

function getFilteredPeople({
  peopleData,
  searchTerm,
  personMembershipsMap,
  teamIDsBelow,
}: Props) {
  if (!searchTerm || !peopleData?.people) {
    return peopleData?.people ?? []
  }

  const lowerCaseSearchTerm = searchTerm.toLocaleLowerCase()

  const teamIDs = new Set(teamIDsBelow)

  return peopleData.people.filter((person) => {
    const { givenName, familyName, email, userID } = person

    const userMembershipsTeamIDs =
      personMembershipsMap?.teamIDsByUserID?.[userID]

    if (teamIDs.size && userMembershipsTeamIDs?.length) {
      if (userMembershipsTeamIDs.every((teamID) => !teamIDs.has(teamID))) {
        return false
      }
    }

    return `${givenName.trim()} ${familyName.trim()} ${email || ''} ${userID || ''}`
      .toLocaleLowerCase()
      .includes(lowerCaseSearchTerm)
  })
}

export default useFilteredPeople
