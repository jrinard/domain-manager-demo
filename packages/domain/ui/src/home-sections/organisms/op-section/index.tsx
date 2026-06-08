import { useMemo } from 'react'
import type { SectionRenderMode, HomeSection } from '@domain/configs'
import type { OpSectionData } from '@domain/schemas'
import { useLibraryLegacyQuery } from '@tyto/query'
import type { DomainUI } from '@spacedock/manifest'
import { HomeSectionWrapper } from '../home-section-wrapper'
import { OPSectionContent } from './OPSectionContent'
import { findOfficialPublication } from './findOP'
import { findFeedLabelingGuide } from './findFeed'
import { findPetLabelingGuide } from './findPet'
import { useMatchingAttachment } from '../../hooks/useMatchingAttachment'

export interface OPSectionProps {
  section: HomeSection<OpSectionData> | null
  renderMode?: SectionRenderMode
  domainID?: number
  attachments?: DomainUI.Attachment[]
}

export const OPSection = ({
  section,
  renderMode = 'prod',
  domainID = 0,
  attachments,
}: OPSectionProps) => {
  // Hooks must be called unconditionally before any early returns
  const { data: libraryItems } = useLibraryLegacyQuery({
    memberID: 2234295, //_Publications Subscription which is in AAFCO Community
    catID: 0,
    assetMode: 'ocAll',
  })

  //* Check for cover OVERRIDE image and apply it if provided
  // Must call hook before early return to satisfy Rules of Hooks
  const { pathURL: coverOverridePathURL } = useMatchingAttachment(
    (section?.section_data as OpSectionData)?.coverOverride ?? 0,
    attachments,
  )

  //* Find the lesson for the current subtype only
  // Must call hook before early return to satisfy Rules of Hooks
  const subType = (section?.section_data as OpSectionData)?.sub_type || 'OP'
  const libraryItem = useMemo(() => {
    if (!section) return undefined

    let item: ReturnType<typeof findOfficialPublication> | undefined

    switch (subType) {
      case 'OP':
        item = findOfficialPublication(libraryItems?.items)
        break
      case 'Feed':
        item = findFeedLabelingGuide(libraryItems?.items)
        break
      case 'Pet':
        item = findPetLabelingGuide(libraryItems?.items)
        break
      default:
        break
    }

    return item
  }, [subType, libraryItems?.items, section])

  if (!section) return null

  const sectionData = section.section_data as OpSectionData

  // Build publication data for the current subtype only
  // Note: coverOverridePathURL from useMatchingAttachment is already fully qualified via createFileURL,
  // so we can use it directly. For libraryItem?.thumbNailPath, we'll handle it in OPSectionContent
  const publicationData = {
    lessonID: libraryItem?.lessonID,
    thumbNailPath: coverOverridePathURL || libraryItem?.thumbNailPath,
  }

  return (
    <HomeSectionWrapper<OpSectionData>
      section={section}
      fallbackLayoutPosition={{ columnSpan: 'full' }}
      padding={section.metadata.padding ?? 'sm'}
    >
      <OPSectionContent
        section={section}
        sectionData={sectionData}
        renderMode={renderMode}
        domainID={domainID}
        publicationData={publicationData}
        attachments={attachments}
      />
    </HomeSectionWrapper>
  )
}
