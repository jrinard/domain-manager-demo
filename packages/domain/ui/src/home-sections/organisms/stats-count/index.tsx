import { useMemo } from 'react'

import { HomeSectionWrapper } from '../home-section-wrapper/'
import type {
  HomeSection,
  SectionRenderMode,
  StatsCountSection as StatsCountSectionType,
} from '@domain/configs'
import type {
  StatsCountSectionData,
  ActiveEmployeesData,
  CoursesCompletedData,
  LessonCompletionsData,
} from '@domain/schemas'
import { STATS_COUNT_DEFAULT_COLUMN_SPAN } from '@domain/schemas'

import { ActiveUsersData } from './ActiveUsersData'
import { ActiveUsersMockData } from './ActiveUsersMockData'
import { CourseCompletions } from './CourseCompletions'
import { LessonsCompleted } from './LessonsCompleted'

export const StatsCountSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
  isPreview = false,
}: {
  section: StatsCountSectionType
  dynamic_section_data?: StatsCountSectionType['dynamic_section_data']
  renderMode?: SectionRenderMode
  isPreview?: boolean
}) => {
  const mergedSection = useMemo((): StatsCountSectionType => {
    if (!dynamic_section_data) {
      return section
    }

    return {
      ...section,
      dynamic_section_data,
    }
  }, [section, dynamic_section_data])

  // * This is to make TypeScript happy T_T
  const sectionTyped: StatsCountSectionType | null = typeNarrower(mergedSection)
    ? mergedSection
    : null

  const sectionData: StatsCountSectionData = sectionTyped
    ? sectionTyped.section_data
    : {
        sub_type: 'active-employees',
        daysCount: 30,
        iconColorScheme: 'blue',
      }

  // Use mock mode if in preview or explicitly set
  const effectiveRenderMode: SectionRenderMode = isPreview ? 'mock' : renderMode

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: STATS_COUNT_DEFAULT_COLUMN_SPAN,
      }}
      padding={section.metadata.padding}
    >
      {!sectionTyped ? null : (
        <StatsCountContainerRouter
          section={sectionTyped}
          sectionData={sectionData}
          dynamic_section_data={sectionTyped?.dynamic_section_data}
          renderMode={effectiveRenderMode}
        />
      )}
    </HomeSectionWrapper>
  )
}

function StatsCountContainerRouter(props: {
  section: StatsCountSectionType
  sectionData: StatsCountSectionType['section_data']
  dynamic_section_data?: StatsCountSectionType['dynamic_section_data']
  renderMode: SectionRenderMode
}) {
  switch (props.sectionData.sub_type) {
    case 'active-employees': {
      const activeSection = props.section as
        | HomeSection<ActiveEmployeesData>
        | null
        | undefined
      const activeSectionData = props.sectionData as ActiveEmployeesData
      const activeDynamicData = props.dynamic_section_data as
        | Partial<ActiveEmployeesData>
        | undefined

      if (props.renderMode === 'mock') {
        return (
          <ActiveUsersMockData
            section={activeSection ?? undefined}
            sectionData={activeSectionData}
          />
        )
      }
      return (
        <ActiveUsersData
          section={activeSection ?? undefined}
          sectionData={activeSectionData}
          dynamic_section_data={activeDynamicData}
        />
      )
    }
    case 'courses-completed': {
      const coursesSection = props.section as
        | HomeSection<CoursesCompletedData>
        | null
        | undefined
      const coursesSectionData = props.sectionData as CoursesCompletedData
      const coursesDynamicData = props.dynamic_section_data as
        | Partial<CoursesCompletedData>
        | undefined

      return (
        <CourseCompletions
          section={coursesSection ?? undefined}
          sectionData={coursesSectionData}
          dynamic_section_data={coursesDynamicData}
          isPreview={props.renderMode === 'mock'}
        />
      )
    }
    case 'lesson-completions': {
      const lessonsSection = props.section as
        | HomeSection<LessonCompletionsData>
        | null
        | undefined
      const lessonsSectionData = props.sectionData as LessonCompletionsData
      const lessonsDynamicData = props.dynamic_section_data as
        | Partial<LessonCompletionsData>
        | undefined

      return (
        <LessonsCompleted
          section={lessonsSection ?? undefined}
          sectionData={lessonsSectionData}
          dynamic_section_data={lessonsDynamicData}
          isPreview={props.renderMode === 'mock'}
        />
      )
    }
    default:
      return null
  }
}

function typeNarrower(section: HomeSection): section is StatsCountSectionType {
  return section.section_type === 'stats-count'
}
