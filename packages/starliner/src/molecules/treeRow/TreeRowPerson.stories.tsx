import type { Meta, StoryObj } from '@storybook/react'
import { useSet } from '@spacedock/noonian'

import type { TreeRowPersonProps } from './TreeRowPerson'
import { TreeRowPerson } from './TreeRowPerson'

const ToggleStateWrapper = (props: TreeRowPersonProps) => {
  const toggleState = useSet<number>({ initialList: [] })

  const showChildren = toggleState.has(1)

  return (
    <TreeRowPerson
      {...props}
      showChildren={showChildren}
      updateShowChildren={() => toggleState.toggle(1)}
    />
  )
}

const meta: Meta<typeof TreeRowPerson> = {
  title: 'Starliner/Molecules/Tree Row/Tree Row Person',

  component: TreeRowPerson,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TreeRowPerson>

export const PersonRowItem: Story = {
  args: {
    title: 'Some Person Name',
    type: 'user',
    lastActivityDate: '2021-01-01T00:00:00.000Z',
    primaryTeamName: 'Some Team Name',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Toggleable Team Row Item without content inside',
      },
    },
  },
  render: ({ ...props }) => <ToggleStateWrapper {...props} />,
}

export const PersonTeamLeaderRowItem: Story = {
  args: {
    title: 'Some Person Name',
    type: 'teamLeader',
    lastActivityDate: '2021-01-01T00:00:00.000Z',
    primaryTeamName: 'Some Team Name',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Toggleable Team Row Item without content inside',
      },
    },
  },
  render: ({ ...props }) => <ToggleStateWrapper {...props} />,
}

export const PersonPrimaryTeamRowItem: Story = {
  args: {
    title: 'Some Person Name',
    type: 'primaryTeam',
    lastActivityDate: '2021-01-01T00:00:00.000Z',
    primaryTeamName: 'Some Team Name',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Toggleable Team Row Item without content inside',
      },
    },
  },
  render: ({ ...props }) => <ToggleStateWrapper {...props} />,
}
