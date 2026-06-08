import type { Meta, StoryObj } from '@storybook/react'

import {
  READONLY__TEXT_ONLY_PLUGINS,
  TEXT_ONLY_PLUGINS,
} from '../../PluginPresets'

import { TextEditor } from './TextEditor'

const meta: Meta<typeof TextEditor> = {
  title: 'Md Wysiwyg/Organisms/Text Editor',
  component: TextEditor,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextEditor>

export const Populated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <TextEditor
      {...props}
      markdown="# This is a Title"
      plugins={READONLY__TEXT_ONLY_PLUGINS}
    />
  ),
}

export const PopulatedEdit: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <TextEditor
      {...props}
      markdown="# This is a Title"
      plugins={TEXT_ONLY_PLUGINS}
    />
  ),
}
