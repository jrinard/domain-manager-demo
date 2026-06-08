import { TokenName } from '@domain/styles'

interface ThemeEditorColorSection {
  title: string
  description: string
  tokens: ThemeEditorColorToken[]
}

interface ThemeEditorColorToken {
  name: TokenName
  pickerType?: 'color' | 'palette'
}

export const THEME_EDITOR_COLOR_SECTIONS: ThemeEditorColorSection[] = [
  {
    title: 'Site',
    description: 'The site-wide, High-level colors.',
    tokens: [
      {
        name: '--site-bg',
      },
      {
        name: '--site-fg',
      },
    ],
  },
  {
    title: 'Primary',
    description:
      'The primary brand color used for "Call To Action" interactive elements and important information.',
    tokens: [
      {
        name: '--primary',
        pickerType: 'color',
      },
      {
        name: '--primary-fg',
      },
      {
        name: '--primary-subtle',
      },
      {
        name: '--primary-subtle-fg',
      },
    ],
  },
  {
    title: 'BG Contrast Colors',
    description:
      'The automatically generated background colors used as subtle contrast with the Site Background.',
    tokens: [
      {
        name: '--bg-contrast-low',
      },
      {
        name: '--bg-contrast-medium',
      },
      {
        name: '--bg-contrast-high',
      },
    ],
  },
  {
    title: 'Secondary',
    description:
      'The secondary brand color used for "Neutral" buttons and information.',
    tokens: [
      {
        name: '--secondary',
      },
      {
        name: '--secondary-fg',
      },
    ],
  },
  {
    title: 'Accent & Label',
    description:
      'The accent color used for highlighting and interactive elements.',
    tokens: [
      {
        name: '--accent',
      },
      {
        name: '--label',
      },
    ],
  },
  {
    title: 'Muted',
    description:
      'The muted color used for less important information and backgrounds.',
    tokens: [
      {
        name: '--muted',
      },
      {
        name: '--muted-fg',
      },
    ],
  },
  {
    title: 'Top Menu',
    description: 'The color of the top menu bar.',
    tokens: [
      {
        name: '--topbar',
      },
      {
        name: '--topbar-fg',
      },
      {
        name: '--topbar-subtle',
      },
      {
        name: '--topbar-subtle-fg',
      },
      {
        name: '--topbar-primary',
      },
      {
        name: '--topbar-primary-fg',
      },
    ],
  },
  {
    title: 'Navigation Bars',
    description: 'The color of a Navigation bar.',
    tokens: [
      {
        name: '--navbar',
      },
      {
        name: '--navbar-fg',
      },
      {
        name: '--navbar-subtle',
      },
      {
        name: '--navbar-subtle-fg',
      },
    ],
  },
  {
    title: 'Sidebar',
    description: 'The color of a Sidebar or Side Menu.',
    tokens: [
      {
        name: '--sidebar',
      },
      {
        name: '--sidebar-fg',
      },
      {
        name: '--sidebar-subtle',
      },
      {
        name: '--sidebar-subtle-fg',
      },
      {
        name: '--sidebar-item',
      },
      {
        name: '--sidebar-item-fg',
      },
      {
        name: '--sidebar-item-subtle',
      },
      {
        name: '--sidebar-item-subtle-fg',
      },
    ],
  },
  {
    title: 'Homepage',
    description:
      'The color of the homepage, when no background image is supplied. *NOTE: By default it mirrors the background color and text color of the Site.',
    tokens: [
      {
        name: '--homepage',
      },
      {
        name: '--homepage-fg',
      },
    ],
  },
  {
    title: 'Success',
    description: 'The color of general status indicators.',
    tokens: [
      {
        name: '--success',
      },
      {
        name: '--success-fg',
      },
      {
        name: '--success-subtle',
      },
      {
        name: '--success-subtle-fg',
      },
    ],
  },
  {
    title: 'Warning',
    description: 'The color of warning status indicators.',
    tokens: [
      {
        name: '--warning',
      },
      {
        name: '--warning-fg',
      },
      {
        name: '--warning-subtle',
      },
      {
        name: '--warning-subtle-fg',
      },
    ],
  },
  {
    title: 'Danger',
    description: 'The color of danger status indicators.',
    tokens: [
      {
        name: '--danger',
      },
      {
        name: '--danger-fg',
      },
      {
        name: '--danger-subtle',
      },
      {
        name: '--danger-subtle-fg',
      },
    ],
  },
  {
    title: 'List Items',
    description: 'The color of list items, including their selected state.',
    tokens: [
      {
        name: '--list-item-odd',
      },
      {
        name: '--list-item-even',
      },
      {
        name: '--list-item-odd-selected',
      },
      {
        name: '--list-item-even-selected',
      },
    ],
  },
  {
    title: 'Chart Colors',
    description: 'The color of chart elements.',
    tokens: [
      {
        name: '--chart-1',
      },
      {
        name: '--chart-2',
      },
      {
        name: '--chart-3',
      },
      {
        name: '--chart-4',
      },
      {
        name: '--chart-5',
      },
    ],
  },
  {
    title: 'Link & TextButton',
    description:
      'The color of links and text buttons. *NOTE: The default is a static, longstanding Blue color used in the Platform.',
    tokens: [
      {
        name: '--link',
      },
      {
        name: '--link-subtle',
      },
      {
        name: '--actiontext',
      },
      {
        name: '--actiontext-subtle',
      },
    ],
  },
  {
    title: 'Asset Fallback Colors',
    description: 'The color of assets, such as icons and images.',
    tokens: [
      {
        name: '--asset',
      },
      {
        name: '--asset-fg',
      },
    ],
  },
  {
    title: 'Media Assets',
    description: 'The color of assets, such as icons and images.',
    tokens: [
      {
        name: '--asset-video',
      },
      {
        name: '--asset-video-subtle',
      },
      {
        name: '--asset-image',
      },
      {
        name: '--asset-image-subtle',
      },
      {
        name: '--asset-photoalbum',
      },
      {
        name: '--asset-photoalbum-subtle',
      },
    ],
  },
  {
    title: 'Documents',
    description: 'The color of documents, such as PDFs and Word documents.',
    tokens: [
      {
        name: '--asset-document',
      },
      {
        name: '--asset-document-subtle',
      },
      {
        name: '--asset-plaintext',
      },
      {
        name: '--asset-plaintext-subtle',
      },
      {
        name: '--asset-csv',
      },
      {
        name: '--asset-csv-subtle',
      },
      {
        name: '--asset-excel',
      },
      {
        name: '--asset-excel-subtle',
      },
      {
        name: '--asset-md',
      },
      {
        name: '--asset-md-subtle',
      },
    ],
  },
  {
    title: 'PDFs',
    description: 'The color of PDFs.',
    tokens: [
      {
        name: '--asset-pdf',
      },
      {
        name: '--asset-pdf-subtle',
      },
    ],
  },
  {
    title: 'SCORM Assets',
    description: 'The color of SCORM assets.',
    tokens: [
      {
        name: '--asset-scorm',
      },
      {
        name: '--asset-scorm-subtle',
      },
      {
        name: '--asset-elearning',
      },
      {
        name: '--asset-elearning-subtle',
      },
    ],
  },
  {
    title: 'Misc. Assets',
    description:
      'The color of miscellaneous assets, such as URLs and ZIP files.',
    tokens: [
      {
        name: '--asset-url',
      },
      {
        name: '--asset-url-subtle',
      },
      {
        name: '--asset-zip',
      },
      {
        name: '--asset-zip-subtle',
      },
    ],
  },
  {
    title: 'Platform Specific Assets',
    description: 'The color of Quickarts.',
    tokens: [
      {
        name: '--asset-quickart',
      },
      {
        name: '--asset-quickart-subtle',
      },
      {
        name: '--asset-speedsheet',
      },
      {
        name: '--asset-speedsheet-subtle',
      },
    ],
  },
]
