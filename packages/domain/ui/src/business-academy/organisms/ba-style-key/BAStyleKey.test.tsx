import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BAStyleKey.stories'
const { Deafult } = composeStories(stories)

describe('BAStyleKey', () => {
  it('Deafult', () => {
    const { baseElement } = render(<Deafult {...Deafult.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.getByText('D')).toBeTruthy()
  })
})
