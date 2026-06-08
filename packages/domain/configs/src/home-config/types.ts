import type { CardSizingWrapperProps } from '@spacedock/bento'
import {
  ActivityTableSectionData,
  ButtonMenuItemSectionData,
  ButtonCustomTabSectionData,
  ButtonExternalLinkSectionData,
  ItemsGroupSectionData,
  CustomTabsSectionData,
  ChartSectionData,
  CventSectionData,
  WelcomeSectionData,
  TextSectionData,
  LogoAndButtonSectionData,
  LibraryLinkSectionData,
  LinkMenuItemSectionData,
  LinkCustomTabSectionData,
  NextTrainingSectionData,
  R3HeatmapSectionData,
  R3QuadrantsSectionData,
  R3FullSectionData,
  ReportingTrainingSectionData,
  StatsCountSectionData,
  TeamboardLinkSectionData,
  TitleSectionData,
  TrainingCarouselsSectionData,
  TrainingStatsCountSectionData,
  LinkExternalLinkSectionData,
  CatalogNewsSectionData,
  OpSectionData,
  LessonSectionData,
  SearchSectionData,
  BannersSectionData,
  FeaturedContentSectionData,
  MasteryHeaderSectionData,
  RecentTrainingSectionData,
  LinksSectionData,
  EnrolledTrainingSectionData,
  CatalogSectionData,
} from '@domain/schemas'
export type HomeSectionType =
  | 'title'
  | 'text'
  | 'welcome'
  | 'logo-and-button'
  | 'items-group'
  | 'custom-tabs'
  | 'next-training'
  | 'reporting-training'
  | 'library-link'
  | 'teamboard-link'
  | 'button'
  | 'link'
  | 'cvent'
  | 'r3-heatmap'
  | 'r3-quadrants'
  | 'r3-full'
  | 'stats-count'
  | 'training-stats-count'
  | 'training-carousels'
  | 'activity-table'
  | 'chart'
  | 'catalog-news'
  | 'op'
  | 'lesson'
  | 'search'
  | 'banners'
  | 'featured-content'
  | 'mastery-header'
  | 'mastery-recent-training'
  | 'mastery-links'
  | 'mastery-inprogress-enrolled-training'
  | 'mastery-catalog'

export interface SectionMetadata {
  display_name: string
  description?: string
  bgColor?: CardSizingWrapperProps['bgColor']
  textColor?: CardSizingWrapperProps['textColor']
  bgImage?: number
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  rounding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  hideWhenNoPermission?: boolean
}

export type ExpectedColumnCounts =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12

export type AreaNamesItem =
  | string
  | { name: string; columnSpan: ExpectedColumnCounts }

export interface SectionLayoutPosition {
  areaName?: string
  columnSpan?: ExpectedColumnCounts | 'auto' | 'full'
  rowSpan?: ExpectedColumnCounts | 'auto'
}

export interface SectionLayout {
  columns: 2 | 3 | 4 | 6 | 9 | 12
  areas_by_name?: AreaNamesItem[][]
}

export interface HomeSection<
  DataType = Record<string, unknown>,
  SectionType = HomeSectionType,
> {
  id?: string
  section_type: SectionType
  metadata: SectionMetadata
  section_data: DataType
  // * This would be dynamic data that the User can update in the UI that will be passed to the section by the UI (in contrast to from the config)
  dynamic_section_data?: Partial<DataType>
  layout_position: SectionLayoutPosition
  // * This is really a placeholder for future features involving highly adaptable Sections with there out own layouts
  section_layout?: SectionLayout
}

export interface ScreenSizeLayout {
  width?: 'full' | 'small' | 'medium' | 'large'
  columns: 2 | 3 | 4 | 6 | 9 | 12
  areas_by_name?: AreaNamesItem[][]
  vertical_alignment?: 'top' | 'center'
  grid_height_minimum?: '100%' | '75%' | '66%' | '50%'
  background_image_url?: string
  background_image_styles?: {
    backgroundSize?: string
    backgroundPosition?: string
    backgroundRepeat?: string
  }
}

export interface HomeConfig {
  config_version: '1'
  id: `${number}`
  layout: ScreenSizeLayout
  tablet_layout?: ScreenSizeLayout
  mobile_layout?: ScreenSizeLayout
  sections: HomeSectionTyped[]
}

