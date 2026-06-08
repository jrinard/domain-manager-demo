import type { HomeConfig } from '@domain/configs'

/**
 * List of available section types for the layout builder
 */
export const sectionList = [
  {
    id: 'text',
    label: 'Text',
    defaultColumnSpan: 6,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 160,
  },
  {
    id: 'banners',
    label: 'Banners',
    defaultColumnSpan: 12,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
  },
  {
    id: 'featured-content',
    label: 'Featured Content',
    defaultColumnSpan: 12,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
  },
  {
    id: 'title',
    label: 'Title',
    defaultColumnSpan: 12,
    defaultRowSpan: 1,
    scaleFactor: 1,
    baseHeight: 120,
  },
  {
    id: 'link',
    label: 'Link',
    defaultColumnSpan: 3,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 120,
  },
  {
    id: 'r3',
    label: 'R3',
    defaultColumnSpan: 3,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
  },
  {
    id: 'r3-heatmap',
    label: 'R3 Heatmap',
    defaultColumnSpan: 3,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
  },
  {
    id: 'carousels',
    label: 'Carousels',
    defaultColumnSpan: 12,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
  },
  {
    id: 'cvent',
    label: 'Cvent',
    defaultColumnSpan: 9,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
  },
  {
    id: 'stats-count',
    label: 'Stats Count',
    defaultColumnSpan: 3,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 120,
  },
  // Disabled sections (not yet implemented)
  {
    id: 'chart-section',
    label: 'Chart Section',
    defaultColumnSpan: 6,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
    disabled: true,
  },
  {
    id: 'reporting-training',
    label: 'Reporting Training',
    defaultColumnSpan: 6,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
    disabled: true,
  },
  {
    id: 'activity-table',
    label: 'Activity Table',
    defaultColumnSpan: 12,
    defaultRowSpan: 1,
    scaleFactor: 1.0,
    baseHeight: 280,
    disabled: true,
  },
]

/**
 * Default home configuration used as fallback
 */
export const defaultHomeConfig: HomeConfig = {
  config_version: '1',
  id: '1.1',
  layout: {
    columns: 12,
    areas_by_name: [
      [{ name: 'title', columnSpan: 12 }],
      [{ name: 'carousels', columnSpan: 12 }],
      [
        { name: 'cvent', columnSpan: 9 },
        { name: 'r3-quadrants', columnSpan: 3 },
      ],
      [
        { name: 'link', columnSpan: 3 },
        { name: 'stats-count', columnSpan: 3 },
      ],
    ],
  },
  sections: [
    {
      id: 'link',
      section_type: 'link',
      metadata: {
        display_name: 'Link',
        bgColor: 'transparent',
      },
      section_data: {
        sub_type: 'menu-item',
        functionID: 49,
        icon_display: 'inline',
      },
      layout_position: {
        areaName: 'link',
        columnSpan: 3,
        rowSpan: 1,
      },
    },

    {
      id: 'stats-count',
      section_type: 'stats-count',
      metadata: {
        display_name: 'Stats Count',
        bgColor: 'transparent',
      },
      section_data: {
        sub_type: 'active-employees',
        icon_name: 'trophy-outline',
        iconColorScheme: 'purple',
        teamID: 551,
        daysCount: 30,
      },
      layout_position: {
        areaName: 'stats-count',
        columnSpan: 3,
        rowSpan: 1,
      },
    },
    {
      id: 'title',
      section_type: 'title',
      metadata: {
        display_name: 'Title',
        description: 'Home of all your 10X tools',
        bgColor: 'transparent',
      },
      section_data: {
        title: '10X Business Academy',
        sub_type: 'team',
      },
      layout_position: { areaName: 'title' },
    },
    {
      id: 'carousels',
      section_type: 'training-carousels',
      metadata: {
        display_name: 'Live Call Recordings',
        bgColor: 'transparent',
      },
      section_data: {
        categories: [{ catalogID: 2856383 }],
        continue_watching_scope: 'not-present-in-categories',
      },
      layout_position: { areaName: 'carousels' },
    },
    {
      id: 'cvent',
      section_type: 'cvent',
      metadata: { display_name: 'Cvent' },
      section_data: {},
      layout_position: { areaName: 'cvent' },
    },
    {
      id: 'r3-quadrants',
      section_type: 'r3-quadrants',
      metadata: { display_name: 'R3' },
      section_data: {},
      layout_position: { areaName: 'r3-quadrants' },
    },

    {
      id: 'link',
      section_type: 'link',
      metadata: {
        display_name: 'Link Name',
        bgColor: 'transparent',
      },
      section_data: {
        sub_type: 'menu-item',
        functionID: 49,
        icon_display: 'none',
      },
      layout_position: { areaName: 'link' },
    },

    {
      id: 'stats-count',
      section_type: 'stats-count',
      metadata: {
        display_name: 'Stats Count',
        bgColor: 'transparent',
      },
      section_data: {
        sub_type: 'active-employees',
        icon_name: 'people-outline',
        iconColorScheme: 'blue',
        daysCount: 30,
      },
      layout_position: { areaName: 'stats-count' },
    },
  ],
}

/**
 * Helper function to get default icon based on stats sub-type
 */
export const getDefaultIconForSubType = (subType: string): string => {
  switch (subType) {
    case 'active-employees':
      return 'people-outline'
    case 'courses-completed':
      return 'trophy-outline'
    case 'lesson-completions':
      return 'videocam-outline'
    default:
      return 'people-outline'
  }
}
