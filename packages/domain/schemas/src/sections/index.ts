// Export all section schemas EXCEPT DEFAULT_COLUMN_SPAN to avoid naming conflicts
// DEFAULT_COLUMN_SPAN is exported below with section-specific prefixed names
export {
  teamTitleSchema,
  primaryTeamTitleSchema,
  personTitleSchema,
  type TeamTitleData,
  type PrimaryTeamTitleData,
  type PersonTitleData,
  type TitleSectionData,
  titleSchema,
} from './title.schema'

export {
  titleAndButtonsSchema,
  type TitleAndButtonsSectionData,
  titleAndButtonsSchema_definition,
} from './title-and-buttons.schema'

export {
  welcomeSchema,
  type WelcomeSectionData,
  welcomeSchema_definition,
} from './welcome.schema'
export {
  textSchema,
  type TextSectionData,
  textSchema_definition,
} from './text.schema'

export {
  logoAndButtonSchema,
  type LogoAndButtonSectionData,
  logoAndButtonSchema_definition,
} from './logo-and-button.schema'

export {
  itemsGroupSchema,
  type ItemsGroupSectionData,
  itemsGroupSchema_definition,
} from './items-group.schema'

export {
  activeEmployeesSchema,
  coursesCompletedSchema,
  lessonCompletionsSchema,
  type ActiveEmployeesData,
  type CoursesCompletedData,
  type LessonCompletionsData,
  type StatsCountSectionData,
  statsCountSchema,
} from './stats-count.schema'

export {
  categoryTrainingProgressSchema,
  courseCompletionActivitySchema,
  learningActivitySchema,
  trainingProgressSchema,
  catalogLessonActivitySchema,
  type CategoryTrainingProgressData,
  type CourseCompletionActivityData,
  type LearningActivityData,
  type TrainingProgressData,
  type CatalogLessonActivityData,
  type ActivityTableSectionData,
  activityTableSchema,
} from './activity-table.schema'

export {
  courseCompletionsChartSchema,
  videosWatchedChartSchema,
  courseActivityChartSchema,
  stepsCompletionsChartSchema,
  type CourseCompletionsChartData,
  type VideosWatchedChartData,
  type CourseActivityChartData,
  type StepsCompletionsChartData,
  type ChartSectionData,
  chartSchema,
} from './chart.schema'

export {
  trainingCarouselsSchema,
  type TrainingCarouselsSectionData,
  trainingCarouselsSchema_definition,
} from './training-carousels.schema'

export {
  r3HeatmapSchema,
  type R3HeatmapSectionData,
  r3HeatmapSchema_definition,
} from './r3-heatmap.schema'

export {
  r3QuadrantsSchema,
  type R3QuadrantsSectionData,
  r3QuadrantsSchema_definition,
} from './r3-quadrants.schema'

export {
  r3FullSchema,
  type R3FullSectionData,
  r3FullSchema_definition,
} from './r3-full.schema'

export {
  libraryLinkSchema,
  type LibraryLinkSectionData,
  libraryLinkSchema_definition,
} from './library-link.schema'

export {
  teamboardLinkSchema,
  type TeamboardLinkSectionData,
  teamboardLinkSchema_definition,
} from './teamboard-link.schema'

export {
  nextTrainingSchema,
  type NextTrainingSectionData,
  nextTrainingSchema_definition,
} from './next-training.schema'

export {
  reportingTrainingSchema,
  type ReportingTrainingSectionData,
  reportingTrainingSchema_definition,
} from './reporting-training.schema'

export {
  buttonMenuItemSchema,
  buttonCustomTabSchema,
  buttonExternalLinkSchema,
  type ButtonMenuItemSectionData,
  type ButtonCustomTabSectionData,
  type ButtonExternalLinkSectionData,
  buttonSchema_definition,
} from './button.schema'

export {
  menuItemSchema,
  customTabSchema,
  externalLinkSchema,
  type LinkMenuItemSectionData,
  type LinkCustomTabSectionData,
  type LinkExternalLinkSectionData,
  linkSchema_definition,
} from './link.schema'

export {
  cventSchema,
  type CventSectionData,
  cventSchema_definition,
} from './cvent.schema'

export {
  trainingStatsCountSchema,
  type TrainingStatsCountSectionData,
  trainingStatsCountSchema_definition,
} from './training-stats-count.schema'

export {
  customTabsSchema,
  type CustomTabsSectionData,
  customTabsSchema_definition,
} from './custom-tabs.schema'

export {
  catalogNewsSchema,
  type CatalogNewsSectionData,
  catalogNewsSchema_definition,
} from './catalog-news.schema'

export {
  opSubTypeSchema,
  feedSubTypeSchema,
  petSubTypeSchema,
  type OpSubTypeData,
  type FeedSubTypeData,
  type PetSubTypeData,
  type OpSectionData,
  opSchema_definition,
} from './op.schema'
export {
  lessonSchema,
  type LessonSectionData,
  lessonSchema_definition,
} from './lesson.schema'

export {
  searchSchema,
  type SearchSectionData,
  searchSchema_definition,
} from './search.schema'

export {
  bannersSchema,
  bannerItemSchema,
  menuItemBannerSchema,
  customTabBannerSchema,
  externalLinkBannerSchema,
  lessonBannerSchema,
  type BannersSectionData,
  type BannerItem,
  type MenuItemBanner,
  type CustomTabBanner,
  type ExternalLinkBanner,
  type LessonBanner,
  bannersSchema_definition,
} from './banners.schema'

export {
  featuredContentSchema,
  type FeaturedContentSectionData,
  featuredContentSchema_definition,
} from './featured-content.schema'

