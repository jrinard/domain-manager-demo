import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BACalendar.stories'
const { Noevents } = composeStories(stories)

describe('BACalendar', () => {
  it('Noevents', () => {
    const { baseElement } = render(<Noevents {...Noevents.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.queryByLabelText('loading')).toBeFalsy()
    expect(screen.getByText('Sun')).toBeTruthy()
  })
})
