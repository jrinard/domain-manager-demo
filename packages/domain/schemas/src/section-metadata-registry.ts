import type { HomeSectionType } from './types'

import {
  TITLE_DEFAULT_COLUMN_SPAN,
  TITLE_AND_BUTTONS_DEFAULT_COLUMN_SPAN,
  WELCOME_DEFAULT_COLUMN_SPAN,
  TEXT_DEFAULT_COLUMN_SPAN,
  LOGO_AND_BUTTON_DEFAULT_COLUMN_SPAN,
  STATS_COUNT_DEFAULT_COLUMN_SPAN,
  ACTIVITY_TABLE_DEFAULT_COLUMN_SPAN,
  CHART_DEFAULT_COLUMN_SPAN,
  TRAINING_CAROUSELS_DEFAULT_COLUMN_SPAN,
  R3_HEATMAP_DEFAULT_COLUMN_SPAN,
  R3_QUADRANTS_DEFAULT_COLUMN_SPAN,
  R3_FULL_DEFAULT_COLUMN_SPAN,
  LIBRARY_LINK_DEFAULT_COLUMN_SPAN,
  TEAMBOARD_LINK_DEFAULT_COLUMN_SPAN,
  NEXT_TRAINING_DEFAULT_COLUMN_SPAN,
  REPORTING_TRAINING_DEFAULT_COLUMN_SPAN,
  LINK_DEFAULT_COLUMN_SPAN,
  CVENT_DEFAULT_COLUMN_SPAN,
  TRAINING_STATS_COUNT_DEFAULT_COLUMN_SPAN,
  ITEMS_GROUP_DEFAULT_COLUMN_SPAN,
  CUSTOM_TABS_DEFAULT_COLUMN_SPAN,
  CATALOG_NEWS_DEFAULT_COLUMN_SPAN,
  OP_DEFAULT_COLUMN_SPAN,
  LESSON_DEFAULT_COLUMN_SPAN,
  SEARCH_DEFAULT_COLUMN_SPAN,
  BANNERS_DEFAULT_COLUMN_SPAN,
  FEATURED_CONTENT_DEFAULT_COLUMN_SPAN,
  HEADER_DEFAULT_COLUMN_SPAN as MASTERY_HEADER_DEFAULT_COLUMN_SPAN,
  RECENT_TRAINING_DEFAULT_COLUMN_SPAN as MASTERY_RECENT_TRAINING_DEFAULT_COLUMN_SPAN,
  LINKS_DEFAULT_COLUMN_SPAN as MASTERY_LINKS_DEFAULT_COLUMN_SPAN,
  ENROLLED_TRAINING_DEFAULT_COLUMN_SPAN as MASTERY_ENROLLED_TRAINING_DEFAULT_COLUMN_SPAN,
  CATALOG_DEFAULT_COLUMN_SPAN as MASTERY_CATALOG_DEFAULT_COLUMN_SPAN,
} from './sections'
import { BUTTON_DEFAULT_COLUMN_SPAN } from './sections/button.schema'

type ExpectedColumnCounts = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface SectionMetadataInfo {
  section_type: HomeSectionType
  display_name: string
  description: string
  default_column_span: ExpectedColumnCounts
  icon?: string
  isLockedBecauseNeedsDevWork?: boolean
  configTypes?: ('tryyb' | 'mastery')[] // Which config types can use this section. If undefined, available for all.
}

/**
 * Registry of section metadata for all home section types
 * Used for displaying section cards in the AddNewSection component
 */
export const sectionMetadataRegistry: Record<
  HomeSectionType,
  SectionMetadataInfo