export {
  headerSchema,
  type HeaderSectionData,
  masteryHeaderSchema_definition,
  type MasteryHeaderSectionData,
} from './header.schema'

export {
  recentTrainingSchema,
  type RecentTrainingSectionData,
  type MasteryRecentTrainingSectionData,
  recentTrainingSchema_definition,
  masteryRecentTrainingSchema_definition,
} from './recent-training.schema'
export {
  linksSchema,
  type LinksSectionData,
  type MasteryLinksSectionData,
  linksSchema_definition,
  masteryLinksSchema_definition,
} from './links.schema'
export {
  enrolledTrainingSchema,
  type EnrolledTrainingSectionData,
  type MasteryEnrolledTrainingSectionData,
  enrolledTrainingSchema_definition,
  masteryInProgressEnrolledTrainingSchema_definition,
} from './enrolled-training.schema'
export {
  catalogSchema,
  type CatalogSectionData,
  type MasteryCatalogSectionData,
  catalogSchema_definition,
  masteryCatalogSchema_definition,
} from './catalog.schema'

// Export DEFAULT_COLUMN_SPAN with section-specific prefixed names to avoid conflicts
export { DEFAULT_COLUMN_SPAN as TITLE_DEFAULT_COLUMN_SPAN } from './title.schema'
export { DEFAULT_COLUMN_SPAN as TITLE_AND_BUTTONS_DEFAULT_COLUMN_SPAN } from './title-and-buttons.schema'
export { DEFAULT_COLUMN_SPAN as WELCOME_DEFAULT_COLUMN_SPAN } from './welcome.schema'
export { DEFAULT_COLUMN_SPAN as TEXT_DEFAULT_COLUMN_SPAN } from './text.schema'
export { DEFAULT_COLUMN_SPAN as LOGO_AND_BUTTON_DEFAULT_COLUMN_SPAN } from './logo-and-button.schema'
export { DEFAULT_COLUMN_SPAN as ITEMS_GROUP_DEFAULT_COLUMN_SPAN } from './items-group.schema'
export { DEFAULT_COLUMN_SPAN as STATS_COUNT_DEFAULT_COLUMN_SPAN } from './stats-count.schema'
export { DEFAULT_COLUMN_SPAN as ACTIVITY_TABLE_DEFAULT_COLUMN_SPAN } from './activity-table.schema'
export { DEFAULT_COLUMN_SPAN as CHART_DEFAULT_COLUMN_SPAN } from './chart.schema'
export { DEFAULT_COLUMN_SPAN as TRAINING_CAROUSELS_DEFAULT_COLUMN_SPAN } from './training-carousels.schema'
export { DEFAULT_COLUMN_SPAN as R3_HEATMAP_DEFAULT_COLUMN_SPAN } from './r3-heatmap.schema'
export { DEFAULT_COLUMN_SPAN as R3_QUADRANTS_DEFAULT_COLUMN_SPAN } from './r3-quadrants.schema'
export { DEFAULT_COLUMN_SPAN as R3_FULL_DEFAULT_COLUMN_SPAN } from './r3-full.schema'
export { DEFAULT_COLUMN_SPAN as LIBRARY_LINK_DEFAULT_COLUMN_SPAN } from './library-link.schema'
export { DEFAULT_COLUMN_SPAN as TEAMBOARD_LINK_DEFAULT_COLUMN_SPAN } from './teamboard-link.schema'
export { DEFAULT_COLUMN_SPAN as NEXT_TRAINING_DEFAULT_COLUMN_SPAN } from './next-training.schema'
export { DEFAULT_COLUMN_SPAN as REPORTING_TRAINING_DEFAULT_COLUMN_SPAN } from './reporting-training.schema'
export { DEFAULT_COLUMN_SPAN as LINK_DEFAULT_COLUMN_SPAN } from './link.schema'
export { DEFAULT_COLUMN_SPAN as CVENT_DEFAULT_COLUMN_SPAN } from './cvent.schema'
export { DEFAULT_COLUMN_SPAN as TRAINING_STATS_COUNT_DEFAULT_COLUMN_SPAN } from './training-stats-count.schema'
export { DEFAULT_COLUMN_SPAN as CUSTOM_TABS_DEFAULT_COLUMN_SPAN } from './custom-tabs.schema'
export { DEFAULT_COLUMN_SPAN as CATALOG_NEWS_DEFAULT_COLUMN_SPAN } from './catalog-news.schema'
export { DEFAULT_COLUMN_SPAN as OP_DEFAULT_COLUMN_SPAN } from './op.schema'
export { DEFAULT_COLUMN_SPAN as LESSON_DEFAULT_COLUMN_SPAN } from './lesson.schema'
export { DEFAULT_COLUMN_SPAN as SEARCH_DEFAULT_COLUMN_SPAN } from './search.schema'
export { DEFAULT_COLUMN_SPAN as BANNERS_DEFAULT_COLUMN_SPAN } from './banners.schema'
export { DEFAULT_COLUMN_SPAN as FEATURED_CONTENT_DEFAULT_COLUMN_SPAN } from './featured-content.schema'
export { DEFAULT_COLUMN_SPAN as HEADER_DEFAULT_COLUMN_SPAN } from './header.schema'
export { DEFAULT_COLUMN_SPAN as RECENT_TRAINING_DEFAULT_COLUMN_SPAN } from './recent-training.schema'
export { DEFAULT_COLUMN_SPAN as LINKS_DEFAULT_COLUMN_SPAN } from './links.schema'
export { DEFAULT_COLUMN_SPAN as ENROLLED_TRAINING_DEFAULT_COLUMN_SPAN } from './enrolled-training.schema'
export { DEFAULT_COLUMN_SPAN as CATALOG_DEFAULT_COLUMN_SPAN } from './catalog.schema'
