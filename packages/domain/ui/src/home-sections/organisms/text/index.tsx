import type { SectionRenderMode, HomeSection } from '@domain/configs'
import type { TextSectionData } from '@domain/schemas'
import { Text } from './Text'

export interface TextSectionProps {
  section: HomeSection<TextSectionData> | null
  renderMode?: SectionRenderMode
}

export const TextSection = ({
  section,
  renderMode = 'prod',
}: TextSectionProps) => {
  if (!section) return null

  const data: TextSectionData = {
    content: section.section_data.content,
  }

  return <Text section={section} sectionData={data} />
}

export const TextMockData = ({
  section,
  sectionData,
}: {
  section?: HomeSection<TextSectionData>
  sectionData?: Partial<TextSectionData>
}) => {
  const defaults: TextSectionData = {
    content:
      '# Welcome\n\nCustomize this section with markdown to create headings, paragraphs, links to highlight important information.',
  }

  const effective: TextSectionData = {
    ...defaults,
    ...(section?.section_data || {}),
    ...(sectionData || {}),
  }

  return <Text section={section as any} sectionData={effective} />
}
