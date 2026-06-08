import type { HomeSection, HomeSectionTyped } from '@domain/configs'
import { NextTrainingSectionData } from '@domain/schemas'

import {
  LibraryLinkSection,
  NextTrainingSection,
  ReportingTrainingSection,
  R3HeatmapSection,
  StatsCountSection,
  AppLinkSection,
  TitleSection,
  HomeSectionWrapper,
  CarouselsSection,
  R3QuadrantsSection,
  R3FullSection,
  WelcomeSection,
  LogoAndButtonSection,
  ItemsGroupSection,
  CustomTabsSection,
  ButtonSection,
  CatalogNewsSection,
  OPSection,
  LessonSection,
  SearchSection,
  BannersSection,
  FeaturedContentSection,
  HeaderSection,
  TextSection,
  InProgressEnrolledTrainingSection,
  RecentTrainingSection,
  LinksSection,
} from '@domain/ui'
import { TextBody, TextHeading } from '@spacedock/falcon-ui'

import type { DomainUI } from '@spacedock/manifest'

const UNEXPECTED_SECTION_TYPE_DATA: HomeSection = {
  section_type: 'link',
  id: 'unknown',
  metadata: {
    display_name: 'Unexpected Section Type',
  },
  section_data: {},
  layout_position: {
    columnSpan: 1,
    rowSpan: 1,
    areaName: 'unknown',
  },
}

export const PreviewSectionRouter = ({
  section,
  dynamic_section_data,
  domainID,
  ...props
}: {
  section: HomeSectionTyped
  dynamic_section_data?: Record<string, unknown> | undefined
  domainID?: number
  attachments?: DomainUI.Attachment[]
  target_section_id?: string | undefined
  current_view?: string | undefined
  id?: string | undefined
  navigateToSection?: (...args: string[]) => void
}) => {
  switch (section.section_type) {
    case 'library-link':
      return <LibraryLinkSection section={section} {...props} />
    case 'training-carousels':
      return <CarouselsSection section={section} {...props} />
    case 'next-training':
      return (
        <NextTrainingSection
          section={section}
          dynamic_section_data={
            dynamic_section_data as Partial<NextTrainingSectionData> | undefined
          }
          {...props}
        />
      )
    case 'reporting-training':
      return <ReportingTrainingSection section={section} {...props} />
    case 'r3-heatmap':
      return <R3HeatmapSection section={section} {...props} />
    case 'r3-quadrants':
      return <R3QuadrantsSection section={section} {...props} />
    case 'r3-full':
      return <R3FullSection section={section} {...props} />
    case 'button':
      return <ButtonSection section={section} {...props} />
    case 'link':
      return <AppLinkSection section={section} {...props} />
    case 'title':
      return <TitleSection section={section} {...props} />
    case 'welcome':
      return <WelcomeSection section={section as any} {...props} />
    case 'text':
      return <TextSection section={section as any} {...props} />
    case 'logo-and-button':
      return (
        <LogoAndButtonSection
          section={section as any}
          domainID={domainID}
          {...props}
        />
      )
    case 'items-group':
      return (
        <ItemsGroupSection
          section={section as any}
          domainID={domainID}
          {...props}
        />
      )
    case 'custom-tabs':
      return (
        <CustomTabsSection
          section={section as any}
          domainID={domainID}
          {...props}
        />
      )
    case 'catalog-news':
      return (
        <CatalogNewsSection
          section={section as any}
          dynamic_section_data={{ domainID }}
          {...props}
        />
      )
    case 'stats-count':
      return <StatsCountSection section={section} {...props} />
    case 'op':
      return <OPSection section={section} domainID={domainID} {...props} />
    case 'lesson':
      return <LessonSection section={section} {...props} />
    case 'search':
      return (
        <SearchSection
          section={section}
          domainID={domainID}
          renderMode="prod"
          {...props}
        />
      )
    case 'featured-content':
      return (
        <FeaturedContentSection
          section={section}
          domainID={domainID}
          renderMode="prod"
          {...props}
        />
      )
    case 'mastery-recent-training':
      return (
        <RecentTrainingSection
          section={section as any}
          renderMode="prod"
          {...props}
        />
      )
    case 'mastery-links':
      return <LinksSection section={section as any} renderMode="prod" {...props} />
    case 'mastery-header':
      return (
        <HeaderSection
          section={section as any}
          renderMode="prod"
          attachments={props.attachments}
          {...props}
        />
      )
    case 'mastery-inprogress-enrolled-training':
      return (
        <InProgressEnrolledTrainingSection
          section={section as any}
          renderMode="prod"
          {...props}
        />
      )
    case 'cvent':
      return (
        <HomeSectionWrapper section={section} {...props}>
          <div>
            <TextHeading size={3}>CVENT Calendar </TextHeading>
          </div>
          <div className="mt-2">
            <TextBody className="text-grayscale-500">
              Preview Not Available for CVENT Section...
            </TextBody>
          </div>
        </HomeSectionWrapper>
      )
    case 'banners':
      return (
        <BannersSection
          section={section}
          attachments={props.attachments}
          domainID={domainID}
          renderMode="prod"
        />
      )
    default:
      return (
        <HomeSectionWrapper section={UNEXPECTED_SECTION_TYPE_DATA}>
          <div>{section.section_type}</div>
        </HomeSectionWrapper>
      )
  }
}
