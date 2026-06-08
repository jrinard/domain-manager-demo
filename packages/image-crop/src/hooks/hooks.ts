import type { Crop, PercentCrop, PixelCrop } from 'react-image-crop'
import { useRef, useState } from 'react'

import { createCroppedImageAsBlobAsync } from '../utils/canvas-utils'

export function useImageCropData() {
  const [crop, setCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)

  return {
    crop,
    imgRef,
    createCroppedImageBlobFromData: async () => {
      if (!imgRef.current) {
        return
      }

      const imgBlob = await createCroppedImageAsBlobAsync(crop, imgRef.current)

      return imgBlob
    },
    onCropChange: (crop: PixelCrop, _percentageCrop: PercentCrop) => {
      setCrop(crop)
    },
  }
}
