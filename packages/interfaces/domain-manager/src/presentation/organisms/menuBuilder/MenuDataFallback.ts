import { MenuConfig } from '@domain/configs'

// Temporary fallback until real endpoint is wired
export const menuDataFallbackCV: MenuConfig = {
  version: '3',
  type: 'desktop',
  betaLinkBehavior: 'show-both',
  primaryThemeColor: '#FCAE1E',
  backgroundColor: 'var(--text-white)',
  color: 'var(--text-black)',
  topBarStyleOverrides: {
    backgroundImage:
      'linear-gradient(to bottom right, #fff, #fff, rgba(252, 174, 30, 0.65))',
    backgroundColor: 'var(--text-white)',
    color: 'var(--text-black)',
  },
  activeSectionStyles: {
    backgroundColor: 'var(--text-white)',
    color: 'var(--text-black)',
    fontWeight: 'bolder',
    borderTop: '4px solid transparent',
    borderImage:
      'linear-gradient(to right, rgba(252, 174, 30, 0.25), #000, rgba(252, 174, 30, 0.25))',
    borderImageSlice: 1,
    borderImageOutset: 0,
    borderImageRepeat: 'stretch',
    borderImageSource:
      'linear-gradient(to right, rgba(252, 174, 30, 0.25), #000, rgba(252, 174, 30, 0.25))',
  },
  topButtons: [
    {
      __NAME: 'Home',
      title: 'Home',
      type: 'link',
      href: '/v25/nl/#/start',
      hideIcon: true,
    },
  ],
  toggleSections: [
    {
      _id: '',
      title: 'Training',
      ccIconName: 'list-ul',
      hideIcon: true,
      description: '',
      categories: [
        {
          _id: '',
          title: '',
          description: '',
          buttons: [
            {
              type: 'menu-item',
              functionID: 67,
              title: 'Go To Training',
              asTitle: true,
              iconRightPath:
                '/v2/domains/1825957/images/top-menu-icons/External Link.png',
            },
            {
              type: 'menu-item',
              functionID: 156,
              title: '10X Playbook',
              asTitle: true,
              iconRightPath:
                '/v2/domains/1825957/images/top-menu-icons/External Link.png',
            },
            {
              type: 'custom-tab',
              traitID: 807,
              asTitle: true,
              iconRightPath:
                '/v2/domains/1825957/images/top-menu-icons/External Link.png',
            },
            {
              traitID: 877,
              __NAME: '10X360',
              type: 'custom-tab',
            },
            {
              traitID: 876,
              __NAME: 'Objections w/BD',
              type: 'custom-tab',
            },
          ],
        },
        {
          _id: '',
          title: 'Live Call Recordings',
          description: '',
          buttons: [
            {
              type: 'custom-tab',
              traitID: 810,
            },
            {
              type: 'custom-tab',
              traitID: 811,
            },
            {
              type: 'custom-tab',
              traitID: 812,
            },
          ],
        },
      ],
    },
    {
      _id: '',
      title: 'People & Leadership',
      description: '',
      categories: [
        {
          _id: '',
          title: 'People',
          description: '',
          buttons: [
            {
              functionID: 114,
              description: '',
              title: 'R3',
              type: 'menu-item',
            },
            {
              functionID: 118,
              description: '',
              title: 'PPF Goals',
              type: 'menu-item',
            },
          ],
        },
        {
          _id: '',
          title: 'Leadership',
          description: '',
          buttons: [
            {
              traitID: 0,
              description: '',
              __NAME: '10X Owner',
              type: 'menu-item',
            },
            {
              traitID: 804,
              description: '',
              __NAME: '10X Employee',
              type: 'menu-item',
            },
            {
              traitID: 869,
              description: '',
              __NAME: '10X Scale',
              type: 'menu-item',
            },
            {
              traitID: 741,
              description: '',
              __NAME: 'BMLP Retreat',
              type: 'menu-item',
            },
            {
              traitID: 798,
              description: '',
              __NAME: 'BMLP Revisit',
              type: 'menu-item',
            },
          ],
        },
        {
          _id: '',
          title: 'Communication',
          description: '',
          buttons: [
            {
              functionID: 37,
              description: '',
              title: 'Inbox',
              type: 'menu-item',
            },
            {
              functionID: 49,
              description: '',
              title: 'Teamboards',
              type: 'menu-item',
            },
            {
              functionID: 50,
              description: '',
              title: 'News',
              type: 'menu-item',
            },
            {
              traitID: 6441,
              description: '',
              __NAME: 'Slack',
              type: 'menu-item',
            },
            {
              traitID: 633,
              description: '',
              __NAME: 'Zoom',
              type: 'menu-item',
            },
          ],
        },
        {
          _id: '',
          title: 'Organizational Tools',
          description: '',
          buttons: [
            {
              functionID: 150,
              description: '',
              title: 'Projects',
              type: 'menu-item',
            },
            {
              functionID: 119,
              description: '',
              title: '10X Action Plan',
              type: 'menu-item',
            },
            {
              traitID: 947,
              description: 'New Calendar with updated UI',
              __NAME: 'Calendar Beta',
              type: 'custom-tab',
            },
            {
              functionID: 99,
              description: '',
              title: 'Calendar',
              type: 'menu-item',
            },
            {
              functionID: 73,
              description: '',
              title: "To Do's",
              type: 'menu-item',
            },
            {
              functionID: 48,
              description: '',
              title: 'Library',
              type: 'menu-item',
            },
            {
              traitID: 656,
              description: '',
              __NAME: 'Asana',
              type: 'custom-tab',
            },
          ],
        },
      ],
    },
    {
      _id: '',
      title: 'Marketing',
      description: '',
      categories: [
        {
          _id: '',
          title: 'Sales Tools',
          description: '',
          buttons: [
            {
              asTitle: true,
              iconRightPath:
                '/v2/domains/1825957/images/top-menu-icons/External Link.png',
              traitID: 808,
              description: '',
              __NAME: 'Scale CRM',
              type: 'custom-tab',
            },
            {
              asTitle: true,
              iconRightPath:
                '/v2/domains/1825957/images/top-menu-icons/External Link.png',
              traitID: 870,
              description: '',
              __NAME: 'Scale Training',
              type: 'custom-tab',
            },
            {
              asTitle: true,
              iconRightPath:
                '/v2/domains/1825957/images/top-menu-icons/External Link.png',
              traitID: 632,
              description: '',
              __NAME: 'Hubspot',
              type: 'custom-tab',
            },
          ],
        },
        {
          _id: '',
          title: 'Marketing Tools',
          description: '',
          buttons: [
            {
              traitID: 871,
              __NAME: 'Marketing Resources',
              type: 'custom-tab',
            },
            {
              traitID: 872,
              __NAME: 'Marketing Teamboards',
              type: 'custom-tab',
            },
          ],
        },
      ],
    },
    {
      _id: '',
      title: 'Learning',
      ccIconName: 'list-ul',
      hideIcon: true,
      description: '',
      categories: [
        {
          _id: '',
          title: 'Training Courses',
          description: '',
          buttons: [
            {
              traitID: 944,
              __NAME: '10X Business Academy',
              type: 'custom-tab',
            },
            {
              functionID: 67,
              __NAME: 'View All Courses',
              title: 'View All Courses',
              type: 'menu-item',
            },
            {
              traitID: 795,
              __NAME: 'CV Pro Tips',
              type: 'custom-tab',
            },
            {
              traitID: 636,
              __NAME: '10X360',
              type: 'custom-tab',
            },

            {
              traitID: 770,
              __NAME: 'Objections w/BD',
              type: 'custom-tab',
            },
            {
              traitID: 916,
              __NAME: 'Process Tracker/Trainual SSO',
              title: 'Process Tracker',
              type: 'custom-tab',
            },
          ],
        },
        {
          _id: '',
          title: 'Cardone University',
          description: '',
          buttons: [
            {
              traitID: 873,
              __NAME: 'Certications',
              type: 'custom-tab',
            },
            {
              traitID: 614,
              __NAME: 'Cardone U Courses',
              type: 'custom-tab',
            },
          ],
        },
      ],
      ifMenuItemsArePresent: [67],
    },
    {
      _id: '',
      title: 'Finance',
      ccIconName: 'list-ul',
      hideIcon: true,
      description: '',
      categories: [
        {
          _id: '',
          title: '10X Finance Service',
          description: '',
          buttons: [
            {
              traitID: 816,
              title: 'CV',
              __NAME: 'CV Fast Finance',
              type: 'custom-tab',
            },
            {
              traitID: 875,
              __NAME: 'Financial Resources',
              type: 'custom-tab',
            },
          ],
        },
      ],
      ifMenuItemsArePresent: [60],
    },
    {
      _id: '',
      _type: 'manage',
      title: 'Manage',
      ccIconName: 'list-ul',
      hideIcon: true,
      description: '',
      categories: [],
      ifMenuItemsArePresent: [55],
    },
  ],
  userMenuItems: [],
}

