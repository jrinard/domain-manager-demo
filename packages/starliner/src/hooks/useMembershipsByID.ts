import { useMemo } from 'react'

import type { PeopleData } from '../types'

type MembershipsKey = `${number}::${number}`
type KeyedMemberships = Record<
  MembershipsKey,
  PeopleData['memberships'][number]
>

export function useMembershipsByID(peopleData?: PeopleData): KeyedMemberships {
  const { memberships } = peopleData ?? {}

  return useMemo(() => {
    const membershipsByID: KeyedMemberships = {}

    if (!memberships?.length) {
      return membershipsByID
    }

    memberships.forEach((membership) => {
      const { memberID, teamID } = membership

      if (typeof memberID !== 'number' || !teamID) return

      membershipsByID[getMembershipKeyFromMembership(membership)] = membership
    })

    return membershipsByID
  }, [memberships])
}

export function getMembershipKeyFromMembership(
  membership: PeopleData['memberships'][number],
): MembershipsKey {
  const { memberID, teamID } = membership

  return getMembershipKey(memberID, teamID)
}

export function getMembershipKey(
  userID: number,
  teamID: number,
): MembershipsKey {
  return `${userID}::${teamID}`
}
