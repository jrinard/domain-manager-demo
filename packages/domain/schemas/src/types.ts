/**
 * All available home section types
 */
export type HomeSectionType =
  | 'title'
  | 'text'
  | 'welcome'
  | 'logo-and-button'
  | 'title-and-buttons'
  | 'next-training'
  | 'reporting-training'
  | 'library-link'
  | 'teamboard-link'
  | 'button'
  | 'link'
  | 'items-group'
  | 'custom-tabs'
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
  | 'mastery-links'
  | 'mastery-inprogress-enrolled-training'
  | 'mastery-catalog'
  | 'mastery-recent-training'

/**
 * Render mode for home sections
 * - "prod": Production mode with real data loading (default)
 * - "mock": Mock mode with fake data for previews/testing
 * - "error": Error mode showing error state
 */
export type SectionRenderMode = 'prod' | 'mock' | 'error'
