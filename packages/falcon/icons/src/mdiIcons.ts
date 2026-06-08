import mdiIconsData from '@iconify-json/mdi/icons.json'

//* Extract just the icon names from the MDI icon set
//* This gives us access to all ~7,638 Material Design Icons
export const MDI_ICON_NAMES = Object.keys(mdiIconsData.icons)

//* Total count of available MDI icons
export const MDI_ICON_COUNT = MDI_ICON_NAMES.length
