import { useEffect, useState } from 'react'
import { uniqBy } from 'lodash'

import type { DomainUI } from '@spacedock/manifest'

import { createFileURL } from '../../../data/utils/file-path'

interface ImageOption {
  imageID: number
  name: string
  pathURL: string
}

interface ExistingImagesProps {
  domainID: number
  configID: string
  domainImages: DomainUI.Image[]
  configImages: DomainUI.UIConfigLibraryImageItem[]
  onSelect: (imageID: number) => void
}

const ExistingImages = (props: ExistingImagesProps) => {
  const [imageOptions, setImageOptions] = useState<ImageOption[]>(() => {
    return uniqBy(
      [
        ...domainImagesToImageOptions(props.domainImages),
        ...configImagesToImageOptions(props.configImages),
      ],
      'imageID',
    )
  })

  useEffect(() => {
    setImageOptions(
      uniqBy(
        [
          ...domainImagesToImageOptions(props.domainImages),
          ...configImagesToImageOptions(props.configImages),
        ],
        'imageID',
      ),
    )
  }, [props.domainImages ?? null, props.configImages])

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-x-4 gap-y-6">
      {imageOptions.map((image) => (
        <button
          key={image.name}
          className="focus:bg-bg-contrast-low hover:bg-bg-contrast-low flex cursor-pointer flex-col items-center justify-center gap-2 rounded p-2"
          onClick={() => props.onSelect(image.imageID)}
        >
          <div className="aspect-video w-full max-w-32">
            <img
              src={image.pathURL}
              alt={image.name}
              className="max-h-full w-full max-w-full object-contain"
            />
          </div>
          <span className="hidden text-center text-sm capitalize">
            {image.name}
          </span>
        </button>
      ))}
    </div>
  )
}

function domainImagesToImageOptions(
  domainImages: DomainUI.Image[],
): ImageOption[] {
  const results = domainImages
    .filter(
      (img) =>
        img.imageType === 'ocDomainUIImg' &&
        img.originalMimeType.startsWith('image') &&
        img.imageName !== 'favicon',
    )
    .map((image) => ({
      imageID: image.imageID,
      name: splitCamelcaseWord(image.imageName),
      pathURL: createFileURL(image.pathURL),
    }))

  return results
}

function configImagesToImageOptions(
  configImages: DomainUI.UIConfigLibraryImageItem[],
): ImageOption[] {
  return configImages.map((image) => ({
    imageID: image.item.imageID,
    name: image.tag ?? '',
    pathURL: createFileURL(image.item.pathURL),
  }))
}

function splitCamelcaseWord(word: string): string {
  return word
    .replace(/([A-Z]|_)/g, ' $1')
    .trim()
    .replace(/_/gi, '')
}

export { ExistingImages }
