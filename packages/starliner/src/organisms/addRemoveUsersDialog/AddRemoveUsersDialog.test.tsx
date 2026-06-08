import { userEvent } from 'storybook/test'
import { render, screen, waitFor } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'
import * as Tdm from '../../../tests/tdm'
import { composeStories } from '@storybook/react'

import { AddRemoveUsersDialog } from './AddRemoveUsersDialog'
import * as stories from './AddRemoveUsersDialog.stories'
const { Included, Excluded } = composeStories(stories)

describe('AddRemoveUsersDialog', () => {
  it('renders title and includedLabel (excludedLabel only shows when populated)', () => {
    render(
      <AddRemoveUsersDialog
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        onSearch={vi.fn()}
        onOpenChange={vi.fn()}
        title="Participants Title"
        excludedUsers={[]}
        excludedLabel="Not going"
        includedLabel="Going"
        includedUsers={[]}
        open
      />,
    )
    expect(screen.getByText('Participants Title')).toBeInTheDocument()
    expect(screen.queryByText('Not going')).not.toBeInTheDocument()
    expect(screen.getByText('Going')).toBeInTheDocument()
  })
  it('renders excludedLabel when excluded list is populated', () => {
    render(
      <AddRemoveUsersDialog
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        onSearch={vi.fn()}
        onOpenChange={vi.fn()}
        title="Participants Title"
        excludedUsers={[Tdm.createUser({ displayName: 'Jean Luc' })]}
        excludedLabel="Not going"
        includedLabel="Going"
        includedUsers={[]}
        open
      />,
    )
    expect(screen.getByText('Participants Title')).toBeInTheDocument()
    expect(screen.getByText('Not going')).toBeInTheDocument()
    expect(screen.getByText('Going')).toBeInTheDocument()
  })
  it('renders Included story', async () => {
    render(<Included {...Included.args} />)
    await userEvent.click(screen.getByText('Open Dialog'))
    await waitFor(() =>
      expect(screen.getByText('Included')).toBeInTheDocument(),
    )
  })
  it('renders Excluded story', async () => {
    render(<Excluded {...Excluded.args} />)
    await userEvent.click(screen.getByText('Open Dialog'))
    await waitFor(() =>
      expect(screen.getByText('Not Included')).toBeInTheDocument(),
    )
  })
})