export const menuDataFallbackCTTI: MenuConfig = {
  version: '3',
  type: 'desktop',
  betaLinkBehavior: 'show-both',
  primaryThemeColor: '#eb3324',
  topBarStyleOverrides: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    color: 'var(--text-white)',
  },
  activeSectionStyles: {
    backgroundColor:
      'linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.25))',
    color: 'var(--text-white)',
  },
  iconOverrides: {
    114: {
      functionID: 114,
      iconPath: '/v2/domains/551/images/top-menu-icons/r3-logo.png',
      iconPathLarge: '/v2/domains/551/images/top-menu-icons/CEO Icons_R3.png',
    },
    118: {
      functionID: 118,
      iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/PPF.png',
      iconPathLarge: '/v2/domains/551/images/top-menu-icons/ppf-logo.png',
    },
    24: {
      functionID: 24,
      iconPath:
        '/v2/domains/551/images/top-menu-icons/small-icons/statistics.png',
      iconPathLarge: '/v2/domains/551/images/top-menu-icons/Statistics.png',
    },
  } as any,
  topButtons: [
    {
      __NAME: 'Home',
      title: 'Home',
      type: 'link',
      href: '/v25/nl/#/start',
      hideIcon: true,
    },
    {
      functionID: 67,
      __NAME: 'Training',
      title: 'Training',
      type: 'menu-item',
      href: '/v25/nl/#/mastery',
      hideIcon: true,
    },
    {
      functionID: 99,
      __NAME: 'Calendar',
      title: 'Calendar',
      type: 'link',
      href: '/v25/nl/#/calendar',
      hideIcon: true,
    },
    {
      __NAME: 'Certification',
      title: 'Certification',
      type: 'custom-tab',
      hideIcon: true,
      traitID: 848,
    },
    {
      __NAME: 'Usage Report',
      title: 'Usage Report',
      type: 'link',
      href: '/v25/nl/#/mastery/history',
      hideIcon: true,
    },
    {
      __NAME: 'My Profile',
      title: 'My Profile',
      type: 'link',
      href: '/v25/nl/#/profile',
      hideIcon: true,
    },
  ],
  toggleSections: [
    {
      _id: '',
      _type: 'manage',
      title: 'Manage',
      ccIconName: 'list-ul',
      hideIcon: true,
      description: '',
      categories: [],
      ifMenuItemsArePresent: [55],
    },
  ],
  userMenuItems: [],
}

