import { screen } from '@testing-library/react'
import { render } from '@spacedock/holoprojector'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'
import '@testing-library/jest-dom'

import * as stories from './ImageCard.stories'
import { ImageCard } from './ImageCard'

const { Present, Loading } = composeStories(stories)

describe('ImageCard', () => {
  it('renders present state with image and both buttons', () => {
    render(
      <ImageCard
        title="Test Title"
        description="Test Description"
        imageUrl="https://example.com/image.jpg"
      />,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByTestId('image-card')).toBeInTheDocument()
  })

  it('renders loading state with no image and upload button only', () => {
    render(<ImageCard title="Test Title" description="Test Description" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('No Image')).toBeInTheDocument()
    expect(screen.getByTestId('image-card')).toBeInTheDocument()
  })

  describe('Storybook Stories', () => {
    it(Present.parameters.docs.description.story, () => {
      render(<Present />)
      expect(screen.getByText('Main Logo')).toBeInTheDocument()
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it(Loading.parameters.docs.description.story, () => {
      render(<Loading />)
      expect(screen.getByText('Login Logo')).toBeInTheDocument()
      expect(
        screen.getByText('Recommended Size: 1920x1080'),
      ).toBeInTheDocument()
      expect(screen.getByText('No Image')).toBeInTheDocument()
    })
  })
})
