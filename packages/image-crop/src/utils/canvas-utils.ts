import type { Crop } from 'react-image-crop'

const BLOB_ERROR_MESSAGES = {
  NO_IMAGE: 'No image reference provided',
  NO_CROP: 'No crop data provided',
  CANVAS_ERROR: 'Error creating canvas',
  BLOB_FAILED:
    'Error creating Cropped Image. Expeced an Image but got nothing.',
} as const

export function createCroppedImageAsBlobAsync(
  crop: Crop | undefined,
  image: HTMLImageElement | null,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!image) {
      return reject(BLOB_ERROR_MESSAGES.NO_IMAGE)
    } else if (!crop) {
      return reject(BLOB_ERROR_MESSAGES.NO_CROP)
    }

    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return reject(BLOB_ERROR_MESSAGES.CANVAS_ERROR)
    }
    const pixelRatio = window.devicePixelRatio
    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )
    canvas.toBlob((blob) => {
      if (!blob) {
        return reject(BLOB_ERROR_MESSAGES.CANVAS_ERROR)
      } else {
        return resolve(blob)
      }
    })
  })
}
