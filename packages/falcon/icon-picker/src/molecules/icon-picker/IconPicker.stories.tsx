import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IconPicker } from './IconPicker'

const meta: Meta<typeof IconPicker> = {
  title: 'DL: Falcon/Molecules/IconPicker',
  component: IconPicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof IconPicker>

const DefaultExample = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>('')
  return (
    <div className="flex flex-col gap-4">
      <IconPicker
        value={selectedIcon}
        onChange={(icon) => setSelectedIcon(icon)}
        label="Choose Icon"
      />
      {selectedIcon && (
        <p className="text-sm text-grayscale-400">
          Selected: <strong>{selectedIcon}</strong>
        </p>
      )}
    </div>
  )
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default IconPicker with no icon selected. Click to open and select an icon.',
      },
    },
  },
  render: () => <DefaultExample />,
}

const WithSelectedIconExample = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>('account')
  return (
    <div className="flex flex-col gap-4">
      <IconPicker
        value={selectedIcon}
        onChange={(icon) => setSelectedIcon(icon)}
        label="Choose Icon"
      />
      <p className="text-sm text-grayscale-400">
        Selected: <strong>{selectedIcon}</strong>
      </p>
    </div>
  )
}

export const WithSelectedIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'IconPicker with a pre-selected icon.',
      },
    },
  },
  render: () => <WithSelectedIconExample />,
}

const CustomIconSetExample = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>('')
  const statusIcons = [
    'bell',
    'calendar-outline',
    'check-circle',
    'close',
    'download',
    'search',
    'gear',
    'person',
  ]
  return (
    <div className="flex flex-col gap-4">
      <IconPicker
        value={selectedIcon}
        onChange={(icon) => setSelectedIcon(icon)}
        label="Choose Icon"
        topIcons={statusIcons}
        topIconsLabel="Status Icons"
      />
      {selectedIcon && (
        <p className="text-sm text-grayscale-400">
          Selected: <strong>{selectedIcon}</strong>
        </p>
      )}
    </div>
  )
}

export const CustomIconSet: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'IconPicker with a custom icon set and label. Shows how to customize both the top section icons and its label.',
      },
    },
  },
  render: () => <CustomIconSetExample />,
}

const CustomLabelExample = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>('')
  return (
    <div className="flex flex-col gap-4">
      <IconPicker
        value={selectedIcon}
        onChange={(icon) => setSelectedIcon(icon)}
        label="Select Menu Icon"
      />
      {selectedIcon && (
        <p className="text-sm text-grayscale-400">
          Selected: <strong>{selectedIcon}</strong>
        </p>
      )}
    </div>
  )
}

export const CustomLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'IconPicker with a custom label for the popover header.',
      },
    },
  },
  render: () => <CustomLabelExample />,
}
