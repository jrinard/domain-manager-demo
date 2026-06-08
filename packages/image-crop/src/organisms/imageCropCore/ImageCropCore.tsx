import { forwardRef } from 'react'
import ReactCrop, { type ReactCropProps } from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'

export interface ImageCropCoreProps extends ReactCropProps {
  imageSrc: string
}

const ImageCropCore = forwardRef<HTMLImageElement, ImageCropCoreProps>(
  ({ crop, imageSrc, onChange, ...props }: ImageCropCoreProps, imgRef) => {
    return (
      <ReactCrop crop={crop} onChange={onChange} {...props}>
        <img src={imageSrc} alt="original" ref={imgRef} />
      </ReactCrop>
    )
  }
)

ImageCropCore.displayName = 'ImageCropCore'

export { ImageCropCore }
