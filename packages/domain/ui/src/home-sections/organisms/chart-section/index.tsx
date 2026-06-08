import { useMemo } from 'react'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type {
  SectionRenderMode,
  ChartSection as ChartSectionType,
} from '@domain/configs'
import type { ChartSectionData } from '@domain/schemas'
import { CHART_DEFAULT_COLUMN_SPAN } from '@domain/schemas'

import { CourseActivityGraph } from './CourseActivityGraph'
import { CourseCompletionsChart } from './CourseCompletionsChart'
import { StepsCompletionsChart } from './StepsCompletionsChart'

export interface ChartSectionProps {
  section: ChartSectionType | null
  dynamic_section_data?: ChartSectionType['dynamic_section_data']
  renderMode?: SectionRenderMode
}

export const ChartSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: ChartSectionProps) => {
  const mergedSection = useMemo((): ChartSectionType | null => {
    if (!section) return null

    if (!dynamic_section_data) {
      return section
    }

    return {
      ...section,
      dynamic_section_data,
    } as ChartSectionType
  }, [section, dynamic_section_data])

  const sectionData: ChartSectionData = mergedSection
    ? mergedSection.section_data
    : { sub_type: 'course-completions', daysCount: 30 }

  if (!mergedSection) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={mergedSection}
      fallbackLayoutPosition={{
        columnSpan: CHART_DEFAULT_COLUMN_SPAN,
      }}
      padding={mergedSection.metadata.padding}
    >
      <ChartSectionRouter
        section={mergedSection}
        sectionData={sectionData}
        dynamic_section_data={
          mergedSection.dynamic_section_data as
            | Partial<ChartSectionData>
            | undefined
        }
        renderMode={renderMode}
      />
    </HomeSectionWrapper>
  )
}

function ChartSectionRouter(props: {
  section: ChartSectionType
  sectionData: ChartSectionData
  dynamic_section_data?: Partial<ChartSectionData>
  renderMode: SectionRenderMode
}) {
  // For charts, mock mode would need extensive mock data
  // For now, we'll treat mock the same as prod
  // TODO: Add proper mock data for each chart type

  switch (props.sectionData.sub_type) {
    case 'course-activity': {
      return (
        <CourseActivityGraph
          section={props.section}
          sectionData={props.sectionData}
          dynamic_section_data={props.dynamic_section_data}
        />
      )
    }

    case 'course-completions': {
      return (
        <CourseCompletionsChart
          section={props.section}
          sectionData={props.sectionData}
          dynamic_section_data={props.dynamic_section_data}
        />
      )
    }

    case 'steps-completions': {
      return (
        <StepsCompletionsChart
          section={props.section}
          sectionData={props.sectionData}
          dynamic_section_data={props.dynamic_section_data}
        />
      )
    }

    default:
      return null
  }
}
