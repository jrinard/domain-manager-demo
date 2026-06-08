import type {
  SectionRenderMode,
  LessonSection as LessonSectionType,
} from '@domain/configs'
import { LessonDataComponent } from './LessonData'
import { LessonMockData } from './LessonMockData'
import { HomeSectionWrapper } from '../home-section-wrapper'
import type { DomainUI } from '@spacedock/manifest'

export interface LessonSectionProps {
  section: LessonSectionType | null
  dynamic_section_data?: LessonSectionType['dynamic_section_data']
  attachments?: DomainUI.Attachment[]
  renderMode?: SectionRenderMode
}

export const LessonSection = ({
  section,
  dynamic_section_data,
  attachments,
  renderMode = 'prod',
}: LessonSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: LessonSectionType['section_data'] = {
    ...section.section_data,
    ...dynamic_section_data,
  }

  if (renderMode === 'mock') {
    return (
      <HomeSectionWrapper
        section={section}
        fallbackLayoutPosition={{
          columnSpan: 3,
        }}
        attachments={attachments}
        padding={section.metadata.padding}
      >
        <LessonMockData section={section} sectionData={sectionData} />
      </HomeSectionWrapper>
    )
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 3,
      }}
      attachments={attachments}
      padding={section.metadata.padding}
    >
      <LessonDataComponent
        section={section}
        sectionData={sectionData}
        attachments={attachments}
      />
    </HomeSectionWrapper>
  )
}

// Re-export components for consumers
export { Lesson } from './Lesson'
export { LessonDataComponent } from './LessonData'
