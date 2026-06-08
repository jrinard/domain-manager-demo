import type { HomeSection } from '@domain/configs'

export function pullBGImageID(sectionData: HomeSection) {
  return sectionData.metadata.bgImage
}