> = {
  welcome: {
    section_type: 'welcome',
    display_name: 'Welcome',
    description: 'Display welcome message and button',
    default_column_span: WELCOME_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'human-welcome',
  },
  text: {
    section_type: 'text',
    display_name: 'Text Section',
    description: 'Simple text block with optional button',
    default_column_span: TEXT_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'text',
    configTypes: ['tryyb'],
  },
  banners: {
    section_type: 'banners',
    display_name: 'Banners',
    description: 'Display banners',
    default_column_span: BANNERS_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'view-carousel',
  },

  'logo-and-button': {
    section_type: 'logo-and-button',
    display_name: 'Logo and Buttons',
    description: 'Display logo area with a list of Buttons',
    default_column_span:
      LOGO_AND_BUTTON_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'image',
  },
  link: {
    section_type: 'link',
    display_name: 'Link',
    description: 'Generic link section',
    default_column_span: LINK_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'link',
  },
  button: {
    section_type: 'button',
    display_name: 'Button Link',
    description: 'Renders a link that looks like a Button in the Platform',
    default_column_span: BUTTON_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'link',
  },
  lesson: {
    section_type: 'lesson',
    display_name: 'File',
    description: 'Display a File asset',
    default_column_span: LESSON_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'file',
  },
  'items-group': {
    section_type: 'items-group',
    display_name: 'Group of Links & Buttons',
    description: 'Display a group of Links',
    default_column_span:
      ITEMS_GROUP_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'view-list',
  },
  'custom-tabs': {
    section_type: 'custom-tabs',
    display_name: 'Custom Tabs',
    description: 'Display user-assigned custom tabs',
    default_column_span:
      CUSTOM_TABS_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'tab',
  },
  'featured-content': {
    section_type: 'featured-content',
    display_name: 'Featured Content',
    description: 'Featured Library Items',
    default_column_span:
      FEATURED_CONTENT_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'star',
  },
  'training-carousels': {
    section_type: 'training-carousels',
    display_name: 'Training Carousels',
    description: 'Display training courses in carousel format',
    default_column_span:
      TRAINING_CAROUSELS_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'view-carousel',
  },
  title: {
    section_type: 'title',
    display_name: 'Title',
    description: 'Display title section for team or person',
    default_column_span: TITLE_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'title',
    configTypes: ['tryyb'], // Only available for tryyb, mastery uses 'header' instead
  },
  search: {
    section_type: 'search',
    display_name: 'Search',
    description: 'Display a search input with optional header image',
    default_column_span: SEARCH_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'magnify',
  },
  'stats-count': {
    section_type: 'stats-count',
    display_name: 'Stats Count',
    description: 'Display statistical counts with icons',
    default_column_span:
      STATS_COUNT_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'bar-chart',
  },

  'r3-full': {
    section_type: 'r3-full',
    display_name: 'R3 Full',
    description: 'Display R3 full format section',
    default_column_span: R3_FULL_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'rectangle',
  },
  'r3-heatmap': {
    section_type: 'r3-heatmap',
    display_name: 'R3 Heatmap',
    description: 'Display DISC profile heatmap',
    default_column_span: R3_HEATMAP_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'grid-on',
  },
  'r3-quadrants': {
    section_type: 'r3-quadrants',
    display_name: 'R3 Quadrants',
    description: "Display user's DISC profile quadrants",
    default_column_span:
      R3_QUADRANTS_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'dashboard',
  },
  'title-and-buttons': {
    section_type: 'title-and-buttons',
    display_name: 'Title and Buttons',
    description: 'Welcome block with optional image and linked button images',
    default_column_span:
      TITLE_AND_BUTTONS_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'view-headline',
    isLockedBecauseNeedsDevWork: true,
  },
  'activity-table': {
    section_type: 'activity-table',
    display_name: 'Activity Table',
    description: 'Display activity data in table format',
    default_column_span:
      ACTIVITY_TABLE_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'table',
    isLockedBecauseNeedsDevWork: true,
  },
  chart: {
    section_type: 'chart',
    display_name: 'Chart',
    description: 'Display data visualizations',
    default_column_span: CHART_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'chart-line',
    isLockedBecauseNeedsDevWork: true,
  },

  'library-link': {
    section_type: 'library-link',
    display_name: 'Library Link',
    description: 'Link to library section',
    default_column_span:
      LIBRARY_LINK_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'library-books',
    isLockedBecauseNeedsDevWork: true,
  },
  'teamboard-link': {
    section_type: 'teamboard-link',
    display_name: 'Teamboard Link',
    description: 'Link to teamboards section',
    default_column_span:
      TEAMBOARD_LINK_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'group',
    isLockedBecauseNeedsDevWork: true,
  },
  'next-training': {
    section_type: 'next-training',
    display_name: 'Next Training',
    description: "Display user's next scheduled training",
    default_column_span:
      NEXT_TRAINING_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'event',
    isLockedBecauseNeedsDevWork: true,
  },
  'reporting-training': {
    section_type: 'reporting-training',
    display_name: 'Reporting Training',
    description: 'Display reporting training information',
    default_column_span:
      REPORTING_TRAINING_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'assessment',
    isLockedBecauseNeedsDevWork: true,
  },

  cvent: {
    section_type: 'cvent',
    display_name: 'Cvent',
    description: 'Display Cvent events',
    default_column_span: CVENT_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'event-available',
  },
  'training-stats-count': {
    section_type: 'training-stats-count',
    display_name: 'Training Stats Count',
    description: 'Display training-specific statistical counts',
    default_column_span:
      TRAINING_STATS_COUNT_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'trending-up',
    isLockedBecauseNeedsDevWork: true,
  },
  'catalog-news': {
    section_type: 'catalog-news',
    display_name: 'Catalog News',
    description: 'Display news articles from the catalog',
    default_column_span:
      CATALOG_NEWS_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'newspaper',
  },
  op: {
    section_type: 'op',
    display_name: 'OP',
    description: 'AAFCO OP section',
    default_column_span: OP_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'book-open-variant',
  },
  'mastery-header': {
    section_type: 'mastery-header',
    display_name: 'Header',
    description: 'Tagline, Quote, Signature, Button, and Welcome Video',
    default_column_span:
      MASTERY_HEADER_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'page-layout-header',
    configTypes: ['mastery'],
  },

  'mastery-links': {
    section_type: 'mastery-links',
    display_name: 'Filters, Search, Links',
    description: 'Links, Filter Toggles and Search',
    default_column_span:
      MASTERY_LINKS_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'card-search',
    configTypes: ['mastery'],
  },
  'mastery-inprogress-enrolled-training': {
    section_type: 'mastery-inprogress-enrolled-training',
    display_name: 'In Progress Enrolled',
    description: 'Training with Progress',
    default_column_span:
      MASTERY_ENROLLED_TRAINING_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'play',
    configTypes: ['mastery'],
  },
  'mastery-recent-training': {
    section_type: 'mastery-recent-training',
    display_name: 'Recent Training',
    description: 'Training with Recent Activity',
    default_column_span:
      MASTERY_RECENT_TRAINING_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'play',
    configTypes: ['mastery'],
  },
  'mastery-catalog': {
    section_type: 'mastery-catalog',
    display_name: 'Catalog',
    description: 'Main Catalog (Default)',
    default_column_span:
      MASTERY_CATALOG_DEFAULT_COLUMN_SPAN as ExpectedColumnCounts,
    icon: 'subtitles',
    configTypes: ['mastery'],
  },
}

/**
 * Get section metadata by section type
 */
export function getSectionMetadata(
  sectionType: HomeSectionType,
): SectionMetadataInfo {
  return sectionMetadataRegistry[sectionType]
}

/**
 * Get all section metadata as an array
 * @param configType - Optional filter by config type ('tryyb' | 'mastery')
 */
export function getAllSectionMetadata(
  configType?: 'tryyb' | 'mastery',
): SectionMetadataInfo[] {
  const allSections = Object.values(sectionMetadataRegistry)

  if (!configType) {
    return allSections
  }

  // Filter sections based on configType
  return allSections.filter((section) => {
    // If configTypes is not specified, section is available for 'tryyb' only (legacy behavior)
    if (!section.configTypes) {
      return configType === 'tryyb'
    }
    return section.configTypes.includes(configType)
  })
}
