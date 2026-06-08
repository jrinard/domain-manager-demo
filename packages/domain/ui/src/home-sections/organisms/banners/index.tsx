import type {
  SectionRenderMode,
  HomeSection,
  BannersSection as BannersSectionType,
} from '@domain/configs'
import type { BannersSectionData } from '@domain/schemas'
import type { DomainUI } from '@spacedock/manifest'
import { TextBody } from '@spacedock/falcon-ui'
import { HomeSectionWrapper } from '../home-section-wrapper'
import { BannerCarousel } from './BannerCarousel'

export interface BannersSectionProps {
  section: HomeSection<BannersSectionData> | null
  dynamic_section_data?: BannersSectionType['dynamic_section_data']
  renderMode?: SectionRenderMode
  domainID?: number
  attachments?: DomainUI.Attachment[]
}

export const BannersSection = ({
  section,
  attachments,
  renderMode = 'prod',
  domainID,
}: BannersSectionProps) => {
  if (!section || !section.section_data) return null

  const section_data = (section.section_data || {}) as BannersSectionData
  const banners = Array.isArray(section_data?.banners)
    ? section_data.banners
    : []
  const autoPlay = section_data?.autoPlay ?? true
  const slideDuration = section_data?.slideDuration ?? 3
  const transitionType = section_data?.transitionType ?? 'slide'

  if (banners.length === 0) {
    return (
      <HomeSectionWrapper section={section} attachments={attachments}>
        <TextBody className="text-grayscale-400">
          Click here, and you’ll see the banner options on the right, where you
          can upload images, set links, and more.
        </TextBody>
      </HomeSectionWrapper>
    )
  }

  return (
    <HomeSectionWrapper
      section={section}
      attachments={attachments}
      padding="none"
    >
      <BannerCarousel
        banners={banners}
        attachments={attachments}
        renderMode={renderMode}
        domainID={domainID}
        autoPlay={autoPlay}
        slideDuration={slideDuration}
        transitionType={transitionType}
      />
    </HomeSectionWrapper>
  )
}
