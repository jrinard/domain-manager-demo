import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './ImageCropCore.stories'
const { BannerImage, SquareImage, TileImage } = composeStories(stories)

describe('ImageCropCore Square Image', () => {
  it('should render story SquareImage', () => {
    const { baseElement } = render(<SquareImage {...SquareImage.args} />)
    expect(baseElement).toBeTruthy()
  })
})

describe('ImageCropCore Tile Image', () => {
  it('should render story TileImage', () => {
    const { baseElement } = render(<TileImage {...TileImage.args} />)
    expect(baseElement).toBeTruthy()
  })
})

describe('ImageCropCore Banner Image', () => {
  it('should render story BannerImage', () => {
    const { baseElement } = render(<BannerImage {...BannerImage.args} />)
    expect(baseElement).toBeTruthy()
  })
})