export const EMPTY_MENU_CONFIG: MenuConfig = {
  version: '3',
  type: 'desktop',
  betaLinkBehavior: 'show-both',
  topButtons: [],
  toggleSections: [],
  userMenuItems: [],
}

export const ICON_OVERRIDES: Record<
  string,
  { functionID: number; iconPath?: string; iconPathLarge: string }
> = {
  '24': {
    functionID: 24,
    iconPath:
      '/v2/domains/551/images/top-menu-icons/small-icons/statistics.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Statistics.png',
  },
  '37': {
    functionID: 37,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/CEO Icons_inbox.png',
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/inbox.png',
  },
  '48': {
    functionID: 48,
    iconPathLarge:
      '/v2/domains/551/images/top-menu-icons/CEO Icons_library.png',
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/library.png',
  },
  '49': {
    functionID: 49,
    iconPath: '/v2/domains/551/images/top-menu-icons/Team.png',
    iconPathLarge:
      '/v2/domains/551/images/top-menu-icons/CEO Icons_teamboards.png',
  },
  '50': {
    functionID: 50,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/news.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/News.png',
  },
  '51': {
    functionID: 51,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/search.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/search-2.png',
  },
  '55': {
    functionID: 55,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/manage.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Manage.png',
  },
  '67': {
    functionID: 67,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/training.png',
    iconPathLarge:
      '/v2/domains/551/images/top-menu-icons/CEO Icons_training.png',
  },
  '68': {
    functionID: 68,
    iconPath:
      '/v2/domains/551/images/top-menu-icons/small-icons/statistics.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Statistics.png',
  },
  '73': {
    functionID: 73,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/to dos.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/CEO Icons_to do.png',
  },
  '99': {
    functionID: 99,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/events.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/CEO Icons_events.png',
  },
  '101': {
    functionID: 101,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Bug.png',
  },
  '107': {
    functionID: 107,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Team.png',
  },
  '114': {
    functionID: 114,
    iconPath: '/v2/domains/551/images/top-menu-icons/r3-logo.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/CEO Icons_R3.png',
  },
  '117': {
    functionID: 117,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/VCEP.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/VCEP-Editor.png',
  },
  '118': {
    functionID: 118,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/PPF.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/ppf-logo.png',
  },
  '119': {
    functionID: 119,
    iconPath:
      '/v2/domains/551/images/top-menu-icons/small-icons/10X Action Plan.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/10X.png',
  },
  '121': {
    functionID: 121,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Dashboard.png',
  },
  '122': {
    functionID: 122,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/news.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/News.png',
  },
  '123': {
    functionID: 123,
    iconPathLarge:
      '/v2/domains/551/images/top-menu-icons/icon-security-role.png',
  },
  '124': {
    functionID: 124,
    iconPathLarge:
      '/v2/domains/551/images/top-menu-icons/10X-Employee-Team-Plus.png',
  },
  '125': {
    functionID: 125,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Ability-List.png',
  },
  '126': {
    functionID: 126,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Event-Templates.png',
  },
  '127': {
    functionID: 127,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Courses.png',
  },
  '128': {
    functionID: 128,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Credit-Types.png',
  },
  '129': {
    functionID: 129,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Plan-Templates.png',
  },
  '130': {
    functionID: 130,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Catalog.png',
  },
  '131': {
    functionID: 131,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Catalog.png',
  },
  '132': {
    functionID: 132,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Category-Manager.png',
  },
  '133': {
    functionID: 133,
    // // href: '/v25/nl/#/exam-editor',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Exams.png',
  },
  '134': {
    functionID: 134,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Surveys.png',
  },
  '135': {
    functionID: 135,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/TPA.png',
  },
  '150': {
    functionID: 150,
    iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/projects.png',
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/Projects.png',
  },
  '155': {
    functionID: 155,
    iconPathLarge:
      '/v2/domains/551/images/top-menu-icons/icon-service-request.png',
  },
  '156': {
    functionID: 156,
    iconPathLarge: '/v2/domains/551/images/top-menu-icons/icon-playbook.png',
  },
  '161': {
    functionID: 161,
    iconPathLarge:
      '/v2/domains/551/images/top-menu-icons/icon-restore-user.png',
  },
  // // 'traitID=803': {
  // //   traitID: 803,
  // //   iconPathLarge:
  // //     '/v2/domains/551/images/top-menu-icons/lightning-light-bulb-2.png',
  // // },
  // // 'traitID=900': {
  // //   traitID: 900,
  // //   iconPathLarge:
  // //     '/v2/domains/1698652/images/top-menu/cv-tech-current-sprint.png',
  // // },
  // // 'traitID=901': {
  // //   traitID: 901,
  // //   iconPathLarge: '/v2/domains/1698652/images/top-menu/cv-tech-requests.png',
  // // },
  // // 'traitID=899': {
  // //   traitID: 899,
  // //   iconPathLarge: '/v2/domains/1698652/images/top-menu/cv-tech-roadmap.png',
  // // },
  // // 'traitID=947': {
  // //   traitID: 947,
  // //   iconPath: '/v2/domains/551/images/top-menu-icons/small-icons/events.png',
  // //   iconPathLarge: '/v2/domains/551/images/top-menu-icons/CEO Icons_events.png',
  // // },
}
