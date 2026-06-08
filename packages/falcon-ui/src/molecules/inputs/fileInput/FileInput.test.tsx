import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './FileInput.stories'
const { ImageFileInput } = composeStories(stories)

describe('FileInput', () => {
  it('should render story ImageFileInput', () => {
    const { baseElement } = render(<ImageFileInput {...ImageFileInput.args} />)
    expect(baseElement).toBeTruthy()
  })
})
