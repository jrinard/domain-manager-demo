import { Icon } from '@falcon/icons'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileInput, TextBody } from '@spacedock/falcon-ui'
import { ImageCrop, ImageCropProps } from './ImageCrop'
import _ from 'lodash'

const meta: Meta<typeof ImageCrop> = {
  title: 'ImageCrop/Organisms/Image Crop',

  component: ImageCrop,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ImageCrop>

const ExampleImageCrop = (props: ImageCropProps) => {
  const [croppedBlob, updateCroppedBlob] = React.useState<Blob | null>(null)
  const [croppedBlobSrc, updateCroppedBlobSrc] = React.useState<string | null>(
    null
  )

  const [fileSrc, updateFileSrc] = React.useState<string | null>(null)
  const [file, setFile] = React.useState<File>()

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

  React.useEffect(() => {
    if (croppedBlobSrc) {
      URL.revokeObjectURL(croppedBlobSrc)
    }

    if (croppedBlob) {
      const newBlobSrc = URL.createObjectURL(croppedBlob)

      updateCroppedBlobSrc(newBlobSrc)

      return () => URL.revokeObjectURL(newBlobSrc)
    }
  }, [croppedBlob])

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
        <ImageCrop
          imageSrc={fileSrc ?? ''}
          onSave={updateCroppedBlob}
          confirmButtonText="Preview"
          onError={_.noop}
          aspect={1}
          maxHeight={128}
          maxWidth={128}
        />
      )}

      {croppedBlobSrc && (
        <>
          <hr className="mx-4 w-full" />
          <p className="mb-4">Cropped Image:</p>
          <div className="w-full">
            <img src={croppedBlobSrc} alt="cropped" />
          </div>
        </>
      )}
    </div>
  )
}

export const CropUsingFileInput: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic crop with square dimension ',
      },
    },
  },
  render: ({ ...props }) => <ExampleImageCrop {...props} />,
}
