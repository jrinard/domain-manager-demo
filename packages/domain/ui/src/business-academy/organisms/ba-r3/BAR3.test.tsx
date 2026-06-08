import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BAR3.stories'
const { Deafult, IsLoading } = composeStories(stories)

describe('BAR3', () => {
  it('Deafult', () => {
    const { baseElement } = render(<Deafult {...Deafult.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.queryByLabelText('loading')).toBeFalsy()
    expect(screen.getByText('Small Earthen Pot LLC')).toBeTruthy()
  })

  it('IsLoading', () => {
    render(<IsLoading {...IsLoading.args} />)
    expect(screen.queryByLabelText('loading')).toBeTruthy()
  })
})
