import {
  DEFAULT_CONFIGS,
  type HomeConfig,
  type MenuConfig,
} from '@domain/configs'

/** Tryyb home layout — multiple sections for drag-and-drop demo */
export const DEMO_HOME_CONFIG: HomeConfig = {
  ...DEFAULT_CONFIGS.HOME_CONFIG,
  id: 'demo-home-001',
  config_version: '1',
  sections: [
    {
      id: 'welcome',
      section_type: 'welcome',
      metadata: {
        display_name: 'Welcome',
        description: 'Customize this landing section for your learners.',
        bgColor: 'grey',
      },
      section_data: {
        welcomeText: 'Welcome back,',
        welcomeUser: true,
        description:
          'This is a portfolio demo — drag sections in the layout builder to reorder.',
        buttons: [
          {
            sub_type: 'external-link',
            url: '/domain-manager',
            buttonVariant: 'primary',
            textOverride: 'Explore training',
            buttonSize: 'small',
            target: '_self',
          },
        ],
        direction: 'row',
        flow: 'forward',
      },
      layout_position: { areaName: 'welcome' },
    },
    {
      id: 'training',
      section_type: 'next-training',
      metadata: {
        display_name: 'Continue Learning',
        description: 'Highlight assigned training.',
        bgColor: 'transparent',
      },
      section_data: {
        title: 'Your assignments',
        showDueDate: true,
        maxItems: 4,
      },
      layout_position: { areaName: 'training' },
    },
    {
      id: 'links',
      section_type: 'button-list',
      metadata: {
        display_name: 'Quick Links',
        description: 'Shortcut buttons for common destinations.',
        bgColor: 'transparent',
      },
      section_data: {
        title: 'Quick links',
        buttons: [
          {
            sub_type: 'external-link',
            textOverride: 'Teamboard',
            url: '#',
            buttonVariant: 'secondary',
            buttonSize: 'small',
            target: '_self',
          },
          {
            sub_type: 'external-link',
            textOverride: 'Library',
            url: '#',
            buttonVariant: 'secondary',
            buttonSize: 'small',
            target: '_self',
          },
        ],
        direction: 'row',
        flow: 'forward',
      },
      layout_position: { areaName: 'links' },
    },
  ],
  layout: {
    areas_by_name: [
      [{ name: 'welcome', columnSpan: 12 }],
      [
        { name: 'training', columnSpan: 8 },
        { name: 'links', columnSpan: 4 },
      ],
    ],
    columns: 12,
  },
}

export const DEMO_MASTERY_CONFIG: HomeConfig = {
  ...DEFAULT_CONFIGS.MASTERY_CONFIG,
  id: 'demo-mastery-001',
}

export const DEMO_MENU_CONFIG: MenuConfig = {
  version: '3',
  type: 'desktop',
  betaLinkBehavior: 'show-both',
  primaryThemeColor: '#3b82f6',
  backgroundColor: 'var(--text-white)',
  color: 'var(--text-black)',
  topButtons: [
    {
      __NAME: 'Home',
      title: 'Home',
      type: 'link',
      href: '/start',
      hideIcon: true,
    },
    {
      __NAME: 'Training',
      title: 'Training',
      type: 'link',
      href: '/training',
      hideIcon: true,
    },
  ],
  toggleSections: [
    {
      _id: 'resources',
      title: 'Resources',
      ccIconName: 'folder-open',
      hideIcon: false,
      description: 'Helpful links for your team',
      categories: [
        {
          _id: 'general',
          title: 'General',
          description: '',
          buttons: [
            {
              type: 'menu-item',
              functionID: 67,
              title: 'Go To Training',
              asTitle: true,
            },
            {
              type: 'menu-item',
              functionID: 89,
              title: 'My Account',
              asTitle: false,
            },
          ],
        },
      ],
    },
  ],
  userMenuItems: [],
}
