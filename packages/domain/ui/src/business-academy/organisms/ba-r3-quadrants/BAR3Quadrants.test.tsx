import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BAR3Quadrants.stories'
const { Deafult, IsLoading } = composeStories(stories)

describe('BAR3', () => {
  it('Deafult', () => {
    const { baseElement } = render(<Deafult {...Deafult.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.queryByLabelText('loading')).toBeFalsy()
  })

  it('IsLoading', () => {
    render(<IsLoading {...IsLoading.args} />)
    expect(screen.queryByLabelText('loading')).toBeTruthy()
  })
})
