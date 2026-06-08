import type { SectionRenderMode, LinkSection } from '@domain/configs'
import { LinkDataWrapper } from './LinkDataWrapper'

import { HomeSectionWrapper } from '../home-section-wrapper'
import type { DomainUI } from '@spacedock/manifest'

export interface AppLinkSectionProps {
  section: LinkSection | null
  dynamic_section_data?: LinkSection['dynamic_section_data']
  attachments?: DomainUI.Attachment[]
  renderMode?: SectionRenderMode
}

export const AppLinkSection = ({
  section,
  dynamic_section_data,
  attachments,
  renderMode = 'prod',
}: AppLinkSectionProps) => {
  if (!section) {
    return null
  }

  // No data layer needed - this is a simple link component
  // Mock, prod, and error modes all render the same
  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 3,
      }}
      attachments={attachments}
      padding={section.metadata.padding ?? 'sm'}
    >
      <LinkDataWrapper
        sectionData={section?.section_data}
        metadata={section?.metadata}
        dynamic_section_data={dynamic_section_data}
        attachments={attachments}
        renderMode={renderMode}
      />
    </HomeSectionWrapper>
  )
}
