import React from 'react'
import { Icon } from '@falcon/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { TextBody } from '../../../index'
import { FileInput } from './FileInput'

const meta: Meta<typeof FileInput> = {
  title: 'DL: Falcon/Molecules/Inputs/File Input',

  component: FileInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FileInput>

export const ImageFileInput: Story = {
  args: {
    multiple: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'No cropping image input',
      },
    },
  },
  render: ({ multiple, ...props }) => (
    <div className="flex size-64 items-center border border-dashed border-gray-400">
      <FileInput {...props} accept="image/jpg,image/png">
        <div className="flex size-full flex-col items-center justify-center gap-2 text-center">
          <Icon icon="upload-outline" size="4xl" />
          <TextBody>
            Drag & Drop or{' '}
            <span className="font-body text-blue-600">Choose File</span> to
            upload
          </TextBody>
          <TextBody size={'s'}>PNG or JPG</TextBody>
        </div>
      </FileInput>
    </div>
  ),
}
