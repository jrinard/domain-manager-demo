import type { HomeSection } from '@domain/configs'
import type { LessonSectionData } from '@domain/schemas'
import { Lesson } from './Lesson'

export interface LessonMockDataProps {
  section?: HomeSection<LessonSectionData>
  sectionData: LessonSectionData
}

export const LessonMockData = ({
  section,
  sectionData,
}: LessonMockDataProps) => {
  return (
    <Lesson
      section={section}
      sectionData={sectionData}
      lessonTitle="Sample Lesson Title"
      thumbnailUrl="https://placehold.co/600x400/2a2a2a/ffffff?text=Lesson+Preview"
      isLoading={false}
    />
  )
}
