import { render } from '@testing-library/react'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './Collapsible.stories'
const { Collapsed } = composeStories(stories)

describe('Collapsible', () => {
  it(Collapsed.parameters.docs.description.story, () => {
    const { baseElement } = render(<Collapsed {...Collapsed.args} />)
    expect(baseElement).toBeTruthy()
  })
})
