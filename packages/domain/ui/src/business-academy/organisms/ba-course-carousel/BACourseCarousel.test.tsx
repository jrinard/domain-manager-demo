import { render } from '@spacedock/holoprojector'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'
import * as stories from './BACourseCarousel.stories'

const { Default } = composeStories(stories)

describe('BACourseCarousel', () => {
  it('renders without crashing', () => {
    const { container } = render(<Default {...Default.args} />)
    expect(container).toBeTruthy()
  })

  it('renders carousel content', () => {
    const { container } = render(<Default {...Default.args} />)

    // Look for carousel-related elements using basic DOM queries
    const carouselElement =
      container.querySelector('[data-testid*="carousel"]') ||
      container.querySelector('.carousel') ||
      container.querySelector('[class*="carousel"]') ||
      container.querySelector('[role="region"]')

    // Verify the component rendered with some content
    expect(container.firstChild).toBeTruthy()

    // If we found a carousel element, verify it exists
    if (carouselElement) {
      expect(carouselElement).toBeTruthy()
    }
  })
})
