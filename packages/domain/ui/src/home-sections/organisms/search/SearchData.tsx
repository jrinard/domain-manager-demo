import type { SearchSectionData } from '@domain/schemas'
import type { SearchSection as SearchSectionType } from '@domain/configs'
import type { DomainUI } from '@spacedock/manifest'
import { SearchWithData } from './SearchWithData'

export interface SearchDataComponentProps {
  section: SearchSectionType
  sectionData: SearchSectionData
  attachments?: DomainUI.Attachment[]
  domainID?: number
}

export const SearchDataComponent = ({
  section,
  sectionData,
  attachments,
  domainID,
}: SearchDataComponentProps) => {
  return (
    <SearchWithData
      section={section}
      sectionData={sectionData}
      attachments={attachments}
      domainID={domainID}
    />
  )
}
