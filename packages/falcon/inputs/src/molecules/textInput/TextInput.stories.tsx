import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextInput } from './TextInput'

const meta: Meta<typeof TextInput> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Inputs/Text Input',
  component: TextInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextInput>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Bare: Story = {
  parameters: {
    docs: {
      description: {
        story: 'No parameters defined (e.g no placeholder nor icons)',
      },
    },
  },
  render: (props) => <TextInput {...props} />,
}

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Placeholder only',
      },
    },
  },
  render: () => <TextInput placeholder="name here" />,
}

export const Standalone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Rare**. When an input is stand-alone the placeholder is emphasized. Used only when an input is stand-alone (e.g. Search).',
      },
    },
  },
  render: () => <TextInput placeholder="name here" standalone />,
}

export const LeadingIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Rare**. Leading icon only. _Using leading icon is rare, so please get approval before using_',
      },
    },
  },
  render: () => <TextInput leadingIcon="lock" />,
}

export const TrailingIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Trailing icon only.',
      },
    },
  },
  render: () => <TextInput trailingIcon="close" />,
}

export const TrailingIconAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '(coming soon) Trailing icon and the trailing icon is clickable. This is useful for clearing inputs.',
      },
    },
  },
  render: () => <TextInput trailingIcon="close" />,
}

export const Fill: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fill the background',
      },
    },
  },
  render: () => <TextInput fill placeholder="placeholder" />,
}

export const Dense: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dense appearance for when the input border needs to be tighter',
      },
    },
  },
  render: () => <TextInput dense />,
}

export const ExampleSearchBar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of a Search Bar style',
      },
    },
  },
  render: () => (
    <TextInput placeholder="Search" leadingIcon="search" standalone />
  ),
}
