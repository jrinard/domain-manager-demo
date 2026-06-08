import type {
  SectionRenderMode,
  HomeSection,
  ItemsGroupSection as ItemsGroupSectionType,
} from '@domain/configs'
import type { ItemsGroupSectionData } from '@domain/schemas'
import type { DomainUI } from '@spacedock/manifest'
import { ItemsGroup } from './ItemsGroup'

export interface ItemsGroupSectionProps {
  section: HomeSection<ItemsGroupSectionData> | null
  dynamic_section_data?: ItemsGroupSectionType['dynamic_section_data'] & {
    domainID?: number
  }
  renderMode?: SectionRenderMode
  domainID?: number
  attachments?: DomainUI.Attachment[]
}

export const ItemsGroupSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
  attachments,
}: ItemsGroupSectionProps) => {
  if (!section) return null

  const section_data = section.section_data as ItemsGroupSectionData

  return (
    <ItemsGroup
      section={section as any}
      sectionData={section_data as any}
      dynamic_section_data={dynamic_section_data}
      renderMode={renderMode}
      attachments={attachments}
    />
  )
}
