import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BAAllEventsList.stories'
const { Default, IsLoading } = composeStories(stories)

describe('BAAllEventsList', () => {
  it('Default', () => {
    const { baseElement } = render(<Default {...Default.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.queryByLabelText('loading')).toBeFalsy()
    expect(screen.getByText('Template - HR Live Call')).toBeTruthy()
  })

  it('IsLoading', () => {
    render(<IsLoading {...IsLoading.args} />)
    expect(screen.queryAllByLabelText('loading')[0]).toBeTruthy()
  })
})
