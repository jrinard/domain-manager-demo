import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Surface } from '../surface/Surface'

import { ProgressBar, ProgressBarProps } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'DL: Falcon/Molecules/Progress Bar',
  component: ProgressBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProgressBar>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const Color: Story = {
  args: {
    color: 'accent',
    progress: 25,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Render the Progress of something, such as in a course, or while uploading/download a File.',
      },
    },
  },
  render: ({ color, progress }) => (
    <ProgressBar color={color} progress={progress} />
  ),
}

export const Label: Story = {
  args: {
    progress: 25,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Useful for reports (e.g. Rect Lists). Not required for activity like uploading a file',
      },
    },
  },
  render: (props) => (
    <Surface light className="p-3">
      <ProgressBar {...props} hasLabel />
    </Surface>
  ),
}

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Indeterminate is useful when you want to show the bar with an unspecified time (e.g. making a network request)',
      },
    },
  },
  render: (props) => <ProgressBar {...props} indeterminate />,
}

const StatefulProgressBar = (props: ProgressBarProps) => {
  const [progress, setProgress] = useState(25)
  setTimeout(() => {
    if (progress + 5 >= 100) {
      setProgress(0)
    } else {
      setProgress(progress + 5)
    }
  }, 1500)
  return <ProgressBar {...props} progress={progress} />
}

export const ExampleProgress: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Showing what the actual progress animated as',
      },
    },
  },
  render: (props) => (
    <Surface light className="p-3">
      <StatefulProgressBar {...props} />
    </Surface>
  ),
}
