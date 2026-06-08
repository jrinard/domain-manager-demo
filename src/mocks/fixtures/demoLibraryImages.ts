import type { DomainUI } from '@spacedock/manifest'
import { demoAssets } from '../../demo/demoAssetPaths'

/** Fake attachment IDs for Columbia Bank demo section images (libraryImages.courseItemID). */
export const DEMO_SECTION_IMAGE_IDS = {
  bannerTop: 91001,
  bannerSecondary: 91002,
  quad1: 91011,
  quad2: 91012,
  quad3: 91013,
  quad4: 91014,
  fullSectionBg: 91020,
  footer: 91030,
  columbiaLogo: 91040,
} as const

const DEMO_MEMBER = {
  memberID: 9001,
  memberName: 'Portfolio Demo User',
}

function demoLibraryImage(
  tag: string,
  pathURL: string,
  courseItemID: number,
): DomainUI.UIConfigLibraryImageItem {
  const mime = pathURL.endsWith('.png') ? 'image/png' : 'image/jpeg'
  return {
    courseItemID,
    libraryID: courseItemID,
    tag,
    activeStatus: 'ocENABLED',
    createdDate: '2024-01-01T00:00:00.000Z',
    modifiedDate: '2024-01-01T00:00:00.000Z',
    modifiedBy: DEMO_MEMBER,
    createdBy: DEMO_MEMBER,
    item: {
      imageID: courseItemID,
      originalMimeType: mime,
      height: 600,
      width: 1200,
      length: 0,
      pathURL,
      imageType: 'ocIMAGE',
    },
  }
}

/** Library images referenced by Tryyb home sections (banners, links, backgrounds). */
export const DEMO_TRYYB_LIBRARY_IMAGES: DomainUI.UIConfigLibraryImageItem[] = [
  demoLibraryImage(
    'columbia-banner-top',
    demoAssets.section('demo-columbia-top-banner.png'),
    DEMO_SECTION_IMAGE_IDS.bannerTop,
  ),
  demoLibraryImage(
    'columbia-banner-2',
    demoAssets.section('demo-columbia-banner2.png'),
    DEMO_SECTION_IMAGE_IDS.bannerSecondary,
  ),
  demoLibraryImage(
    'columbia-quad-1',
    demoAssets.section('demo-columbia-1-quad.png'),
    DEMO_SECTION_IMAGE_IDS.quad1,
  ),
  demoLibraryImage(
    'columbia-quad-2',
    demoAssets.section('demo-columbia-2-quad.png'),
    DEMO_SECTION_IMAGE_IDS.quad2,
  ),
  demoLibraryImage(
    'columbia-quad-3',
    demoAssets.section('demo-columbia-3-quad.png'),
    DEMO_SECTION_IMAGE_IDS.quad3,
  ),
  demoLibraryImage(
    'columbia-quad-4',
    demoAssets.section('demo-columbia-4-quad.png'),
    DEMO_SECTION_IMAGE_IDS.quad4,
  ),
  demoLibraryImage(
    'columbia-full-section',
    demoAssets.section('demo-columbia-5-full section.png'),
    DEMO_SECTION_IMAGE_IDS.fullSectionBg,
  ),
  demoLibraryImage(
    'columbia-footer',
    demoAssets.section('demo-columbia-footer.png'),
    DEMO_SECTION_IMAGE_IDS.footer,
  ),
  demoLibraryImage(
    'columbia-logo',
    demoAssets.columbiaLogoLight,
    DEMO_SECTION_IMAGE_IDS.columbiaLogo,
  ),
]
