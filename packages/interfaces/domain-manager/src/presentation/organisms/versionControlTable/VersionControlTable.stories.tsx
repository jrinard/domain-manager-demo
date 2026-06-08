import type { Meta, StoryObj } from '@storybook/react'
import { noop } from 'lodash'

import { VersionControlTable } from './VersionControlTable'
import { MemoryRouter } from 'react-router-dom'

const meta: Meta<typeof VersionControlTable> = {
  title: 'App: Domain Manager/Organisms/Version Control Table',
  component: VersionControlTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof VersionControlTable>

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The list is empty',
      },
    },
  },
  render: ({ ...props }) => (
    <MemoryRouter>
      <VersionControlTable
        refetch={noop}
        version={'live'}
        isLoading={false}
        data={[]}
        page="tryyb"
        onDelete={noop}
      />
    </MemoryRouter>
  ),
}

export const Loading: Story = {
  parameters: {
    isLoading: true,
    docs: {
      description: {
        story: 'The table is loading',
      },
    },
  },
  render: ({ ...props }) => (
    <MemoryRouter>
      <VersionControlTable
        refetch={noop}
        version={'live'}
        isLoading
        data={[]}
        page="tryyb"
        onDelete={noop}
      />
    </MemoryRouter>
  ),
}
