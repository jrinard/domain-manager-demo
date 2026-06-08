import { render } from '@spacedock/holoprojector'
import { screen, waitFor } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './TeamTreeInput.stories'
import { userEvent } from 'storybook/test'
const { Unselected, IsLoading, Selected } = composeStories(stories)

describe('TeamTreeInput', () => {
  it('Unselected', () => {
    const { baseElement } = render(<Unselected {...Unselected.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.queryByLabelText('loading')).not.toBeInTheDocument()
  })

  it('IsLoading', async () => {
    render(<IsLoading {...IsLoading.args} />)
    await userEvent.type(screen.getByLabelText('team-tree-input'), 't')

    await waitFor(() => {
      expect(screen.queryByLabelText('loading')).toBeInTheDocument()
    })
  })

  it('Selected', async () => {
    render(<Selected {...Selected.args} />)
    expect(screen.queryByLabelText('loading')).not.toBeInTheDocument()
    await userEvent.type(screen.getByLabelText('team-tree-input'), 'C')

    await waitFor(() => {
      expect(screen.queryByText('Cardone Ventures')).toBeInTheDocument()
    })
  })
})
