import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BAAllEventsListItem.stories'
const { Default } = composeStories(stories)

describe('BAAllEventsListItem', () => {
  it('Default', () => {
    const { baseElement } = render(<Default {...Default.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.getByText('Template - HR Live Call')).toBeTruthy()
  })
})
