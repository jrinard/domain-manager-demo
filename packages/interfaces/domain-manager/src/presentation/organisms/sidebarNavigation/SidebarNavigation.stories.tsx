import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  SidebarNavigation,
  SidebarNavigationProps,
  NavigationSection,
} from './SidebarNavigation'

const meta: Meta<typeof SidebarNavigation> = {
  title: 'App: DomainManager/Organisms/Sidebar Navigation',
  component: SidebarNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SidebarNavigation>

const mockSections: NavigationSection[] = [
  { id: 'details', label: 'Details', required: true },
  { id: 'start-version', label: 'Start Version', required: true },
  { id: 'default-theme-mode', label: 'Default Theme Mode', required: true },
  { id: 'theme-styles', label: 'Theme Styles', required: true },
  { id: 'layout', label: 'Layout', required: false },
  { id: 'security-roles', label: 'Security Roles', required: false },
  { id: 'download', label: 'Download', required: false },
]

const mockHasMetReq = (sectionId: string): boolean => {
  // Mock some sections as completed
  const completedSections = ['details', 'start-version']
  return completedSections.includes(sectionId)
}

const SimpleSidebarNavigation = (props: SidebarNavigationProps) => {
  const [activeSection, setActiveSection] = React.useState('details')

  return (
    <div className="h-96 bg-black p-4">
      <SidebarNavigation
        {...props}
        activeSection={activeSection}
        onSectionClick={setActiveSection}
      />
    </div>
  )
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default sidebar navigation component.',
      },
    },
  },
  render: ({ ...props }) => (
    <SimpleSidebarNavigation
      {...props}
      sections={mockSections}
      hasMetReq={mockHasMetReq}
    />
  ),
}

export const AllCompleted: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar navigation with all sections completed.',
      },
    },
  },
  render: ({ ...props }) => (
    <SimpleSidebarNavigation
      {...props}
      sections={mockSections}
      hasMetReq={() => true}
    />
  ),
}

export const NoneCompleted: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar navigation with no sections completed.',
      },
    },
  },
  render: ({ ...props }) => (
    <SimpleSidebarNavigation
      {...props}
      sections={mockSections}
      hasMetReq={() => false}
    />
  ),
}

export const MinimalSections: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar navigation with minimal sections.',
      },
    },
  },
  render: ({ ...props }) => (
    <SimpleSidebarNavigation
      {...props}
      sections={[
        { id: 'section1', label: 'Section 1', required: true },
        { id: 'section2', label: 'Section 2', required: false },
      ]}
      hasMetReq={(id) => id === 'section1'}
    />
  ),
}
