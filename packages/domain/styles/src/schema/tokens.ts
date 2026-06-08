export type TokenKind = 'input' | 'derived'

export interface TokenDef {
  kind: TokenKind
}

// Token definitions: which tokens are user-editable inputs vs derived.
// This list mirrors tokens present in default.css and style-properties.md.
export const TOKEN_DEFS = {
  /*** 🌐 Baseline Styles 🌐 ***/
  '--site-bg': { kind: 'input' },
  '--site-fg': { kind: 'derived' },

  '--primary': { kind: 'input' },
  '--primary-fg': { kind: 'derived' },
  '--primary-subtle': { kind: 'derived' },
  '--primary-subtle-fg': { kind: 'derived' },

  '--secondary': { kind: 'input' },
  '--secondary-fg': { kind: 'derived' },

  '--label': { kind: 'derived' },
  '--title': { kind: 'derived' },
  '--title-2': { kind: 'derived' },
  '--title-3': { kind: 'derived' },
  '--title-4': { kind: 'derived' },
  '--title-5': { kind: 'derived' },
  '--title-6': { kind: 'derived' },

  '--link': { kind: 'input' },
  '--link-subtle': { kind: 'derived' },
  '--actiontext': { kind: 'input' },
  '--actiontext-subtle': { kind: 'derived' },

  '--accent': { kind: 'derived' },
  '--accent-fg': { kind: 'derived' },

  '--muted': { kind: 'derived' },
  '--muted-fg': { kind: 'derived' },

  '--overlay': { kind: 'derived' },
  '--overlay-fg': { kind: 'derived' },

  '--info': { kind: 'input' },
  '--info-fg': { kind: 'derived' },
  '--info-subtle': { kind: 'derived' },
  '--info-subtle-fg': { kind: 'derived' },

  '--success': { kind: 'input' },
  '--success-fg': { kind: 'derived' },
  '--success-subtle': { kind: 'derived' },
  '--success-subtle-fg': { kind: 'derived' },

  '--warning': { kind: 'input' },
  '--warning-fg': { kind: 'derived' },
  '--warning-subtle': { kind: 'derived' },
  '--warning-subtle-fg': { kind: 'derived' },

  '--danger': { kind: 'input' },
  '--danger-fg': { kind: 'derived' },
  '--danger-subtle': { kind: 'derived' },
  '--danger-subtle-fg': { kind: 'derived' },

  '--error': { kind: 'derived' },
  '--error-fg': { kind: 'derived' },
  '--error-subtle': { kind: 'derived' },
  '--error-subtle-fg': { kind: 'derived' },

  '--border': { kind: 'derived' },
  '--input': { kind: 'derived' },
  '--input-border': { kind: 'derived' },
  '--ring': { kind: 'derived' },

  '--radius-sm': { kind: 'input' },
  '--radius-md': { kind: 'input' },
  '--radius-lg': { kind: 'input' },
  '--radius-xl': { kind: 'input' },
  '--radius-2xl': { kind: 'input' },
  '--radius-full': { kind: 'input' },

  '--chart-1': { kind: 'derived' },
  '--chart-2': { kind: 'derived' },
  '--chart-3': { kind: 'derived' },
  '--chart-4': { kind: 'derived' },
  '--chart-5': { kind: 'derived' },

  '--topbar': { kind: 'input' },
  '--topbar-fg': { kind: 'derived' },
  '--topbar-subtle': { kind: 'derived' },
  '--topbar-subtle-fg': { kind: 'derived' },
  '--topbar-primary': { kind: 'derived' },
  '--topbar-primary-fg': { kind: 'derived' },

  '--navbar': { kind: 'input' },
  '--navbar-fg': { kind: 'derived' },
  '--navbar-subtle': { kind: 'derived' },
  // Note: matches current name in default.css/style-properties.md
  '--navbar-subtle-fg': { kind: 'derived' },

  '--sidebar': { kind: 'input' },
  '--sidebar-fg': { kind: 'derived' },
  '--sidebar-subtle': { kind: 'derived' },
  '--sidebar-subtle-fg': { kind: 'derived' },
  '--sidebar-item': { kind: 'input' },
  '--sidebar-item-fg': { kind: 'derived' },
  '--sidebar-item-subtle': { kind: 'derived' },
  '--sidebar-item-subtle-fg': { kind: 'derived' },

  '--homepage': { kind: 'input' },
  '--homepage-fg': { kind: 'derived' },

  '--bg-contrast-low': { kind: 'derived' },
  '--bg-contrast-medium': { kind: 'derived' },
  '--bg-contrast-high': { kind: 'derived' },

  '--list-item-odd': { kind: 'derived' },
  '--list-item-even': { kind: 'derived' },
  '--list-item-odd-selected': { kind: 'derived' },
  '--list-item-even-selected': { kind: 'derived' },

  /** Status aliases **/
  '--status-complete': { kind: 'derived' },
  '--status-incomplete': { kind: 'derived' },
  '--status-overdue': { kind: 'derived' },
  '--status-atrisk': { kind: 'derived' },
  '--status-notapplicable': { kind: 'derived' },
  '--status-postponed': { kind: 'derived' },

  /*** 🏠 Platform Specific Styles 🏠 ***/
  '--asset': { kind: 'derived' },
  '--asset-fg': { kind: 'derived' },

  // Documents
  '--asset-document': { kind: 'derived' },
  '--asset-document-subtle': { kind: 'derived' },
  '--asset-plaintext': { kind: 'derived' },
  '--asset-plaintext-subtle': { kind: 'derived' },
  '--asset-pdf': { kind: 'derived' },
  '--asset-pdf-subtle': { kind: 'derived' },
  '--asset-csv': { kind: 'derived' },
  '--asset-csv-subtle': { kind: 'derived' },
  '--asset-excel': { kind: 'derived' },
  '--asset-excel-subtle': { kind: 'derived' },
  '--asset-speedsheet': { kind: 'derived' },
  '--asset-speedsheet-subtle': { kind: 'derived' },
  '--asset-md': { kind: 'derived' },
  '--asset-md-subtle': { kind: 'derived' },
  '--asset-quickart': { kind: 'derived' },
  '--asset-quickart-subtle': { kind: 'derived' },
  '--asset-quickdoc': { kind: 'derived' },
  '--asset-quickdoc-subtle': { kind: 'derived' },

  // Media
  '--asset-video': { kind: 'derived' },
  '--asset-video-subtle': { kind: 'derived' },
  '--asset-image': { kind: 'derived' },
  '--asset-image-subtle': { kind: 'derived' },
  '--asset-photoalbum': { kind: 'derived' },
  '--asset-photoalbum-subtle': { kind: 'derived' },

  // Misc
  '--asset-elearning': { kind: 'derived' },
  '--asset-elearning-subtle': { kind: 'derived' },
  '--asset-scorm': { kind: 'derived' },
  '--asset-scorm-subtle': { kind: 'derived' },
  '--asset-url': { kind: 'derived' },
  '--asset-url-subtle': { kind: 'derived' },
  '--asset-zip': { kind: 'derived' },
  '--asset-zip-subtle': { kind: 'derived' },

  // Folders
  '--folder-1': { kind: 'derived' },
  '--folder-2': { kind: 'derived' },
  '--folder-3': { kind: 'derived' },
  '--folder-4': { kind: 'derived' },
  '--folder-5': { kind: 'derived' },
  '--folder-6': { kind: 'derived' },

  /** R3 Related Colors **/
  '--disc-d': { kind: 'derived' },
  '--disc-d-subtle': { kind: 'derived' },
  '--disc-i': { kind: 'derived' },
  '--disc-i-subtle': { kind: 'derived' },
  '--disc-s': { kind: 'derived' },
  '--disc-s-subtle': { kind: 'derived' },
  '--disc-c': { kind: 'derived' },
  '--disc-c-subtle': { kind: 'derived' },

  /** Mastery Related Colors **/
  '--assignment-list': { kind: 'derived' },
  '--assignment-list-subtle': { kind: 'derived' },

  '--exam': { kind: 'derived' },
  '--exam-subtle': { kind: 'derived' },

  /** Notices (Message Threads) Related Colors **/
  '--other': { kind: 'derived' },
  '--other-fg': { kind: 'derived' },
  '--self': { kind: 'derived' },
  '--self-fg': { kind: 'derived' },
  '--robot': { kind: 'derived' },
  '--robot-fg': { kind: 'derived' },

  /** Grayscale scale (dynamically set based on selected family) **/
  '--grayscale-50': { kind: 'derived' },
  '--grayscale-100': { kind: 'derived' },
  '--grayscale-200': { kind: 'derived' },
  '--grayscale-300': { kind: 'derived' },
  '--grayscale-400': { kind: 'derived' },
  '--grayscale-500': { kind: 'derived' },
  '--grayscale-600': { kind: 'derived' },
  '--grayscale-700': { kind: 'derived' },
  '--grayscale-800': { kind: 'derived' },
  '--grayscale-900': { kind: 'derived' },
  '--grayscale-950': { kind: 'derived' },
} as const satisfies Record<string, TokenDef>

