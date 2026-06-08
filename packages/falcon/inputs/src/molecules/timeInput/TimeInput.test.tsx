import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './TimeInput.stories'
const { Unpassed, Passed } = composeStories(stories)

describe('TimeInput', () => {
  it(Unpassed.parameters.docs.description.story, () => {
    const { baseElement } = render(<Unpassed {...Unpassed.args} />)
    expect(baseElement).toBeTruthy()
  })

  it(Passed.parameters.docs.description.story, () => {
    render(<Passed {...Passed.args} />)
    expect(screen.queryAllByText('12:00 AM')).toBeTruthy()
  })
})
