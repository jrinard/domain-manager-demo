import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Tabs } from './Tabs'
import * as stories from './Tabs.stories'
const { Links } = composeStories(stories)

describe('Tabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tabs items={[]} ariaLabelBy="basic" />)
    expect(baseElement).toBeTruthy()
  })
  it('renders Tab', () => {
    render(<Tabs items={[{ id: 1, label: 'Item 1' }]} ariaLabelBy="basic" />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })
  it(Links.parameters.docs.description.story, () => {
    render(<Links {...Links.args} />)
  })
})