// * Specific Section Types Utilizing Schemas
export type TitleSection = HomeSection<TitleSectionData, 'title'>
export type WelcomeSection = HomeSection<WelcomeSectionData, 'welcome'>
export type TextSection = HomeSection<TextSectionData, 'text'>
export type LogoAndButtonSection = HomeSection<
  LogoAndButtonSectionData,
  'logo-and-button'
>
export type ItemsGroupSection = HomeSection<
  ItemsGroupSectionData,
  'items-group'
>
export type CustomTabsSection = HomeSection<
  CustomTabsSectionData,
  'custom-tabs'
>
export type StatsCountSection = HomeSection<
  StatsCountSectionData,
  'stats-count'
>
export type ActivityTableSection = HomeSection<
  ActivityTableSectionData,
  'activity-table'
>
export type ChartSection = HomeSection<ChartSectionData, 'chart'>
export type TrainingCarouselsSection = HomeSection<
  TrainingCarouselsSectionData,
  'training-carousels'
>
export type R3HeatmapSection = HomeSection<R3HeatmapSectionData, 'r3-heatmap'>
export type R3QuadrantsSection = HomeSection<
  R3QuadrantsSectionData,
  'r3-quadrants'
>
export type R3FullSection = HomeSection<R3FullSectionData, 'r3-full'>
export type LibraryLinkSection = HomeSection<
  LibraryLinkSectionData,
  'library-link'
>
export type TeamboardLinkSection = HomeSection<
  TeamboardLinkSectionData,
  'teamboard-link'
>
export type NextTrainingSection = HomeSection<
  NextTrainingSectionData,
  'next-training'
>
export type ReportingTrainingSection = HomeSection<
  ReportingTrainingSectionData,
  'reporting-training'
>

export type ButtonSection = HomeSection<
  | ButtonMenuItemSectionData
  | ButtonCustomTabSectionData
  | ButtonExternalLinkSectionData,
  'button'
>

export type LinkSection = HomeSection<
  | LinkMenuItemSectionData
  | LinkCustomTabSectionData
  | LinkExternalLinkSectionData,
  'link'
>
export type CventSection = HomeSection<CventSectionData, 'cvent'>
export type TrainingStatsCountSection = HomeSection<
  TrainingStatsCountSectionData,
  'training-stats-count'
>
export type CatalogNewsSection = HomeSection<
  CatalogNewsSectionData,
  'catalog-news'
>
export type OpSection = HomeSection<OpSectionData, 'op'>
export type LessonSection = HomeSection<LessonSectionData, 'lesson'>
export type SearchSection = HomeSection<SearchSectionData, 'search'>
export type BannersSection = HomeSection<BannersSectionData, 'banners'>
export type FeaturedContentSection = HomeSection<
  FeaturedContentSectionData,
  'featured-content'
>
export type MasteryHeaderSection = HomeSection<
  MasteryHeaderSectionData,
  'mastery-header'
>

export type MasteryRecentTrainingSection = HomeSection<
  RecentTrainingSectionData,
  'mastery-recent-training'
>
export type MasteryLinksSection = HomeSection<LinksSectionData, 'mastery-links'>
export type MasteryEnrolledTrainingSection = HomeSection<
  EnrolledTrainingSectionData,
  'mastery-inprogress-enrolled-training'
>
export type MasteryCatalogSection = HomeSection<
  CatalogSectionData,
  'mastery-catalog'
>

// Backwards-compatible aliases
export type RecentTrainingSection = MasteryRecentTrainingSection
export type LinksSection = MasteryLinksSection
export type EnrolledTrainingSection = MasteryEnrolledTrainingSection
export type CatalogSection = MasteryCatalogSection

export type HomeSectionTyped =
  | TitleSection
  | TextSection
  | WelcomeSection
  | LogoAndButtonSection
  | ItemsGroupSection
  | CustomTabsSection
  | StatsCountSection
  | ActivityTableSection
  | ChartSection
  | TrainingCarouselsSection
  | R3HeatmapSection
  | R3QuadrantsSection
  | R3FullSection
  | LibraryLinkSection
  | TeamboardLinkSection
  | NextTrainingSection
  | ReportingTrainingSection
  | ButtonSection
  | LinkSection
  | CventSection
  | TrainingStatsCountSection
  | CatalogNewsSection
  | OpSection
  | LessonSection
  | SearchSection
  | BannersSection
  | FeaturedContentSection
  | MasteryHeaderSection
  | MasteryRecentTrainingSection
  | MasteryLinksSection
  | MasteryEnrolledTrainingSection
  | MasteryCatalogSection
