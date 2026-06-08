import type { HomeSection } from '@domain/configs'
import { LessonActivity } from './LessonActivity'

import type { ActivityTableSectionData } from '@domain/schemas'

export const CatalogLessonActivity = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ActivityTableSectionData>
  sectionData: ActivityTableSectionData
  dynamic_section_data?: Partial<ActivityTableSectionData>
}) => {
  return (
    <LessonActivity
      section={section}
      sectionData={sectionData}
      dynamic_section_data={dynamic_section_data}
    />
  )
}
