import { screen } from '@testing-library/react'
import { render } from '@spacedock/holoprojector'
import { expect, describe, it, vi } from 'vitest'
import { composeStories } from '@storybook/react'
import '@testing-library/jest-dom'

import * as stories from './ImagesPage.stories'
import { ImagesPage } from './ImagesPage'

const { Present, Loading } = composeStories(stories)

// Mock the SidebarNavigation component
vi.mock('../../organisms/sidebarNavigation', () => ({
  SidebarNavigation: () => <div data-testid="sidebar-navigation">Sidebar</div>,
}))

// Mock the ImageCard component
vi.mock('../../organisms/imageCard', () => ({
  ImageCard: () => <div data-testid="image-card">Image Card</div>,
}))

// Mock tryyb services hook to avoid needing the provider in unit tests
vi.mock('@spacedock/tryyb-services', () => {
  return {
    useTryybServices: () => ({
      uploadFile: async (file: File) => {
        return {
          uploadFiles: [{ fileUploadKey: 'test-temp-key' }],
          uploadKey: 'test-temp-key',
        }
      },
      uploadFileViaChooser: async () => {
        return {
          url: 'test-temp-key',
        }
      },
    }),
  }
})

describe('ImagesPage', () => {
  it('renders present state with content', () => {
    render(<ImagesPage domainID={123} />)

    expect(screen.getByText('Logo & Background Images')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-navigation')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(<ImagesPage domainID={123} />)

    expect(screen.getByText('Logo & Background Images')).toBeInTheDocument()
  })

  describe('Storybook Stories', () => {
    it(Present.parameters.docs.description.story, () => {
      render(<Present />)
      expect(screen.getByText('Logo & Background Images')).toBeInTheDocument()
    })

    it(Loading.parameters.docs.description.story, () => {
      render(<Loading />)
      expect(screen.getByText('Logo & Background Images')).toBeInTheDocument()
    })
  })
})
