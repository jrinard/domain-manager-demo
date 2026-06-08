/**
 * Menu Button Type Definitions
 * Supports three kinds of buttons: custom-tab, link, and menu-item
 */

// Icon configuration options
export interface MenuIconData {
  ccIconName?: string // Icon name from icon library
  iconPath?: string // URL to icon image
  iconPathLarge?: string // URL to larger icon image
  hideIcon?: boolean // Hide the icon entirely
  iconRightPath?: string // Icon to display on right side
}

// Permission/scope configuration
export interface ScopeSpecifiers {
  roleIDsFor?: number[] // Show only for these role IDs
  roleIDsNotFor?: number[] // Hide for these role IDs
  userIDsFor?: number[] // Show only for these user IDs
  userIDsNotFor?: number[] // Hide for these user IDs
  primaryTeamIDsFor?: number[] // Show only for these team IDs
  primaryTeamIDsNotFor?: number[] // Hide for these team IDs
  ifMenuItemsArePresent?: number[] // Show only if these functionIDs exist
  ifMenuItemsAreNotPresent?: number[] // Show only if these functionIDs don't exist
  ifCustomTabsArePresent?: number[] // Show only if these traitIDs exist
  ifCustomTabsAreNotPresent?: number[] // Show only if these traitIDs don't exist
}

// Base properties shared by all button types
interface MenuButtonBase extends MenuIconData, ScopeSpecifiers {
  title?: string // Display title
  description?: string // Display description
  target?: string // Link target (_blank, _self, etc.)
  overrideIcon?: boolean // Override default icon behavior
  asTitle?: boolean // Render as title style
}

// Custom Tab Button - links to a custom tab by traitID
export interface CustomTabButton extends MenuButtonBase {
  type: 'custom-tab'
  traitID: number // REQUIRED: Custom tab trait ID
  href?: string // OPTIONAL: Override custom tab's default URL
  functionID?: number // OPTIONAL: For tracking/icon overrides
  functionName?: string // OPTIONAL: Usually auto-set to "traitID={traitID}"
}

// Link Button - standalone link not tied to menu items or custom tabs
export interface LinkButton extends MenuButtonBase {
  type: 'link'
  href: string // REQUIRED: URL to link to
  title: string // REQUIRED: Display title
  description: string // REQUIRED: Display description
  functionID?: number // OPTIONAL: For tracking/icon overrides
}

// Menu Item Button - links to existing menu item by functionID
export interface MenuItemButton extends MenuButtonBase {
  type: 'menu-item'
  functionID: number // REQUIRED: Menu item function ID
  functionName?: string // OPTIONAL: Function name
  href?: string // OPTIONAL: Override menu item's default URL
}

// Discriminated union type for all menu buttons
export type MenuButton = CustomTabButton | LinkButton | MenuItemButton

// Type guard helpers
export function isCustomTabButton(
  button: MenuButton,
): button is CustomTabButton {
  return button.type === 'custom-tab'
}

export function isLinkButton(button: MenuButton): button is LinkButton {
  return button.type === 'link'
}

export function isMenuItemButton(button: MenuButton): button is MenuItemButton {
  return button.type === 'menu-item'
}

// Factory helper for creating buttons with proper typing
export const createMenuButton = {
  customTab: (data: Omit<CustomTabButton, 'type'>): CustomTabButton => ({
    type: 'custom-tab',
    ...data,
  }),

  link: (data: Omit<LinkButton, 'type'>): LinkButton => ({
    type: 'link',
    ...data,
  }),

  menuItem: (data: Omit<MenuItemButton, 'type'>): MenuItemButton => ({
    type: 'menu-item',
    ...data,
  }),
}
