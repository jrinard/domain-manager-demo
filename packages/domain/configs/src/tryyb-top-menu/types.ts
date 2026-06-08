export type MenuButtonDisplayAs = 'default' | 'title' | 'text-only'
export type MenuCategoryLayout = 'default' | 'featured' | 'compact'

export interface FeaturedContent {
  type: 'image' | 'lesson'
  courseItemID?: number
  /** @deprecated Use courseItemID — resolved from libraryImages at runtime */
  url?: string
  /** @deprecated Use courseItemID — resolved from libraryLessons at runtime */
  lessonID?: number
}

export interface MenuButton {
  functionID?: number
  traitID?: number
  asTitle?: boolean
  displayAs?: MenuButtonDisplayAs
  hideIcon?: boolean
  title?: string
  description?: string
  ccIconName?: string
  iconPath?: string
  iconPathLarge?: string
  iconRightPath?: string
  type: 'menu-item' | 'custom-tab' | 'link' | 'text-only'
  __NAME?: string
  href?: string
}

export interface MenuCategory {
  _id: string
  title: string
  description: string
  buttons: MenuButton[]
  _layout?: MenuCategoryLayout
  backgroundColor?: string
  featuredContent?: FeaturedContent
}

export interface ToggleSection {
  _id: string
  _type?: string
  title: string
  description: string
  ccIconName?: string
  hideIcon?: boolean
  hideToggleAngleIcon?: boolean
  categories: MenuCategory[]
  ifMenuItemsArePresent?: number[]
}

export interface IconOverride {
  functionID: number
  iconPath?: string
  iconPathLarge?: string
}

export interface TopBarStyleOverrides {
  backgroundImage?: string
  backgroundColor?: string
  color?: string
}

export interface ActiveSectionStyles {
  backgroundColor?: string
  color?: string
  fontWeight?: string
  borderTop?: string
  borderImage?: string
  borderImageSlice?: number
  borderImageOutset?: number
  borderImageRepeat?: string
  borderImageSource?: string
}

export interface MenuConfig {
  version: string
  type: 'desktop' | 'mobile' | 'tablet'
  betaLinkBehavior?: string
  primaryThemeColor?: string
  backgroundColor?: string
  color?: string
  topBarStyleOverrides?: TopBarStyleOverrides
  activeSectionStyles?: ActiveSectionStyles
  iconOverrides?: Record<string, IconOverride>
  topButtons: MenuButton[]
  toggleSections: ToggleSection[]
  userMenuItems: MenuButton[]
}
