import {
  DEFAULT_CONFIGS,
  type HomeConfig,
  type MenuConfig,
} from '@domain/configs'
import { demoAssets } from '../../demo/demoAssetPaths'
import { DEMO_SECTION_IMAGE_IDS } from './demoLibraryImages'

const { bannerTop, bannerSecondary, quad1, quad2, quad3, quad4, footer } =
  DEMO_SECTION_IMAGE_IDS

/** Columbia Bank–themed Tryyb home (live and draft share the same layout). */
export const DEMO_COLUMBIA_TRYYB_CONFIG: HomeConfig = {
  ...DEFAULT_CONFIGS.HOME_CONFIG,
  id: '551',
  config_version: '1',
  sections: [
    {
      id: 'banners',
      section_type: 'banners',
      metadata: {
        display_name: 'Banners',
        description: 'Hero carousel — Columbia Bank welcome and resources.',
        bgColor: 'transparent',
        padding: 'none',
      },
      section_data: {
        autoPlay: true,
        slideDuration: 6,
        transitionType: 'fade',
        banners: [
          {
            sub_type: 'menu-item',
            imageID: bannerTop,
            urlName: '',
            subtitle: '',
            interactionType: 'banner',
          },
          {
            sub_type: 'menu-item',
            imageID: bannerSecondary,
            urlName: '',
            subtitle: '',
            interactionType: 'banner',
          },
        ],
      },
      layout_position: { areaName: 'banners' },
    },
    {
      id: 'intro-text',
      section_type: 'text',
      metadata: {
        display_name: 'Text',
        description: 'Intro copy below the banner.',
        bgColor: 'transparent',
      },
      section_data: {
        content:
          '# Welcome\n\nWelcome to your resource hub. You can use markdown here to create headings, paragraphs, links, and lists.',
      },
      layout_position: { areaName: 'intro-text' },
    },
    {
      id: 'more-info-button',
      section_type: 'button',
      metadata: {
        display_name: 'Button section',
        description: 'More info call-to-action.',
        bgColor: 'transparent',
      },
      section_data: {
        sub_type: 'external-link',
        url: ' ',
        textOverride: 'More info',
        buttonVariant: 'neutral',
      },
      layout_position: { areaName: 'more-info-button' },
    },
    {
      id: 'quad-links',
      section_type: 'items-group',
      metadata: {
        display_name: 'Quick Access',
        description: 'Four-up link grid with tile images.',
        bgColor: 'transparent',
        padding: 'none',
      },
      section_data: {
        flow: 'row',
        alignment: 'center-center',
        buttonWidth: 'auto',
        items: [
          {
            sub_type: 'external-link',
            icon_display: 'background',
            iconOverride: quad1,
          },
          {
            sub_type: 'external-link',
            icon_display: 'background',
            iconOverride: quad2,
          },
          {
            sub_type: 'external-link',
            icon_display: 'background',
            iconOverride: quad3,
          },
          {
            sub_type: 'external-link',
            icon_display: 'background',
            iconOverride: quad4,
          },
        ],
      },
      layout_position: { areaName: 'quad' },
    },
    {
      id: 'footer',
      section_type: 'link',
      metadata: {
        display_name: 'Footer',
        description: 'Full-width footer graphic.',
        bgColor: 'transparent',
        bgImage: footer,
        padding: 'none',
        rounding: 'none',
      },
      section_data: {
        sub_type: 'external-link',
        url: 'https://www.columbiabank.com',
        icon_display: 'none',
        textOverride: '\u200B',
        target: '_blank',
      },
      layout_position: { areaName: 'footer' },
    },
  ],
  layout: {
    areas_by_name: [
      [{ name: 'banners', columnSpan: 12 }],
      [
        { name: 'intro-text', columnSpan: 8 },
        { name: 'more-info-button', columnSpan: 4 },
      ],
      [{ name: 'quad', columnSpan: 12 }],
      [{ name: 'footer', columnSpan: 12 }],
    ],
    columns: 12,
    background_image_url: demoAssets.bg.blueTopDown,
    background_image_styles: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  },
}

export const DEMO_TRYYB_LIVE_CONFIG: HomeConfig = DEMO_COLUMBIA_TRYYB_CONFIG

export const DEMO_TRYYB_DRAFT_CONFIG: HomeConfig = DEMO_COLUMBIA_TRYYB_CONFIG

/** @deprecated Use DEMO_TRYYB_LIVE_CONFIG */
export const DEMO_HOME_CONFIG: HomeConfig = DEMO_TRYYB_LIVE_CONFIG

const DEMO_HOME_BACKGROUND_STYLES = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
} as const

function createDemoDefaultHomeConfig(
  domainId: string,
  backgroundImageUrl: string,
): HomeConfig {
  return {
    ...DEFAULT_CONFIGS.HOME_CONFIG,
    id: domainId,
    layout: {
      ...DEFAULT_CONFIGS.HOME_CONFIG.layout,
      background_image_url: backgroundImageUrl,
      background_image_styles: { ...DEMO_HOME_BACKGROUND_STYLES },
    },
  }
}

