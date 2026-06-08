import type { Meta, StoryObj } from '@storybook/react'
import {
  PeopleAdvancedSearchEndpointResponses,
  TeamsByFunctionEndpointResponses,
} from '@tyto/lore'
import { TextBody, TextHeading, TextInput } from '@spacedock/falcon-ui'
import { useThrottledSearchTerm } from '@spacedock/noonian'

import type { Team, PeopleData } from '../../types'
import type { TeamTreeProps } from './TeamTree'
import { TeamTree } from './TeamTree'
import type { TeamTreeWithPeopleProps } from './TeamTreeWithPeople'
import { TeamTreeWithPeople } from './TeamTreeWithPeople'

const SearchTermWrapper = (props: TeamTreeProps) => {
  const throttledData = useThrottledSearchTerm({
    initialSearchTerm: '',
    delayMS: 280,
  })

  return (
    <div>
      <section>
        <TextInput
          autoFocus
          value={throttledData.searchTermForInput}
          onChange={(e) => throttledData.setSearchTerm(e.target.value)}
        />
      </section>
      <section>
        <TeamTree
          {...props}
          searchTerm={throttledData.searchTermForFiltering}
        />
      </section>
    </div>
  )
}

const PeopleSearchTermWrapper = (props: TeamTreeWithPeopleProps) => {
  const throttledData = useThrottledSearchTerm({
    initialSearchTerm: '',
    delayMS: 280,
  })

  return (
    <div>
      <section>
        <TextInput
          autoFocus
          value={throttledData.searchTermForInput}
          onChange={(e) => throttledData.setSearchTerm(e.target.value)}
        />
      </section>
      <section>
        <TeamTreeWithPeople
          {...props}
          searchTerm={throttledData.searchTermForFiltering}
          peopleData={PEOPLE_DATA}
          onPersonSelect={(userID) =>
            window.alert(`Person Selected with ID: ${userID}`)
          }
        />
      </section>
    </div>
  )
}

const PEOPLE_DATA: PeopleData =
  PeopleAdvancedSearchEndpointResponses.successCVData().ret

const meta: Meta<typeof TeamTree> = {
  title: 'Starliner/Organisms/Team Tree',
  component: TeamTree,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TeamTree>

export const TeamTreeOnly: Story = {
  args: {
    teams: TeamsByFunctionEndpointResponses.success().teams.filter(
      (t) => t.teamType !== 'ocPROJECT',
    ) as Team[],
    onSelect: (teamID: number) => window.alert("You've selected " + teamID),
    indentation: 'lg',
    indentationLine: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Renders Team Tree Structure without any additional Information apart from the Team Name',
      },
    },
  },
  render: ({ ...props }) => <TeamTree {...props} />,
}

export const AutomaticallyShowingPathToTargetTeam: Story = {
  args: {
    teams: TeamsByFunctionEndpointResponses.success().teams.filter(
      (t) => t.teamType !== 'ocPROJECT',
    ) as Team[],
    onSelect: (teamID: number) => window.alert("You've selected " + teamID),
    targetTeamID: 1749519,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Renders Team Tree Structure and Automatically Reveals Teams Along the Path to the Target Team (ex: 10X360 - December 2019 Miami)',
      },
    },
  },
  render: ({ ...props }) => (
    <div>
      <section className="bg-yellow-200/40 px-5 py-4">
        <TextHeading>
          Automatically Revealing Path to "10X360 - December 2019 Miami"
        </TextHeading>
      </section>

      <TeamTree {...props} />
    </div>
  ),
}

export const WithSearchInput: Story = {
  args: {
    teams: TeamsByFunctionEndpointResponses.success().teams.filter(
      (t) => t.teamType !== 'ocPROJECT',
    ) as Team[],
    onSelect: (teamID: number) => window.alert("You've selected " + teamID),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Renders Team Tree Structure with the ability to Filter by Search Term',
      },
    },
  },
  render: ({ ...props }) => <SearchTermWrapper {...props} />,
}

export const WithPeopleMemberships: Story = {
  args: {
    teams: TeamsByFunctionEndpointResponses.success().teams.filter(
      (t) => t.teamType !== 'ocPROJECT',
    ) as Team[],
    onSelect: (teamID: number) => window.alert("You've selected " + teamID),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Renders Team Tree Structure with People Pertaining to a Team Being rendered within the Team',
      },
    },
  },
  render: ({ ...props }) => (
    <div>
      <section className="bg-yellow-200/40 px-5 py-4">
        <TextHeading>
          NOTE: This Snapshotted Advanced Person Search Data
        </TextHeading>
        <TextHeading size={2}>
          Most Teams Do No Have People Memberships Present.
        </TextHeading>
        <TextBody paragraph>
          Try Checking "Cardone Ventures Team" or "Cardone Ventures Clients"
        </TextBody>
      </section>

      <TeamTreeWithPeople
        {...props}
        peopleData={PEOPLE_DATA}
        onPersonSelect={(userID) =>
          window.alert(`Person Selected with ID: ${userID}`)
        }
      />
    </div>
  ),
}

export const WithSearchAndPeopleMemberships: Story = {
  args: {
    teams: TeamsByFunctionEndpointResponses.success().teams.filter(
      (t) => t.teamType !== 'ocPROJECT',
    ) as Team[],
    onSelect: (teamID: number) => window.alert("You've selected " + teamID),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Renders Team Tree Structure with People Pertaining to a Team Being rendered within the Team',
      },
    },
  },
  render: ({ ...props }) => (
    <div>
      <section className="bg-yellow-200/40 px-5 py-4">
        <TextHeading>
          NOTE: This Snapshotted Advanced Person Search Data
        </TextHeading>
        <TextHeading size={2}>
          Most Teams Do No Have People Memberships Present.
        </TextHeading>
        <TextBody paragraph>
          Try Checking "Cardone Ventures Team" or "Cardone Ventures Clients"
        </TextBody>
      </section>

      <PeopleSearchTermWrapper
        {...props}
        peopleData={PEOPLE_DATA}
        onPersonSelect={(userID) =>
          window.alert(`Person Selected with ID: ${userID}`)
        }
      />
    </div>
  ),
}

export const Loading: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Renders Team Tree in a loading state',
      },
    },
  },
  render: ({ ...props }) => <TeamTree {...props} isLoading teams={[]} />,
}
