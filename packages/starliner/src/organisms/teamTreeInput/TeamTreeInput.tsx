//* Dev Note:
//* This component is used to select a team from a tree of teams.
//* It is used in the domain manager and team editor.
//* It is used to select a team from a tree of teams.
//* projectsIncluded hides the checkbox and removed the data from the tree
//* teamsIncluded hides the checkbox and removes the data from the tree, but also hides the domain checkbox only because there is just one option to show

import React from 'react'
import { useThrottledSearchTerm } from '@spacedock/noonian'
import { CheckboxInput, TextInput } from '@falcon/inputs'
import { TeamTree } from '../teamTree/TeamTree'
import { Team, Membership } from '../../types'

export interface TeamTreeInputProps {
  selectedTeams?: number[]
  onSelect: (
    teamID: number,
    teamType?: 'ocDOMAIN' | 'ocTEAM' | 'ocPROJECT',
  ) => void
  isLoading?: boolean
  teams: Team[]
  personMemberships?: Membership[]
  size?: 'base' | 'fill-screen'
  projectsIncluded?: boolean
  teamsIncluded?: boolean
}

const TeamTreeInput = ({
  selectedTeams,
  isLoading,
  teams,
  onSelect,
  size = 'base',
  personMemberships,
  projectsIncluded = true,
  teamsIncluded = true,
  ...props
}: TeamTreeInputProps) => {
  const [open, setOpen] = React.useState(true)
  const [showProjects, setShowProjects] = React.useState(false)
  const [showTeams, setShowTeams] = React.useState(teamsIncluded)
  const [showDomains, setShowDomains] = React.useState(true)

  const { searchTermForFiltering, searchTermForInput, setSearchTerm } =
    useThrottledSearchTerm({
      delayMS: 280,
      initialSearchTerm: '',
    })

  const filteredTeams = React.useMemo(() => {
    return teams.filter((team) => {
      if (!showProjects && team.teamType === 'ocPROJECT') return false
      if (!showTeams && team.teamType === 'ocTEAM') return false
      if (!showDomains && team.teamType === 'ocDOMAIN') return false
      return true
    })
  }, [teams, showProjects, showTeams, showDomains])

  const membershipTeamIDs = React.useMemo(() => {
    return personMemberships?.map((membership) => membership.teamID) || []
  }, [personMemberships])

  // Size variant styles
  const containerStyles = {
    base: {
      className: 'overflow-auto max-h-[460px] max-w-52',
      style: {
        maxHeight: '460px',
        minWidth: '500px',
      },
    },
    'fill-screen': {
      className: 'overflow-auto max-h-[80vh] w-full',
      style: {
        maxHeight: '80vh',
        minWidth: '100%',
      },
    },
  }

  const containerVariant = containerStyles[size]

  return (
    <>
      <TextInput
        placeholder="Search"
        aria-label="team-tree-input"
        value={searchTermForInput}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          if (!open) {
            setOpen(true)
          }
        }}
        trailingIcon="search"
        onTrailingClick={() => {
          setOpen(true)
        }}
      />
      <div className="m-4 mb-4 flex items-center justify-center gap-4">
        {teamsIncluded && (
          <>
            <CheckboxInput
              className="m-0"
              checked={showDomains}
              color="secondary"
              label="Include Domains"
              onCheckedChange={() => setShowDomains(!showDomains)}
            />

            <CheckboxInput
              className="m-0"
              checked={showTeams}
              color="secondary"
              label="Include Teams"
              onCheckedChange={() => setShowTeams(!showTeams)}
            />
          </>
        )}
        {projectsIncluded && (
          <CheckboxInput
            className="m-0"
            checked={showProjects}
            color="secondary"
            label="Include Projects"
            onCheckedChange={() => setShowProjects(!showProjects)}
          />
        )}
      </div>
      <div
        className={containerVariant.className}
        style={containerVariant.style}
      >
        <TeamTree
          highlightIDs={membershipTeamIDs}
          isLoading={isLoading}
          targetTeamID={selectedTeams && selectedTeams[0]}
          searchTerm={searchTermForFiltering}
          onSelect={(teamID, teamType) => {
            onSelect(teamID, teamType)
          }}
          teams={filteredTeams}
        />
      </div>
    </>
  )
}

TeamTreeInput.displayName = 'TeamTreeInput'

export { TeamTreeInput }
