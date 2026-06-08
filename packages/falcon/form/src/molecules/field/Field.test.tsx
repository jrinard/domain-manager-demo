import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './Field.stories'
const { Required } = composeStories(stories)

describe('Field', () => {
  it('renders requires', () => {
    render(<Required {...Required.args} />)
    expect(screen.getByText('Required *')).toBeInTheDocument()
  })
})
