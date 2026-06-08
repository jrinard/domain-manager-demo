import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from '../../chip/Chip'
import { createAvatarProps } from '../../../../tests/tdm'

import { ChipsInput, ChipsInputProps } from './ChipsInput'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'

const meta: Meta<typeof ChipsInput> = {
  title: 'DL: Falcon/Molecules/Inputs/Chips Input',
  component: ChipsInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChipsInput>

export const Bare: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (props) => <ChipsInput />,
}

export const ExampleOverflowing: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'When there are too many to fit on one line',
      },
    },
  },
  render: (props) => (
    <ChipsInput
      items={[
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,

        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          key={createAvatarProps().key}
        />,
      ]}
    />
  ),
}

export const ExamplePopulated: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Has chips indicating what is added',
      },
    },
  },
  render: (props) => (
    <ChipsInput
      placeholder="Search"
      items={[
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          trailingIcon="close"
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          key={createAvatarProps().key}
        />,
        <Chip
          dense
          label={createAvatarProps().name}
          avatar={createAvatarProps()}
          key={createAvatarProps().key}
        />,
      ]}
    />
  ),
}

export const ExampleOnSurface: SurfaceStory<ChipsInputProps> = {
  argTypes: {
    ...SurfaceStoryArgTypes,
    onSurface: {
      ...SurfaceStoryArgTypes.onSurface,
      control: {
        type: 'select' as const,
        options: SurfaceStoryArgTypes.onSurface.options,
      },
    },
  },
  args: {
    onSurface: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a ChipsInput being on a surface ',
      },
    },
  },
  render: ({ onSurface }) => (
    <SurfaceForStory surface={onSurface}>
      <ChipsInput />
    </SurfaceForStory>
  ),
}
