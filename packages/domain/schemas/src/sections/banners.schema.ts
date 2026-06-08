import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for banners sections
export const DEFAULT_COLUMN_SPAN = 12 as const

// Base banner item schema
const baseBannerSchema = z.object({
  imageID: z
    .number()
    .int()
    .nonnegative()
    .describe('Banner background image attachment ID (jpg, png, etc.)'),
  urlName: z.string().min(1).describe('Banner title'),
  subtitle: z
    .string()
    .optional()
    .describe('Optional subtitle (hidden on mobile)'),
  interactionType: z
    .enum(['button', 'banner'])
    .default('banner')
    .describe('Interaction type: button (click button) or banner (click entire banner)'),
  buttonLabel: z
    .string()
    .optional()
    .describe('Button label text (only used when interactionType is "button")'),
  target: z
    .enum(['_self', '_blank', '_top'])
    .default('_blank')
    .optional()
    .describe('Link target behavior'),
})

// Menu item banner
const menuItemBannerSchema = baseBannerSchema.extend({
  sub_type: z.literal('menu-item').default('menu-item'),
  functionID: z.number().int().positive().optional(),
})

// Custom tab banner
const customTabBannerSchema = baseBannerSchema.extend({
  sub_type: z.literal('custom-tab').default('custom-tab'),
  traitID: z.number().int().positive().optional(),
})

// External link banner
const externalLinkBannerSchema = baseBannerSchema.extend({
  sub_type: z.literal('external-link').default('external-link'),
  url: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .describe('External URL'),
})

// Lesson banner
const lessonBannerSchema = baseBannerSchema.extend({
  sub_type: z.literal('lesson').default('lesson'),
  lessonID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Lesson ID reference - Lesson asset to link to'),
})

// Union of all banner types
const bannerItemSchema = z.discriminatedUnion('sub_type', [
  menuItemBannerSchema,
  customTabBannerSchema,
  externalLinkBannerSchema,
  lessonBannerSchema,
])

// Main banners schema
const bannersSchema = z.object({
  autoPlay: z.boolean().default(true).optional().describe('Autoplay'),
  slideDuration: z
    .number()
    .int()
    .positive()
    .default(3)
    .optional()
    .describe('Duration in seconds between slide transitions'),
  transitionType: z
    .enum(['slide', 'fade', 'split'])
    .default('slide')
    .optional()
    .describe('Transition animation type'),
  banners: z.array(bannerItemSchema).default([]).describe('List of banners'),
})

// Export schemas
export {
  bannersSchema,
  bannerItemSchema,
  menuItemBannerSchema,
  customTabBannerSchema,
  externalLinkBannerSchema,
  lessonBannerSchema,
}

// Type inference
export type BannersSectionData = z.infer<typeof bannersSchema>
export type BannerItem = z.infer<typeof bannerItemSchema>
export type MenuItemBanner = z.infer<typeof menuItemBannerSchema>
export type CustomTabBanner = z.infer<typeof customTabBannerSchema>
export type ExternalLinkBanner = z.infer<typeof externalLinkBannerSchema>
export type LessonBanner = z.infer<typeof lessonBannerSchema>

// Section schema definition
export const bannersSchema_definition: SectionSchemaDefinition = {
  section_type: 'banners',
  label: 'Banners',
  description:
    'Display full-width banner images with titles and optional buttons',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: bannersSchema,
  display_groups: [
    {
      title: 'Carousel Settings',
      properties: ['autoPlay', 'slideDuration', 'transitionType'],
    },
    {
      title: 'Banners',
      properties: ['banners'],
    },
  ],
}
