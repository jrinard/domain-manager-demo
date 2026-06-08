import { screen, render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './Drawer.stories'

const { Default } = composeStories(stories)

describe('Drawer', () => {
  it('renders the Drawer story and its trigger', () => {
    const { baseElement } = render(<Default {...Default.args} />)

    expect(baseElement).toBeTruthy()

    expect(
      screen.getByRole('button', { name: /open drawer/i }),
    ).toBeInTheDocument()
  })
})
