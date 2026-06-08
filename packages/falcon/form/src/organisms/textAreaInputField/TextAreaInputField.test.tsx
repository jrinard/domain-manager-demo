import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './TextAreaInputField.stories'
const { WithLabel } = composeStories(stories)

describe('TextAreaField', () => {
  it(WithLabel.parameters.docs.description.story, () => {
    const { baseElement } = render(<WithLabel {...WithLabel.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.queryByLabelText('notes')).not.toBeInTheDocument()
  })
})
