import { useMemo } from 'react'
import type { HomeSection } from '@domain/configs'
import { usePeopleAdvancedSearchQuery } from '@tyto/query'
import { isTytoNullDate } from '@spacedock/tardis'
import { useCurrentUser } from '@spacedock/chaincode'

import {
  createDateFilterObject,
  createDatePointObject,
  isBeforeDateFilter,
} from './CourseCompletions'
import type { ActiveEmployeesData } from '@domain/schemas'
import { ActiveUsers } from './ActiveUsers'

export const ActiveUsersData = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ActiveEmployeesData>
  sectionData: ActiveEmployeesData
  dynamic_section_data?: Partial<ActiveEmployeesData>
}) => {
  const currentUser = useCurrentUser()

  // 3-level priority: URL → config teamID → user's primary team
  const effectiveTeamID =
    dynamic_section_data?.teamID ?? // Priority 1: from URL/page (Analytics Dashboard)
    sectionData.teamID ?? // Priority 2: from config (specific team chosen in builder)
    currentUser?.teamRootID // Priority 3: user's own primary team

  const peopleAdvancedSearchQuery = usePeopleAdvancedSearchQuery({
    teamPath: effectiveTeamID ? `%,${effectiveTeamID},%` : '',
  })

  const activeUsersCount = useMemo(() => {
    if (!peopleAdvancedSearchQuery.data?.ret?.people?.length) {
      return 0
    }

    const dateFilter = createDateFilterObject({
      daysCount: dynamic_section_data?.daysCount ?? sectionData.daysCount ?? 30,
    })

    return (
      peopleAdvancedSearchQuery.data.ret.people.filter((person) => {
        if (isTytoNullDate(person.lastActivity)) {
          return false
        }

        if (
          isBeforeDateFilter({
            point: createDatePointObject({ date: person.lastActivity }),
            dateFilter,
          })
        ) {
          return false
        }

        return true
      }).length ?? 0
    )
  }, [
    peopleAdvancedSearchQuery.data?.ret?.people,
    dynamic_section_data?.daysCount,
    sectionData.daysCount,
  ])

  const totalEmployees =
    peopleAdvancedSearchQuery?.data?.ret?.people?.length ?? 0

  return (
    <ActiveUsers
      isLoading={peopleAdvancedSearchQuery.isLoading}
      value={activeUsersCount}
      subtitle={`${totalEmployees} Total Employees`}
      section={section}
      sectionData={sectionData}
    />
  )
}