/** Acme Learning Co. — default welcome layout with Red Star background. */
export const DEMO_ACME_HOME_CONFIG: HomeConfig = createDemoDefaultHomeConfig(
  '1001',
  demoAssets.bg.redTopDown,
)

/** Northwind Academy — default welcome layout with Prism background. */
export const DEMO_NORTHWIND_HOME_CONFIG: HomeConfig = createDemoDefaultHomeConfig(
  '1002',
  demoAssets.bg.tryybBack,
)

export const DEMO_MASTERY_CONFIG: HomeConfig = {
  ...DEFAULT_CONFIGS.MASTERY_CONFIG,
  id: 'demo-mastery-001',
}

export const DEMO_MENU_CONFIG: MenuConfig = {
  version: '3',
  type: 'desktop',
  betaLinkBehavior: 'show-both',
  primaryThemeColor: '#006B54',
  backgroundColor: '#006B54',
  color: '#ffffff',
  topButtons: [],
  toggleSections: [
    {
      _id: 'personal',
      title: 'Personal',
      hideIcon: true,
      description: 'Personal banking products and services',
      categories: [
        {
          _id: 'personal-banking',
          title: 'Banking',
          description: '',
          buttons: [
            { type: 'link', title: 'Checking', href: '#', hideIcon: true },
            { type: 'link', title: 'Savings', href: '#', hideIcon: true },
            { type: 'link', title: 'Credit Cards', href: '#', hideIcon: true },
          ],
        },
        {
          _id: 'personal-borrow',
          title: 'Borrowing',
          description: '',
          buttons: [
            { type: 'link', title: 'Home Loans', href: '#', hideIcon: true },
            { type: 'link', title: 'Auto Loans', href: '#', hideIcon: true },
          ],
        },
      ],
    },
    {
      _id: 'business',
      title: 'Business',
      hideIcon: true,
      description: 'Solutions for business owners',
      categories: [
        {
          _id: 'business-banking',
          title: 'Business Banking',
          description: '',
          buttons: [
            { type: 'link', title: 'Checking', href: '#', hideIcon: true },
            { type: 'link', title: 'Savings', href: '#', hideIcon: true },
            { type: 'link', title: 'Credit Cards', href: '#', hideIcon: true },
          ],
        },
        {
          _id: 'business-services',
          title: 'Services',
          description: '',
          buttons: [
            { type: 'link', title: 'Merchant Services', href: '#', hideIcon: true },
            { type: 'link', title: 'Payroll', href: '#', hideIcon: true },
          ],
        },
      ],
    },
    {
      _id: 'commercial',
      title: 'Commercial',
      hideIcon: true,
      description: 'Commercial banking and lending',
      categories: [
        {
          _id: 'commercial-lending',
          title: 'Lending',
          description: '',
          buttons: [
            { type: 'link', title: 'Commercial Real Estate', href: '#', hideIcon: true },
            { type: 'link', title: 'Lines of Credit', href: '#', hideIcon: true },
          ],
        },
        {
          _id: 'commercial-treasury',
          title: 'Treasury',
          description: '',
          buttons: [
            { type: 'link', title: 'Cash Management', href: '#', hideIcon: true },
            { type: 'link', title: 'Fraud Prevention', href: '#', hideIcon: true },
          ],
        },
      ],
    },
    {
      _id: 'wealth-management',
      title: 'Wealth Management',
      hideIcon: true,
      description: 'Planning and investment services',
      categories: [
        {
          _id: 'wealth-planning',
          title: 'Planning',
          description: '',
          buttons: [
            { type: 'link', title: 'Financial Planning', href: '#', hideIcon: true },
            { type: 'link', title: 'Retirement', href: '#', hideIcon: true },
          ],
        },
        {
          _id: 'wealth-investing',
          title: 'Investing',
          description: '',
          buttons: [
            { type: 'link', title: 'Investment Management', href: '#', hideIcon: true },
            { type: 'link', title: 'Trust Services', href: '#', hideIcon: true },
          ],
        },
      ],
    },
    {
      _id: 'about-us',
      title: 'About Us',
      hideIcon: true,
      description: 'Company information and resources',
      categories: [
        {
          _id: 'about-company',
          title: 'Company',
          description: '',
          buttons: [
            { type: 'link', title: 'Who We Are', href: '#', hideIcon: true },
            { type: 'link', title: 'Careers', href: '#', hideIcon: true },
            { type: 'link', title: 'Locations', href: '#', hideIcon: true },
          ],
        },
        {
          _id: 'about-community',
          title: 'Community',
          description: '',
          buttons: [
            { type: 'link', title: 'Community Impact', href: '#', hideIcon: true },
            { type: 'link', title: 'News & Insights', href: '#', hideIcon: true },
          ],
        },
      ],
    },
  ],
  userMenuItems: [],
}
