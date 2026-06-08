import {
  HOME_CONFIG_FILE_NAME,
  PREVIEW_HOME_CONFIG_FILE_NAME,
} from './home-config/constants'
import {
  TRYYB_START_CONFIG_FILE_NAME,
  TRYYB_PREVIEW_START_CONFIG_FILE_NAME,
} from './tryyb-start-config/constant'
import { TRYYB_TOP_MENU_CONFIG_FILE_NAME } from './tryyb-top-menu/constants'
import { CVENT_EVENTS_FILE_NAME } from './cvent-folder/getCVENTFolderPath'
import { DOMAIN_V4_STYLESHEET_FILE_NAME } from './domain-folder/constants'
import {
  CLEAN_HOME_CONFIG_DEFAULT,
  STARTING_MASTERY_CONFIG,
} from './home-config/readHomeConfig'

export { getDomainFolderPath } from './domain-folder/getDomainFolderPath'

export {
  getCVENTFolderPath,
  CVENT_EVENTS_FILE_NAME,
} from './cvent-folder/getCVENTFolderPath'

export { getHomeConfigPath } from './home-config/getHomeConfigPath'
export {
  readHomeConfig,
  readPreviewHomeConfig,
} from './home-config/readHomeConfig'
export {
  parseAndValidateHomeConfigString,
  isHomeConfig,
} from './home-config/validator'
export { useLayoutDataFromSection } from './home-config/useLayoutDataFromSection'
export type { OverrideLayoutData } from './home-config/useLayoutDataFromSection'
export * from './home-config/types'

export { getTryybStartConfigPath } from './tryyb-start-config/getTryybStartConfigPath'
export { readTryybStartConfig } from './tryyb-start-config/readTryybStartConfig'

export { getTryybTopMenuPath } from './tryyb-top-menu/getTryybTopMenuPath'
export {
  parseAndValidateTopMenuConfigString,
  isTopMenuConfig,
} from './tryyb-top-menu//validator'
export * from './tryyb-top-menu/types'

export { applyStylesheetLinkToDocument } from './domain-folder/applyDomainStylsheet'
export { useApplyDomainStylesheet } from './domain-folder/useApplyDomainStylesheet'

export const FILE_NAMES = {
  HOME_CONFIG: HOME_CONFIG_FILE_NAME,
  HOME_CONFIG_PREVIEW: PREVIEW_HOME_CONFIG_FILE_NAME,
  TRYYB_START_CONFIG: TRYYB_START_CONFIG_FILE_NAME,
  TRYYB_PREVIEW_START_CONFIG: TRYYB_PREVIEW_START_CONFIG_FILE_NAME,
  TRYYB_TOP_MENU_CONFIG: TRYYB_TOP_MENU_CONFIG_FILE_NAME,
  CVENT_EVENTS: CVENT_EVENTS_FILE_NAME,
  DOMAIN_V4_STYLESHEET: DOMAIN_V4_STYLESHEET_FILE_NAME,
}

export const DEFAULT_CONFIGS = {
  HOME_CONFIG: CLEAN_HOME_CONFIG_DEFAULT,
  MASTERY_CONFIG: STARTING_MASTERY_CONFIG,
} as const

// Re-export schema types and utilities from @domain/schemas
export type { HomeSectionType, SectionRenderMode } from '@domain/schemas'

export {
  zDashboardFilters,
  zIconConfig,
  getSectionSchema,
  getSubTypeSchema,
  getZodSchema,
  validateSection,
  sectionSchemaRegistry,
} from '@domain/schemas'
export {
  mapConfigToMastery,
  mapConfigToLegacy,
  toMasterySectionType,
  toLegacySectionType,
} from './section-type-mapping'
