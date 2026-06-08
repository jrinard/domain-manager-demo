import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './ImageCrop.stories'
const { CropUsingFileInput } = composeStories(stories)

describe('ImageCrop', () => {
  it('should render story CropUsingFileInput', () => {
    const { baseElement } = render(
      <CropUsingFileInput {...CropUsingFileInput.args} />
    )
    expect(baseElement).toBeTruthy()
  })
})
