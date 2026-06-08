import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TeamTreeInput, TeamTreeInputProps } from './TeamTreeInput'
import { TeamsByFunctionEndpointResponses } from '@tyto/lore'
import { Team } from '../../types'

const meta: Meta<typeof TeamTreeInput> = {
  title: 'Starliner/Organisms/Team Tree Input',
  component: TeamTreeInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TeamTreeInput>

export const Unselected: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Team Tree Input with no team selected',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <TeamTreeInput
      {...props}
      teams={
        TeamsByFunctionEndpointResponses.success().teams.filter(
          (t) => t.teamType !== 'ocPROJECT',
        ) as Team[]
      }
      onSelect={(teamID: number) => window.alert("You've selected " + teamID)}
    />
  ),
}

const ExampleSelected = (props: TeamTreeInputProps) => {
  const [selectedTeams, setSelectedTeams] = React.useState([1698652])
  const [teams] = React.useState(
    TeamsByFunctionEndpointResponses.success().teams.filter(
      (t) => t.teamType !== 'ocPROJECT',
    ) as Team[],
  )
  return (
    <TeamTreeInput
      {...props}
      selectedTeams={selectedTeams}
      teams={teams}
      onSelect={(teamID: number) => {
        setSelectedTeams((prev) => {
          if (!prev.includes(teamID)) {
            return [...prev, teamID]
          }
          return prev
        })
      }}
    />
  )
}

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
  },
  render: ({ ...props }) => <ExampleSelected {...props} />,
}

export const IsLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the data is loading',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <TeamTreeInput
      {...props}
      teams={
        TeamsByFunctionEndpointResponses.success().teams.filter(
          (t) => t.teamType !== 'ocPROJECT',
        ) as Team[]
      }
      onSelect={(teamID: number) => window.alert("You've selected " + teamID)}
      isLoading
    />
  ),
}
