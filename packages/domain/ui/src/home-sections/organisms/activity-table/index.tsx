import { useMemo } from 'react'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type {
  SectionRenderMode,
  ActivityTableSection as ActivityTableSectionType,
} from '@domain/configs'
import type { ActivityTableSectionData } from '@domain/schemas'

import { LessonActivity } from './LessonActivity'
import { CategoryTrainingProgress } from './CategoryTrainingProgress'
import { CourseCompletionActivity } from './CourseCompletionActivity'
import { LearningActivity } from './LearningActivity'
import { TrainingProgress } from './TrainingProgress'

export interface ActivityTableSectionProps {
  section: ActivityTableSectionType | null
  dynamic_section_data?: Partial<ActivityTableSectionData>
  renderMode?: SectionRenderMode
}

export const ActivityTableSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: ActivityTableSectionProps) => {
  const mergedSection = useMemo((): ActivityTableSectionType | null => {
    if (!section) return null

    if (!dynamic_section_data) {
      return section
    }

    return {
      ...section,
      dynamic_section_data,
    } as ActivityTableSectionType
  }, [section, dynamic_section_data])

  const sectionData: ActivityTableSectionData = mergedSection
    ? mergedSection.section_data
    : { sub_type: 'learning-activity', daysCount: 30 }

  if (!mergedSection) {
    return null
  }

  // TODO: Implement mock data for activity tables
  // For now, render production version for all modes

  return (
    <HomeSectionWrapper
      section={mergedSection}
      fallbackLayoutPosition={{
        columnSpan: 6, // Wider than stats-count since it's a table
      }}
      padding={mergedSection.metadata.padding}
    >
      <ActivityTableContainerRouter
        section={mergedSection}
        sectionData={sectionData}
        dynamic_section_data={
          mergedSection.dynamic_section_data as
            | Partial<ActivityTableSectionData>
            | undefined
        }
        renderMode={renderMode}
      />
    </HomeSectionWrapper>
  )
}

function ActivityTableContainerRouter(props: {
  section: ActivityTableSectionType
  sectionData: ActivityTableSectionType['section_data']
  dynamic_section_data?: ActivityTableSectionType['dynamic_section_data']
  renderMode: SectionRenderMode
}) {
  switch (props.sectionData.sub_type) {
    case 'catalog-lesson-activity':
      return (
        <LessonActivity
          section={props.section ?? undefined}
          sectionData={props.sectionData}
          dynamic_section_data={props.dynamic_section_data}
        />
      )
    case 'category-training-progress':
      return (
        <CategoryTrainingProgress
          section={props.section ?? undefined}
          sectionData={props.sectionData}
          dynamic_section_data={props.dynamic_section_data}
        />
      )
    case 'course-completion-activity':
      return (
        <CourseCompletionActivity
          section={props.section ?? undefined}
          sectionData={props.sectionData}
          dynamic_section_data={props.dynamic_section_data}
        />
      )
    case 'learning-activity':
      return (
        <LearningActivity
          section={props.section ?? undefined}
          sectionData={props.sectionData}
          dynamic_section_data={props.dynamic_section_data}
        />
      )
    case 'training-progress':
      return (
        <TrainingProgress
          section={props.section ?? undefined}
          sectionData={props.sectionData}
          dynamic_section_data={props.dynamic_section_data}
        />
      )
    default:
      return null
  }
}
