import { noop } from 'lodash'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  ComboButton,
  ComboButtonMain,
  ComboButtonAction,
  ComboButtonMenu,
  ComboButtonMenuItem,
} from './ComboButton'

const meta: Meta<typeof ComboButton> = {
  title: 'DL: Falcon/Molecules/ComboButton',
  component: ComboButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A composite button with a main action and a secondary action or menu. Uses children composition pattern for flexibility.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'destructive',
        'ghost',
        'clear',
        'rose',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['text-thin', 'text', 'medium', 'fit'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof ComboButton>

// Basic combo button with direct action
export const WithDirectAction: Story = {
  render: (args) => (
    <ComboButton {...args}>
      <ComboButtonMain onClick={noop}>Download File</ComboButtonMain>
      <ComboButtonAction
        icon="content-copy"
        onClick={noop}
        title="Copy to clipboard"
      />
    </ComboButton>
  ),
  args: {
    variant: 'primary',
    size: 'medium',
  },
}

// Combo button with menu
export const WithMenu: Story = {
  render: (args) => (
    <ComboButton {...args}>
      <ComboButtonMain onClick={noop}>Download File</ComboButtonMain>
      <ComboButtonMenu icon="dots-vertical">
        <ComboButtonMenuItem icon="content-copy" onClick={noop}>
          Copy to clipboard
        </ComboButtonMenuItem>
        <ComboButtonMenuItem icon="share" onClick={noop}>
          Share file
        </ComboButtonMenuItem>
        <ComboButtonMenuItem icon="edit" onClick={noop}>
          Edit file
        </ComboButtonMenuItem>
        <ComboButtonMenuItem icon="trash" onClick={noop} destructive>
          Delete file
        </ComboButtonMenuItem>
      </ComboButtonMenu>
    </ComboButton>
  ),
  args: {
    variant: 'primary',
    size: 'medium',
  },
}

// Secondary variant
export const Secondary: Story = {
  render: (args) => (
    <ComboButton {...args}>
      <ComboButtonMain onClick={noop}>Export Data</ComboButtonMain>
      <ComboButtonAction
        icon="settings"
        onClick={noop}
        title="Export settings"
      />
    </ComboButton>
  ),
  args: {
    variant: 'secondary',
    size: 'medium',
  },
}

// Danger variant
export const Danger: Story = {
  render: (args) => (
    <ComboButton {...args}>
      <ComboButtonMain onClick={noop}>Delete Selected</ComboButtonMain>
      <ComboButtonMenu icon="chevron-down">
        <ComboButtonMenuItem icon="trash" onClick={noop} destructive>
          Delete all
        </ComboButtonMenuItem>
        <ComboButtonMenuItem icon="archive" onClick={noop}>
          Archive instead
        </ComboButtonMenuItem>
      </ComboButtonMenu>
    </ComboButton>
  ),
  args: {
    variant: 'danger',
    size: 'medium',
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Text Thin</h3>
        <ComboButton variant="primary" size="text-thin">
          <ComboButtonMain onClick={noop}>Download</ComboButtonMain>
          <ComboButtonAction icon="content-copy" onClick={noop} />
        </ComboButton>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Text</h3>
        <ComboButton variant="primary" size="text">
          <ComboButtonMain onClick={noop}>Download File</ComboButtonMain>
          <ComboButtonAction icon="content-copy" onClick={noop} />
        </ComboButton>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Medium</h3>
        <ComboButton variant="primary" size="medium">
          <ComboButtonMain onClick={noop}>Download File</ComboButtonMain>
          <ComboButtonAction icon="content-copy" onClick={noop} />
        </ComboButton>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Fit</h3>
        <ComboButton variant="primary" size="fit">
          <ComboButtonMain onClick={noop}>Download File</ComboButtonMain>
          <ComboButtonAction icon="content-copy" onClick={noop} />
        </ComboButton>
      </div>
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <div className="space-x-4">
      <ComboButton {...args}>
        <ComboButtonMain onClick={noop}>Download File</ComboButtonMain>
        <ComboButtonAction icon="content-copy" onClick={noop} />
      </ComboButton>

      <ComboButton {...args}>
        <ComboButtonMain onClick={noop}>Export Data</ComboButtonMain>
        <ComboButtonMenu icon="settings">
          <ComboButtonMenuItem icon="copy">Copy</ComboButtonMenuItem>
          <ComboButtonMenuItem icon="share">Share</ComboButtonMenuItem>
        </ComboButtonMenu>
      </ComboButton>
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
}

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">File Operations</h3>
        <div className="space-x-2">
          <ComboButton variant="primary" size="medium">
            <ComboButtonMain onClick={noop}>Download</ComboButtonMain>
            <ComboButtonAction
              icon="content-copy"
              onClick={noop}
              title="Copy download link"
            />
          </ComboButton>

          <ComboButton variant="secondary" size="medium">
            <ComboButtonMain onClick={noop}>Share</ComboButtonMain>
            <ComboButtonMenu icon="chevron-down">
              <ComboButtonMenuItem icon="link">Copy link</ComboButtonMenuItem>
              <ComboButtonMenuItem icon="email">
                Send via email
              </ComboButtonMenuItem>
              <ComboButtonMenuItem icon="qrcode">
                Generate QR code
              </ComboButtonMenuItem>
            </ComboButtonMenu>
          </ComboButton>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Data Export</h3>
        <div className="space-x-2">
          <ComboButton variant="primary" size="medium">
            <ComboButtonMain onClick={noop}>Export CSV</ComboButtonMain>
            <ComboButtonMenu icon="chevron-down">
              <ComboButtonMenuItem icon="file-excel">
                Export as Excel
              </ComboButtonMenuItem>
              <ComboButtonMenuItem icon="file-pdf">
                Export as PDF
              </ComboButtonMenuItem>
              <ComboButtonMenuItem icon="code">
                Export as JSON
              </ComboButtonMenuItem>
            </ComboButtonMenu>
          </ComboButton>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">User Actions</h3>
        <div className="space-x-2">
          <ComboButton variant="secondary" size="medium">
            <ComboButtonMain onClick={noop}>Send Message</ComboButtonMain>
            <ComboButtonAction
              icon="calendar"
              onClick={noop}
              title="Schedule for later"
            />
          </ComboButton>

          <ComboButton variant="danger" size="medium">
            <ComboButtonMain onClick={noop}>Delete User</ComboButtonMain>
            <ComboButtonMenu icon="chevron-down">
              <ComboButtonMenuItem icon="archive">
                Archive instead
              </ComboButtonMenuItem>
              <ComboButtonMenuItem icon="block">Block user</ComboButtonMenuItem>
              <ComboButtonMenuItem icon="trash" destructive>
                Permanently delete
              </ComboButtonMenuItem>
            </ComboButtonMenu>
          </ComboButton>
        </div>
      </div>
    </div>
  ),
}
