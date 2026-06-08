import type { ParsedStylesheet } from '@domain/styles'

export function formatTokenName(name?: keyof ParsedStylesheet['light']) {
  switch (name) {
    case '--site-bg':
      return 'Background'
    case '--site-fg':
      return 'Text Color'
    case '--primary':
      return 'Primary Color'
    case '--navbar':
      return 'Navbar Background Color'
    case '--navbar-fg':
      return 'Navbar Text Color'
    case '--sidebar':
      return 'Sidebar Background Color'
    case '--sidebar-fg':
      return 'Sidebar Text Color'
    case '--topbar':
      return 'Topbar Background Color'
    case '--topbar-fg':
      return 'Topbar Text Color'
    case '--overlay':
      return 'Overlay Background Color'
    default:
      return name?.replace(/^--/, '')
  }
}

export function formatTokenNameForSections(
  name?: keyof ParsedStylesheet['light'],
) {
  switch (name) {
    case '--site-bg':
      return 'Background'
    case '--site-fg':
      return 'Text Color'
    case '--primary':
      return 'Color'
    case '--primary-fg':
      return 'Text On Top'
    case '--primary-subtle':
      return 'Subtle Variant'
    case '--primary-subtle-fg':
      return 'Text On Top Subtle'
    case '--bg-contrast-low':
      return 'Low'
    case '--bg-contrast-medium':
      return 'Medium'
    case '--bg-contrast-high':
      return 'High'
    case '--secondary':
      return 'Color'
    case '--secondary-fg':
      return 'Text On Top'
    case '--navbar':
      return 'Background'
    case '--navbar-fg':
      return 'Text Color'
    case '--navbar-subtle':
      return 'Subtle Variant'
    case '--navbar-subtle-fg':
      return 'Text On Top Subtle'
    case '--sidebar':
      return 'Color'
    case '--sidebar-fg':
      return 'Text On Top'
    case '--sidebar-subtle':
      return 'Subtle Variant'
    case '--sidebar-subtle-fg':
      return 'Text On Top Subtle'
    case '--sidebar-item':
      return 'Item'
    case '--sidebar-item-fg':
      return 'Item Text'
    case '--sidebar-item-subtle':
      return 'Subtle Item'
    case '--sidebar-item-subtle-fg':
      return 'Subtle Item Text'
    case '--homepage':
      return 'Homepage'
    case '--homepage-fg':
      return 'Homepage Text'
    case '--topbar':
      return 'Background'
    case '--topbar-fg':
      return 'Text Color'
    case '--topbar-subtle':
      return 'Subtle Variant'
    case '--topbar-subtle-fg':
      return 'Text On Top Subtle'
    case '--topbar-primary':
      return 'Topbar Primary'
    case '--topbar-primary-fg':
      return 'Topbar Primary Text'
    case '--overlay':
      return 'Color'
    case '--overlay-fg':
      return 'Text On Top'
    case '--accent':
      return 'Accent'
    case '--accent-fg':
      return 'Text On Top'
    case '--muted':
      return 'Color'
    case '--muted-fg':
      return 'Text On Top'
    case '--info':
      return 'Color'
    case '--info-fg':
      return 'Text On Top'
    case '--info-subtle':
      return 'Subtle Variant'
    case '--info-subtle-fg':
      return 'Text On Top Subtle'
    case '--success':
      return 'Color'
    case '--success-fg':
      return 'Text On Top'
    case '--success-subtle':
      return 'Subtle Variant'
    case '--success-subtle-fg':
      return 'Text On Top Subtle'
    case '--warning':
      return 'Color'
    case '--warning-fg':
      return 'Text On Top'
    case '--warning-subtle':
      return 'Subtle Variant'
    case '--warning-subtle-fg':
      return 'Text On Top Subtle'
    case '--danger':
      return 'Color'
    case '--danger-fg':
      return 'Text On Top'
    case '--danger-subtle':
      return 'Subtle Variant'
    case '--danger-subtle-fg':
      return 'Text On Top Subtle'
    case '--link':
      return 'Link'
    case '--link-subtle':
      return 'Subtle Variant'
    case '--actiontext':
      return 'Action Text'
    case '--actiontext-subtle':
      return 'Subtle Variant'
    case '--list-item-odd':
      return 'Odd List Item'
    case '--list-item-even':
      return 'Even List Item'
    case '--list-item-odd-selected':
      return 'Selected Odd List Item'
    case '--list-item-even-selected':
      return 'Selected Even List Item'
    case '--chart-1':
      return 'Color 1'
    case '--chart-2':
      return 'Color 2'
    case '--chart-3':
      return 'Color 3'
    case '--chart-4':
      return 'Color 4'
    case '--chart-5':
      return 'Color 5'
    case '--asset':
      return 'Asset'
    case '--asset-fg':
      return 'Asset Text'
    case '--asset-document':
      return 'Document'
    case '--asset-document-subtle':
      return 'Subtle Document'
    case '--asset-plaintext':
      return 'Plaintext'
    case '--asset-plaintext-subtle':
      return 'Subtle Plaintext'
    case '--asset-pdf':
      return 'PDF'
    case '--asset-pdf-subtle':
      return 'Subtle PDF'
    case '--asset-csv':
      return 'CSV'
    case '--asset-csv-subtle':
      return 'Subtle CSV'
    case '--asset-excel':
      return 'Excel'
    case '--asset-excel-subtle':
      return 'Subtle Excel'
    case '--asset-speedsheet':
      return 'Speedsheet'
    case '--asset-speedsheet-subtle':
      return 'Subtle Speedsheet'
    case '--asset-md':
      return 'Markdown'
    case '--asset-md-subtle':
      return 'Subtle Markdown'
    case '--asset-quickart':
      return 'Quickart'
    case '--asset-quickart-subtle':
      return 'Subtle Quickart'
    case '--asset-quickdoc':
      return 'Quickdoc'
    case '--asset-quickdoc-subtle':
      return 'Subtle Quickdoc'
    case '--asset-video':
      return 'Video'
    case '--asset-video-subtle':
      return 'Subtle Video'
    case '--asset-image':
      return 'Image'
    case '--asset-image-subtle':
      return 'Subtle Image'
    case '--asset-photoalbum':
      return 'Photoalbum'
    case '--asset-photoalbum-subtle':
      return 'Subtle Photoalbum'
    case '--asset-elearning':
      return 'Elearning'
    case '--asset-elearning-subtle':
      return 'Subtle Elearning'
    case '--asset-scorm':
      return 'SCORM'
    case '--asset-scorm-subtle':
      return 'Subtle SCORM'
    case '--asset-url':
      return 'URL'
    case '--asset-url-subtle':
      return 'Subtle URL'
    case '--asset-zip':
      return 'ZIP'
    case '--asset-zip-subtle':
      return 'Subtle ZIP'
    default:
      return name?.replace(/^--/, '')
  }
}

