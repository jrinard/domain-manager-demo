import { render, screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './ToggleGroup.stories'
const { Populated, NoOptions } = composeStories(stories)

describe('ToggleGroup', () => {
  it(Populated.parameters.docs.description.story, () => {
    render(<Populated {...Populated.args} />)
    expect(screen.queryByText('This week')).toBeInTheDocument()
  })
  it(NoOptions.parameters.docs.description.story, () => {
    render(<NoOptions {...NoOptions.args} />)
    expect(screen.queryByText('This week')).not.toBeInTheDocument()
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })
})
