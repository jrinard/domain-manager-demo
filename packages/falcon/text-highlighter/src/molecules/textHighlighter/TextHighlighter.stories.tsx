import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextHighlighter } from './TextHighlighter'

const meta: Meta<typeof TextHighlighter> = {
  title: 'Falcon Text Highlighter/Molecules/Text Highlighter',
  component: TextHighlighter,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextHighlighter>

export const HighlightsText: Story = {
  args: {
    highlight: 'yellow',
    searchTerm: 'demo',
    text: 'This is a demo bit of text.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlights Text matching Searchterm',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ highlight, searchTerm, text }) => (
    <div>
      <TextHighlighter
        highlight={highlight}
        searchTerm={searchTerm}
        text={text}
      />
    </div>
  ),
}

export const MultipleMatches: Story = {
  args: {
    highlight: 'yellow',
    text: 'Demo of text with demo in it multiple times. Demo!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlights Text matching Searchterm',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ highlight, searchTerm, text }) => (
    <div>
      <TextHighlighter
        highlight={highlight}
        searchTerm={searchTerm}
        text={text}
      />
    </div>
  ),
}

export const NoSearchTerm: Story = {
  args: {
    highlight: 'yellow',
    text: 'This is a demo bit of text.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlights Text matching Searchterm',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ highlight, searchTerm, text }) => (
    <div>
      <TextHighlighter
        highlight={highlight}
        searchTerm={searchTerm}
        text={text}
      />
    </div>
  ),
}
