import type { HomeSection } from '@domain/configs'
import type { ActiveEmployeesData } from '@domain/schemas'
import { ActiveUsers } from './ActiveUsers'
import { getActiveUsersMockData } from './mock-data'

export const ActiveUsersMockData = ({
  section,
  sectionData,
}: {
  section?: HomeSection<ActiveEmployeesData>
  sectionData: ActiveEmployeesData
}) => {
  const mockData = getActiveUsersMockData(sectionData)

  return (
    <ActiveUsers {...mockData} section={section} sectionData={sectionData} />
  )
}
