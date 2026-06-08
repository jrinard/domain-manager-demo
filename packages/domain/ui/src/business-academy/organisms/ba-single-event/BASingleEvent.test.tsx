import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BASingleEvent.stories'
const { Deafult, IsLoading } = composeStories(stories)

describe('BASingleEvent', () => {
  it('Deafult', () => {
    const { baseElement } = render(<Deafult {...Deafult.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.queryByLabelText('loading')).toBeFalsy()
    expect(screen.getByText('DEV Test')).toBeTruthy()
  })

  it('IsLoading', () => {
    render(<IsLoading {...IsLoading.args} />)
    expect(screen.queryAllByLabelText('loading')[0]).toBeTruthy()
  })
})
