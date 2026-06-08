import React from 'react'
import { mergeClasses } from '@falcon/style'
import { type Crop, type ReactCropProps } from 'react-image-crop'
import { Button } from '@spacedock/falcon-ui'

import { createCroppedImageAsBlobAsync } from '../../utils/canvas-utils'

import { ImageCropCore } from '../imageCropCore/ImageCropCore'

import 'react-image-crop/dist/ReactCrop.css'

export interface ImageCropProps
  extends Omit<ReactCropProps, 'crop' | 'onChange'> {
  className?: string
  crop?: Crop
  imageSrc: string
  confirmButtonText?: string
  onSave: (blob: Blob) => void
  onError: (errorMsg: string) => void
}

const ImageCrop = ({
  className,
  crop: suppliedCrop,
  imageSrc,
  confirmButtonText = 'Save',
  onSave,
  onError,
  ...props
}: ImageCropProps) => {
  const creatingRef = React.useRef(false)
  const [crop, setCrop] = React.useState<Crop>()
  const imgRef = React.useRef<HTMLImageElement>(null)

  return (
    <div className={mergeClasses('flex w-full flex-col gap-2', className)}>
      <section className="w-full">
        <ImageCropCore
          {...props}
          className="mx-auto"
          imageSrc={imageSrc}
          onChange={(c) => setCrop(c)}
          crop={crop}
          ref={imgRef}
        />
      </section>

      <aside className="flex w-full flex-row justify-center gap-4">
        <Button
          variant="primary"
          onClick={() => {
            if (creatingRef.current) return

            creatingRef.current = true

            createCroppedImageAsBlobAsync(crop, imgRef.current)
              .then(onSave)
              .catch(onError)
              .finally(() => {
                creatingRef.current = false
              })
          }}
        >
          {confirmButtonText}
        </Button>
      </aside>
    </div>
  )
}
ImageCrop.displayName = 'ImageCrop'

export { ImageCrop }