export function formatTokenNameTerse(name?: keyof ParsedStylesheet['light']) {
  switch (name) {
    case '--site-bg':
      return 'Bg'
    case '--site-fg':
      return 'Txt'
    case '--primary':
      return 'Pri'
    case '--primary-fg':
      return 'Pri Txt'
    case '--primary-subtle':
      return 'Pri S'
    case '--primary-subtle-fg':
      return 'Pri S Txt'
    case '--secondary':
      return 'Sec'
    case '--secondary-fg':
      return 'Sec Txt'
    case '--navbar':
      return 'Nav'
    case '--navbar-fg':
      return 'NavTxt'
    case '--navbar-subtle':
      return 'Nav S'
    case '--navbar-subtle-fg':
      return 'Nav S Txt'
    case '--sidebar':
      return 'Side'
    case '--sidebar-fg':
      return 'Side Txt'
    case '--sidebar-subtle':
      return 'Side S'
    case '--sidebar-subtle-fg':
      return 'Side S Txt'
    case '--topbar':
      return 'Top'
    case '--topbar-fg':
      return 'Top Txt'
    case '--topbar-subtle':
      return 'Top S'
    case '--topbar-subtle-fg':
      return 'Top S Txt'
    case '--overlay':
      return 'Ovrly'
    case '--overlay-fg':
      return 'Ovrly Txt'
    case '--accent':
      return 'Acc'
    case '--accent-fg':
      return 'Acc Txt'
    case '--muted':
      return 'Muted'
    case '--muted-fg':
      return 'Muted Txt'
    case '--info':
      return 'Info'
    case '--info-fg':
      return 'Info Txt'
    case '--info-subtle':
      return 'Info S'
    case '--info-subtle-fg':
      return 'Info S Txt'
    case '--success':
      return 'Succ'
    case '--success-fg':
      return 'Succ Txt'
    case '--success-subtle':
      return 'Succ S'
    case '--success-subtle-fg':
      return 'Succ S Txt'
    case '--warning':
      return 'Warn'
    case '--warning-fg':
      return 'Warn Txt'
    case '--warning-subtle':
      return 'Warn S'
    case '--warning-subtle-fg':
      return 'Warn S Txt'
    case '--danger':
      return 'Dngr'
    case '--danger-fg':
      return 'Dngr Txt'
    case '--danger-subtle':
      return 'Dngr S'
    case '--danger-subtle-fg':
      return 'Dngr S Txt'
    case '--bg-contrast-low':
      return 'Low'
    case '--bg-contrast-medium':
      return 'Med'
    case '--bg-contrast-high':
      return 'Hgh'
    case '--chart-1':
      return 'Chrt 1'
    case '--chart-2':
      return 'Chrt 2'
    case '--chart-3':
      return 'Chrt 3'
    case '--chart-4':
      return 'Chrt 4'
    case '--chart-5':
      return 'Chrt 5'
    default:
      return name?.replace(/^--/, '')
  }
}
