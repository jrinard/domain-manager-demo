import { z } from '@spacedock/data-validation'
import type {
  SectionSchemaDefinition,
  SubTypeSchemaDefinition,
} from '@spacedock/data-validation'
import type { HomeSectionType } from '../home-config/types'

// Import all schemas from @domain/schemas
import {
  titleSchema,
  statsCountSchema,
  activityTableSchema,
  chartSchema,
  trainingCarouselsSchema_definition,
  r3HeatmapSchema_definition,
  r3QuadrantsSchema_definition,
  r3FullSchema_definition,
  welcomeSchema_definition,
  textSchema_definition,
  logoAndButtonSchema_definition,
  libraryLinkSchema_definition,
  teamboardLinkSchema_definition,
  nextTrainingSchema_definition,
  reportingTrainingSchema_definition,
  linkSchema_definition,
  buttonSchema_definition,
  itemsGroupSchema_definition,
  customTabsSchema_definition,
  cventSchema_definition,
  trainingStatsCountSchema_definition,
  catalogNewsSchema_definition,
  opSchema_definition,
  lessonSchema_definition,
  searchSchema_definition,
  bannersSchema_definition,
  featuredContentSchema_definition,
  masteryHeaderSchema_definition,
  masteryRecentTrainingSchema_definition,
  masteryLinksSchema_definition,
  masteryInProgressEnrolledTrainingSchema_definition,
  masteryCatalogSchema_definition,
} from '@domain/schemas'

export const sectionSchemaRegistry: Record<
  HomeSectionType,
  SectionSchemaDefinition
> = {
  title: titleSchema,
  welcome: welcomeSchema_definition,
  'logo-and-button': logoAndButtonSchema_definition,
  'stats-count': statsCountSchema,
  'activity-table': activityTableSchema,
  chart: chartSchema,
  'training-carousels': trainingCarouselsSchema_definition,
  'r3-heatmap': r3HeatmapSchema_definition,
  'r3-quadrants': r3QuadrantsSchema_definition,
  'r3-full': r3FullSchema_definition,
  text: textSchema_definition,
  'library-link': libraryLinkSchema_definition,
  'teamboard-link': teamboardLinkSchema_definition,
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
  return sectionSchemaRegistry[sectionType]
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
