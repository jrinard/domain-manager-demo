/** Local portfolio demo assets (served from public/demo-assets/). */
const BASE = '/demo-assets'

export const demoAssets = {
  bg: {
    prismBlack: `${BASE}/bg-images/PrismBg1-black.jpg`,
    prismWhite: `${BASE}/bg-images/PrismBg1-white.jpg`,
    purpleTopDown: `${BASE}/bg-images/Purple_Top_Down.jpg`,
    blueTopDown: `${BASE}/bg-images/Blue_Top_Down.jpg`,
    redTopDown: `${BASE}/bg-images/Red_Top_Down.jpg`,
    tryybBack: `${BASE}/bg-images/Tryyb_Back.jpg`,
  },
  logos: {
    light: `${BASE}/logos/logo-light.png`,
    dark: `${BASE}/logos/logo-dark.png`,
  },
  profile: {
    demoUser: `${BASE}/profile/demo-user.jpg`,
  },
  menuIcon: (filename: string) => `${BASE}/menu-icons/${filename}`,
  menuIconSmall: (filename: string) => `${BASE}/menu-icons/small-icons/${filename}`,
  traitIcon: (filename: string) => `${BASE}/trait-icons/${filename}`,
  externalLink: `${BASE}/menu-icons/external-link.png`,
} as const

/** Layout builder preset backgrounds (id + display name + local path). */
export const DEMO_BACKGROUND_OPTIONS = [
  { id: 1, name: 'Dark Prism', path: demoAssets.bg.prismBlack },
  { id: 2, name: 'Light Prism', path: demoAssets.bg.prismWhite },
  { id: 3, name: 'Purple Midnight', path: demoAssets.bg.purpleTopDown },
  { id: 4, name: 'Blue Ocean', path: demoAssets.bg.blueTopDown },
  { id: 5, name: 'Red Star', path: demoAssets.bg.redTopDown },
  { id: 6, name: 'Tryyb Prism', path: demoAssets.bg.tryybBack },
] as const
