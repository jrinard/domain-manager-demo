import type { HomeSection } from '@domain/configs'
import { useMatchingCourseIDsFromCatalog } from '../../hooks/useMatchingCourseIDsFromCatalog'
import { TrainingProgress } from './TrainingProgress'

import type { ActivityTableSectionData } from '@domain/schemas'

export const CategoryTrainingProgress = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ActivityTableSectionData>
  sectionData: ActivityTableSectionData
  dynamic_section_data?: Partial<ActivityTableSectionData>
}) => {
  const catalogQuery = useMatchingCourseIDsFromCatalog({
    domainIDFilters: sectionData.domainIDFilters,
    teamIDFilters: sectionData.teamIDFilters,
    categoryNameMatch: sectionData.categoryNameMatch,
    categoryNameNotMatch: sectionData.categoryNameNotMatch,
  })

  return (
    <TrainingProgress
      section={section}
      sectionData={sectionData}
      dynamic_section_data={{
        ...dynamic_section_data,
        curriculumIDs: catalogQuery.curriculumsData,
      }}
    />
  )
}
