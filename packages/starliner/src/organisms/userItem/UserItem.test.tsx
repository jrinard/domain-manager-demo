import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './UserItem.stories'
const { Selected } = composeStories(stories)

describe('UserItem', () => {
  it(Selected.parameters.docs.description.story, () => {
    const { baseElement } = render(<Selected {...Selected.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.getByText('I AM SELECTED')).toBeInTheDocument()
  })
})
