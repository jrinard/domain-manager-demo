import { z } from '@spacedock/data-validation'
import type {
  SectionSchemaDefinition,
  SubTypeSchemaDefinition,
} from '@spacedock/data-validation'
import type { HomeSectionType } from './types'

// Import all schemas from sections
import { titleSchema } from './sections/title.schema'
import { titleAndButtonsSchema_definition } from './sections/title-and-buttons.schema'
import { welcomeSchema_definition } from './sections/welcome.schema'
import { textSchema_definition } from './sections/text.schema'
import { logoAndButtonSchema_definition } from './sections/logo-and-button.schema'
import { statsCountSchema } from './sections/stats-count.schema'
import { activityTableSchema } from './sections/activity-table.schema'
import { chartSchema } from './sections/chart.schema'
import { trainingCarouselsSchema_definition } from './sections/training-carousels.schema'
import { r3HeatmapSchema_definition } from './sections/r3-heatmap.schema'
import { r3QuadrantsSchema_definition } from './sections/r3-quadrants.schema'
import { r3FullSchema_definition } from './sections/r3-full.schema'
import { libraryLinkSchema_definition } from './sections/library-link.schema'
import { teamboardLinkSchema_definition } from './sections/teamboard-link.schema'
import { nextTrainingSchema_definition } from './sections/next-training.schema'
import { reportingTrainingSchema_definition } from './sections/reporting-training.schema'
import { linkSchema_definition } from './sections/link.schema'
import { buttonSchema_definition } from './sections/button.schema'
import { cventSchema_definition } from './sections/cvent.schema'
import { trainingStatsCountSchema_definition } from './sections/training-stats-count.schema'
import { itemsGroupSchema_definition } from './sections/items-group.schema'
import { customTabsSchema_definition } from './sections/custom-tabs.schema'
import { catalogNewsSchema_definition } from './sections/catalog-news.schema'
import { opSchema_definition } from './sections/op.schema'
import { lessonSchema_definition } from './sections/lesson.schema'
import { searchSchema_definition } from './sections/search.schema'
import { bannersSchema_definition } from './sections/banners.schema'
import { featuredContentSchema_definition } from './sections/featured-content.schema'
import { masteryHeaderSchema_definition } from './sections/header.schema'
import { masteryRecentTrainingSchema_definition } from './sections/recent-training.schema'
import { masteryLinksSchema_definition } from './sections/links.schema'
import { masteryInProgressEnrolledTrainingSchema_definition } from './sections/enrolled-training.schema'
import { masteryCatalogSchema_definition } from './sections/catalog.schema'

export const sectionSchemaRegistry: Record<
  HomeSectionType,
  SectionSchemaDefinition
> = {
  title: titleSchema,
  welcome: welcomeSchema_definition,
  'logo-and-button': logoAndButtonSchema_definition,
  'title-and-buttons': titleAndButtonsSchema_definition,
  'stats-count': statsCountSchema,
  'activity-table': activityTableSchema,
  chart: chartSchema,
  'training-carousels': trainingCarouselsSchema_definition,
  'r3-heatmap': r3HeatmapSchema_definition,
  'r3-quadrants': r3QuadrantsSchema_definition,
  'r3-full': r3FullSchema_definition,
  'library-link': libraryLinkSchema_definition,
  'teamboard-link': teamboardLinkSchema_definition,
  text: textSchema_definition,
  'next-training': nextTrainingSchema_definition,
  'reporting-training': reportingTrainingSchema_definition,
  button: buttonSchema_definition,
  link: linkSchema_definition,
  'items-group': itemsGroupSchema_definition,
  'custom-tabs': customTabsSchema_definition,
  cvent: cventSchema_definition,
  'training-stats-count': trainingStatsCountSchema_definition,
  'catalog-news': catalogNewsSchema_definition,
  op: opSchema_definition,
  lesson: lessonSchema_definition,
  search: searchSchema_definition,
  banners: bannersSchema_definition,
  'featured-content': featuredContentSchema_definition,
  'mastery-header': masteryHeaderSchema_definition,
  'mastery-recent-training': masteryRecentTrainingSchema_definition,
  'mastery-links': masteryLinksSchema_definition,
  'mastery-inprogress-enrolled-training': masteryInProgressEnrolledTrainingSchema_definition,
  'mastery-catalog': masteryCatalogSchema_definition,
}

export function getSectionSchema(
  sectionType: HomeSectionType,
): SectionSchemaDefinition {
  const schema = sectionSchemaRegistry[sectionType]

  // Backwards-compatibility fallback: map legacy names to mastery-prefixed schemas
  if (!schema) {
    // Legacy header -> mastery-header
    if ((sectionType as string) === 'header' && sectionSchemaRegistry['mastery-header']) {
      return sectionSchemaRegistry['mastery-header']
    }
  }

  return schema
}

export function getSubTypeSchema(
  sectionType: HomeSectionType,
  subType: string,
): SubTypeSchemaDefinition | null {
  const schema = getSectionSchema(sectionType)
  return schema.sub_types?.[subType] ?? null
}

export function getZodSchema(
  sectionType: HomeSectionType,
  subType?: string,
): z.ZodTypeAny | null {
  const sectionSchema = getSectionSchema(sectionType)

  // Defensive check: ensure sectionSchema exists
  if (!sectionSchema) {
    // eslint-disable-next-line no-console
    console.error(`No schema found for section type: ${sectionType}`)
    return null
  }

  if (subType && sectionSchema.sub_types) {
    return sectionSchema.sub_types[subType]?.section_data_schema ?? null
  }

  return sectionSchema.section_data_schema ?? null
}

export function validateSection(
  section: unknown,
  sectionType: HomeSectionType,
  subType?: string,
) {
  const zodSchema = getZodSchema(sectionType, subType)
  if (!zodSchema) {
    return { success: false, error: new Error('No schema found') }
  }

  return zodSchema.safeParse(section)
}
