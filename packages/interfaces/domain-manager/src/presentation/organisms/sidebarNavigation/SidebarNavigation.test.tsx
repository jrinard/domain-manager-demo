import { screen } from '@testing-library/react'
import { render } from '@spacedock/holoprojector'
import { expect, describe, it, vi } from 'vitest'
import { composeStories } from '@storybook/react'
import '@testing-library/jest-dom'

import * as stories from './SidebarNavigation.stories'
import { SidebarNavigation, NavigationSection } from './SidebarNavigation'

const { Default, AllCompleted, NoneCompleted, MinimalSections } =
  composeStories(stories)

describe('SidebarNavigation', () => {
  const mockSections: NavigationSection[] = [
    { id: 'details', label: 'Details', required: true },
    { id: 'start-version', label: 'Start Version', required: true },
    { id: 'layout', label: 'Layout', required: false },
  ]

  const mockHasMetReq = vi.fn((sectionId: string) => {
    return sectionId === 'details'
  })

  const mockOnSectionClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders and is present', () => {
    render(
      <SidebarNavigation
        sections={mockSections}
        activeSection="details"
        onSectionClick={mockOnSectionClick}
        hasMetReq={mockHasMetReq}
      />,
    )

    // Just verify the component loads and shows the progress bar
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  describe('Storybook Stories', () => {
    it('renders Default story', () => {
      render(<Default />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders AllCompleted story', () => {
      render(<AllCompleted />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders NoneCompleted story', () => {
      render(<NoneCompleted />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders MinimalSections story', () => {
      render(<MinimalSections />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })
})
