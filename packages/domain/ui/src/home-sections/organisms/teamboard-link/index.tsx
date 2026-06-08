import type { HomeSection, SectionRenderMode } from '@domain/configs'
import type { LinkMenuItemSectionData } from '@domain/schemas'
import { FUNCTIONS_BY_NAME } from '@spacedock/manifest'
import { AppLinkSection } from '../link/'

export interface TeamboardLinkSectionProps {
  section: HomeSection<LinkMenuItemSectionData, 'link'> | null
  dynamic_section_data?: Partial<LinkMenuItemSectionData>
  renderMode?: SectionRenderMode
}

export const TeamboardLinkSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: TeamboardLinkSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: LinkMenuItemSectionData = {
    sub_type: 'menu-item',
    functionID: FUNCTIONS_BY_NAME['Page Team']?.functionID,
    icon_display: 'inline',
  }

  section.section_data = {
    ...section.section_data,
    ...sectionData,
  }

  // No data layer needed - this is a simple link component
  // Mock, prod, and error modes all render the same
  return <AppLinkSection section={section} />
}