export type TokenName = keyof typeof TOKEN_DEFS

export const INPUT_TOKENS = (Object.keys(TOKEN_DEFS) as TokenName[]).filter(
  (name) => TOKEN_DEFS[name].kind === 'input',
)

export const EDIT_UI_TOKENS: TokenName[] = [
  '--site-bg',
  '--site-fg',
  '--primary',
  '--secondary',
  '--accent',
  '--muted',
  '--topbar',
  '--topbar-fg',
  '--navbar',
  '--navbar-fg',
  '--sidebar',
  '--sidebar-fg',
  '--overlay',
  '--success',
  '--warning',
  '--danger',
]

export const EDIT_UI_EXTENDED_TOKENS: TokenName[] = [
  '--site-bg',
  '--site-fg',
  // * Theme Colors
  '--primary',
  '--primary-fg',
  '--primary-subtle',
  '--primary-subtle-fg',
  // * Secondary Colors
  '--secondary',
  '--secondary-fg',
  // * Top and Sidebars
  '--topbar',
  '--topbar-fg',
  '--topbar-primary',
  '--topbar-primary-fg',
  '--navbar',
  '--navbar-fg',
  '--sidebar',
  '--sidebar-fg',
  '--sidebar-item',
  '--sidebar-item-fg',
  '--homepage',
  '--homepage-fg',
  '--overlay',
  '--overlay-fg',
  // * Accent Colors
  '--accent',
  '--accent-fg',
  // * Muted Colors
  '--muted',
  '--muted-fg',
  // * Info Colors
  '--info',
  '--info-fg',
  '--info-subtle',
  '--info-subtle-fg',
  // * Success Colors
  '--success',
  '--success-fg',
  '--success-subtle',
  '--success-subtle-fg',
  // * Warning Colors
  '--warning',
  '--warning-fg',
  '--warning-subtle',
  '--warning-subtle-fg',
  // * Danger Colors
  '--danger',
  '--danger-fg',
  '--danger-subtle',
  '--danger-subtle-fg',
  // * Link & TextButton
  '--link',
  '--link-subtle',
  '--actiontext',
  '--actiontext-subtle',
  // * Border Colors
  '--border',
  '--input',
  '--ring',
]

export function isTokenName(value: string): value is TokenName {
  return value in TOKEN_DEFS
}

export function isInputToken(name: TokenName): boolean {
  return TOKEN_DEFS[name].kind === 'input'
}
