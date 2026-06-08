import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BADefaultEvents.stories'
const { IsLoading, Default } = composeStories(stories)

describe('BADefaultEvents', () => {
  it('IsLoading', () => {
    render(<IsLoading {...IsLoading.args} />)
    expect(screen.queryAllByLabelText('loading')[0]).toBeTruthy()
  })

  it('Default', () => {
    render(<Default {...Default.args} />)
    expect(screen.queryByLabelText('loading')).toBeFalsy()
    // * This is dynamically rendered data that filters dates out as time in real life goes on.
    // // expect(screen.queryByText('Nov 08, Friday')).toBeTruthy()
  })
})
