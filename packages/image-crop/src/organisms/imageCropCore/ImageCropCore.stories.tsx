import { Icon } from '@falcon/icons'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileInput, TextBody } from '@spacedock/falcon-ui'

import {
  COURSE_TILE_IMAGE_DIMENSIONS,
  TEAM_BANNER_IMAGE_DIMENSIONS,
} from '../../constants/standard-dimensions'
import { useImageCropData } from '../../hooks/hooks'

import { ImageCropCore } from './ImageCropCore'
import type { ImageCropCoreProps } from './ImageCropCore'

const meta: Meta<typeof ImageCropCore> = {
  title: 'ImageCrop/Organisms/Image Crop Core',

  component: ImageCropCore,
  tags: ['autodocs'],
}

const ExampleImageCropCore = (props: ImageCropCoreProps) => {
  const [fileSrc, updateFileSrc] = React.useState<string | null>(null)
  const [file, setFile] = React.useState<File>()

  const imgCropData = useImageCropData()

  React.useEffect(() => {
    if (fileSrc) {
      URL.revokeObjectURL(fileSrc)
    }

    if (file) {
      const newSrc = URL.createObjectURL(file)

      updateFileSrc(newSrc)

      return () => URL.revokeObjectURL(newSrc)
    }
  }, [file])

  return (
    <div>
      {!file && !fileSrc ? (
        <div className="flex h-64 w-64 items-center border border-dashed border-gray-400">
          <FileInput
            onChange={(newFile) => {
              if (fileSrc) {
                URL.revokeObjectURL(fileSrc)
              }
              setFile(newFile[0])
            }}
            accept="image/jpg,image/png"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
              <Icon icon="upload-outline" size="4xl" />
              <TextBody>
                Drag & Drop or{' '}
                <span className="text-body text-blue-600">Choose File</span> to
                upload
              </TextBody>
              <TextBody size={'s'}>PNG or JPG</TextBody>
            </div>
          </FileInput>
        </div>
      ) : (
        <ImageCropCore
          aspect={props.aspect}
          crop={imgCropData.crop}
          onChange={imgCropData.onCropChange}
          imageSrc={fileSrc}
          ref={imgCropData.imgRef}
        />
      )}
    </div>
  )
}

export default meta
type Story = StoryObj<typeof ImageCropCore>

export const SquareImage: Story = {
  args: {
    aspect: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Core Crop with square dimension',
      },
    },
  },
  render: (props) => <ExampleImageCropCore {...props} />,
}

export const TileImage: Story = {
  args: {
    aspect: COURSE_TILE_IMAGE_DIMENSIONS.aspectRatio,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Core Crop with square dimension',
      },
    },
  },
  render: (props) => <ExampleImageCropCore {...props} />,
}

export const BannerImage: Story = {
  args: {
    aspect: TEAM_BANNER_IMAGE_DIMENSIONS.aspectRatio,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Core Crop with square dimension',
      },
    },
  },
  render: (props) => <ExampleImageCropCore {...props} />,
}
