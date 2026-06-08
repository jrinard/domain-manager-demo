import { axiosInstance } from '../axios'
import { get } from 'lodash'

import {
  getHomeConfigPath,
  getPreviewHomeConfigPath,
} from './getHomeConfigPath'

import type { HomeConfig } from './types'

const NOT_FOUND_CONFIG: HomeConfig = {
  config_version: '1',
  id: '404',
  sections: [
    {
      id: '1',
      section_type: 'welcome',
      metadata: {
        display_name: 'Welcome',
        description:
          'Your domain is ready to customize! Add sections to highlight what matters!',
        bgColor: 'grey',
      },
      section_data: {
        welcomeText: 'Welcome!',
        welcomeUser: false,
        description:
          'Your domain is ready to customize! Add sections to highlight what matters!',
        buttons: [
          {
            sub_type: 'external-link',
            url: '/x/domain-manager',
            buttonVariant: 'primary',
            textOverride: 'Customize Sections',
            buttonSize: 'small',
            target: '_self',
          },
        ],
        direction: 'row',
        flow: 'forward',
      },
      layout_position: {
        areaName: 'welcome',
      },
    },
  ],
  layout: {
    areas_by_name: [
      [
        {
          name: 'welcome',
          columnSpan: 12,
        },
      ],
    ],
    columns: 12,
  },
  tablet_layout: {
    areas_by_name: [
      [
        {
          name: 'welcome',
          columnSpan: 9,
        },
      ],
    ],
    columns: 9,
  },
  mobile_layout: {
    areas_by_name: [
      [
        {
          name: 'welcome',
          columnSpan: 6,
        },
      ],
    ],
    columns: 6,
  },
}

const FAILED_TO_LOAD_CONFIG: HomeConfig = {
  config_version: '1',
  id: '500',
  sections: [
    {
      id: '1',
      section_type: 'welcome',
      metadata: {
        display_name: 'Welcome',
        description:
          'Unable to load configuration. Your domain is ready to customize — open the editor to add a logo, welcome message, and featured sections.',
        bgColor: 'grey',
      },
      section_data: {
        welcomeText: 'Domain is successfully setup!',
        welcomeUser: true,
        description:
          'Unable to load configuration. Your domain is ready to customize — open the editor to add a logo, welcome message, and featured sections.',
        buttons: [
          {
            sub_type: 'external-link',
            url: '/domain-manager',
            buttonVariant: 'primary',
            textOverride: 'Customize Domain',
            buttonSize: 'small',
            target: '_self',
          },
        ],
        direction: 'row',
        flow: 'forward',
      },
      layout_position: {
        areaName: 'welcome',
      },
    },
  ],
  layout: {
    areas_by_name: [
      [
        {
          name: 'welcome',
          columnSpan: 12,
        },
      ],
    ],
    columns: 12,
  },
}

export const CLEAN_HOME_CONFIG_DEFAULT: HomeConfig = {
  config_version: '1',
  id: '001',
  sections: [
    {
      id: '1',
      section_type: 'welcome',
      metadata: {
        display_name: 'Welcome',
        description:
          'Your domain is ready to customize! Add a logo, and custom sections to highlight what matters!',
        bgColor: 'grey',
      },
      section_data: {
        welcomeText: 'Welcome,',
        welcomeUser: true,
        description:
          'Your domain is ready to customize! Add a logo, and custom sections to highlight what matters!',
        buttons: [
          {
            sub_type: 'external-link',
            url: '/domain-manager', //TODO we need to get domainID and use domain-manager/551/tryyb
            buttonVariant: 'primary',
            textOverride: 'Customize Domain',
            buttonSize: 'small',
            target: '_self',
          },
        ],
        direction: 'row',
        flow: 'forward',
      },
      layout_position: {
        areaName: 'welcome',
      },
    },
  ],
  layout: {
    areas_by_name: [
      [
        {
          name: 'welcome',
          columnSpan: 12,
        },
      ],
    ],
    columns: 12,
  },
}
export const STARTING_MASTERY_CONFIG: HomeConfig = {
  config_version: '1',
  id: '001',
  sections: [
    {
      id: '1',
      section_type: 'mastery-header',
      metadata: {
        display_name: 'Header',
        bgColor: 'transparent',
      },
      section_data: {
        largeTagline: 'Welcome to Mastery!',
        quoteText:
          'Transform yourself and your team through the power of Belief, Operational Effectiveness and Leadership',
        quoteFrom: '',
        showButton: true,
        buttonLabel: 'Welcome',
        buttonVariant: 'primary',
      },
      layout_position: {
        areaName: 'header',
      },
    },
  ],
  layout: {
    areas_by_name: [
      [
        {
          name: 'header',
          columnSpan: 12,
        },
      ],
    ],
    columns: 12,
  },
  tablet_layout: {
    areas_by_name: [
      [
        {
          name: 'header',
          columnSpan: 9,
        },
      ],
    ],
    columns: 9,
  },
  mobile_layout: {
    areas_by_name: [
      [
        {
          name: 'header',
          columnSpan: 6,
        },
      ],
    ],
    columns: 6,
  },
}

export async function readHomeConfig(domainID: number) {
  if (!domainID) {
    throw new Error('Domain ID is required')
  }

  const path = getHomeConfigPath(domainID)

  const response = await axiosInstance
    .get<HomeConfig>(`${path}?r=${Date.now()}`)
    .catch((err: unknown) => {
      if (get(err, 'response.status') === 404) {
        return { data: NOT_FOUND_CONFIG }
      }

      return { data: FAILED_TO_LOAD_CONFIG }
    })

  return response.data
}

export async function readPreviewHomeConfig(domainID: number) {
  if (!domainID) {
    throw new Error('Domain ID is required')
  }

  const path = getPreviewHomeConfigPath(domainID)

  const response = await axiosInstance.get<HomeConfig>(
    `${path}?r=${Date.now()}`,
  )

  return response.data
}
