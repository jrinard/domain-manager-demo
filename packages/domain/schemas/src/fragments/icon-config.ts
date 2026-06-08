import { z, zIconColorScheme } from '@spacedock/data-validation'

export const zIconConfig = z.object({
  icon_name: z
    .enum([
      'people-outline',
      'trophy-outline',
      'check-circle-outline',
      'videocam-outline',
    ])
    .optional()
    .describe('Icon name'),

  iconColorScheme: zIconColorScheme,
})

