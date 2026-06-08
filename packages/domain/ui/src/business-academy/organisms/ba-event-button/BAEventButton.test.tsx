import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BAEventButton.stories'
const {
  Registered,
  RegisteredAndSoon,
  RegisteredAndSoonThin,
  RegisteredThin,
  Unregistered,
  UnregisteredThin,
} = composeStories(stories)

describe('BAEventButton', () => {
  it('RegisteredAndSoon', () => {
    render(<RegisteredAndSoon {...RegisteredAndSoon.args} />)
    expect(screen.queryByText('Registered')).toBeTruthy()
  })

  it('RegisteredAndSoonThin', () => {
    render(<RegisteredAndSoonThin {...RegisteredAndSoonThin.args} />)
    expect(screen.queryByText('Registered')).toBeTruthy()
  })
  it('Registered', () => {
    render(<Registered {...Registered.args} />)
    expect(screen.queryByText('Registered')).toBeTruthy()
  })

  it('RegisteredThin', () => {
    render(<RegisteredThin {...RegisteredThin.args} />)
    expect(screen.queryByText('Registered')).toBeTruthy()
  })

  it('Unregistered', () => {
    render(<Unregistered {...Unregistered.args} />)
    expect(screen.queryByText('Register')).toBeTruthy()
  })

  it('UnregisteredThin', () => {
    render(<UnregisteredThin {...UnregisteredThin.args} />)
    expect(screen.queryByText('Register')).toBeTruthy()
  })
})
