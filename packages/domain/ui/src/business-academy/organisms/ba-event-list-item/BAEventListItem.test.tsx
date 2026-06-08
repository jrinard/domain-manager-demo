import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BAEventListItem.stories'
const { EventToday } = composeStories(stories)

describe('BAEventListItem', () => {
  it('EventToday', () => {
    const { baseElement } = render(<EventToday {...EventToday.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.getByText('DEV Test')).toBeTruthy()
  })
})
