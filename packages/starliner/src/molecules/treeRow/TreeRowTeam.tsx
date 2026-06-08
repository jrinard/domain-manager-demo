import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'
import { cva, mergeClasses, VariantProps } from '@falcon/style'
import type { SecondaryMatchData } from '@falcon/text-highlighter'
import { isDeactivated as checkIfDeactivated } from '@spacedock/tardis' // Renaming the import

import type { TreeRowProps } from './TreeRow'
import { TreeRow } from './TreeRow'
import type { TeamRelationshipsMap, TeamTreeShowLists, Team } from '../../types'
import { useTeamsByID } from '../../hooks/useTeamsByID'

import { ensure3 } from '../../utils'

const variants = cva('', {
  variants: {
    indentation: {
      lg: 'pl-5',
      md: 'pl-6',
      sm: 'pl-1.5',
    },
    indentationLine: {
      true: 'border-l border-gray-50',
      false: '',
    },
    borderColor: {
      [-1]: '',
      0: 'border-gray-50',
      1: 'border-gray-50 border-opacity-60',
      2: 'border-gray-50 border-opacity-30',
    },
  },
  defaultVariants: {
    indentation: 'lg',
    indentationLine: false,
    borderColor: -1,
  },
})

export interface TreeRowTeamProps
  extends Omit<
      TreeRowProps,
      'title' | 'type' | 'updateShowChildren' | 'onSelect'
    >,
    VariantProps<typeof variants> {
  forceShowTeamToggle?: boolean
  level: number
  onSelect: (
    teamID: number,
    teamType?: 'ocDOMAIN' | 'ocTEAM' | 'ocPROJECT',
  ) => void
  teamID: number
  teamRelationships: TeamRelationshipsMap
  showLists: TeamTreeShowLists
  showTeamIDs: Set<number>
  teamsByID: ReturnType<typeof useTeamsByID>
  teamAuxiliaryComponent?: ComponentType<{
    team: Team
    teamID: number
    highlightIDsSet?: Set<number>
  }>
  updateShowChildren: (teamID: number, shouldShow: boolean) => void
  highlightIDsSet?: Set<number>
  focusTeamIDsSet?: Set<number>
  toggleFocusTeamID?: (teamID: number) => void
}

const TreeRowTeam = ({
  indentation,
  indentationLine,
  level,
  showLists,
  teamID,
  teamRelationships,
  teamsByID,
  teamAuxiliaryComponent: TeamAuxiliaryComponent,
  updateShowChildren,
  onSelect,
  highlight,
  ...props
}: TreeRowTeamProps) => {
  const [SecondaryMatchData] = useState<SecondaryMatchData[]>([
    { propertyName: 'teamID', value: `${teamID || ''}` },
  ])
  const team = teamsByID[teamID]
  const isDeactivated = team?.outsideExpirationDate
    ? checkIfDeactivated(team.outsideExpirationDate)
    : false

  const childTeamIDs = teamRelationships.childrenIDsByParentID[teamID] || []

  const childTeamIDsFiltered = useMemo(() => {
    const childTeamIDs = teamRelationships.childrenIDsByParentID[teamID] || []

    if (!childTeamIDs?.length) {
      return []
    }

    const activeTeams: number[] = []
    const deactivatedTeams: number[] = []

    childTeamIDs.forEach((childTeamID) => {
      if (!childTeamID || !teamsByID[childTeamID]) return

      if (
        !props.showChildren &&
        !showLists.matchingTeamIDs.has(childTeamID) &&
        !showLists.pathTeamIDs.has(childTeamID)
      ) {
        return
      }

      const childTeam = teamsByID[childTeamID]
      if (checkIfDeactivated(childTeam?.outsideExpirationDate)) {
        deactivatedTeams.push(childTeamID)
      } else {
        activeTeams.push(childTeamID)
      }
    })

    return [...activeTeams, ...deactivatedTeams]
  }, [
    teamID,
    teamRelationships.childrenIDsByParentID,
    props.showChildren,
    showLists.pathTeamIDs,
    showLists.matchingTeamIDs,
    teamsByID,
  ])

  return (
    <TreeRow
      {...props}
      isDeactivated={isDeactivated}
      highlight={highlight}
      onSelect={() => onSelect(teamID, team?.teamType)}
      hideIcon={!childTeamIDs?.length && !props.forceShowTeamToggle}
      updateShowChildren={(shouldShow) =>
        updateShowChildren(teamID, shouldShow)
      }
      title={team?.name || '(Unnamed)'}
      type={getTeamIconType(team?.teamType)}
      teamID={teamID}
      secondaryMatches={SecondaryMatchData}
      isFocused={props.focusTeamIDsSet?.has(teamID)}
    >
      {childTeamIDsFiltered.length > 0 ? (
        <ul
          className={mergeClasses(
            variants({
              indentation,
              indentationLine,
              borderColor: ensure3(level),
            }),
          )}
        >
          {childTeamIDsFiltered.map((childTeamID) => {
            if (!childTeamID) return null
            return (
              <TreeRowTeam
                key={childTeamID}
                {...props}
                highlight={props.highlightIDsSet?.has(childTeamID)}
                indentation={indentation}
                indentationLine={indentationLine}
                level={level + 1}
                onSelect={onSelect}
                teamAuxiliaryComponent={TeamAuxiliaryComponent}
                showLists={showLists}
                teamID={childTeamID}
                teamRelationships={teamRelationships}
                teamsByID={teamsByID}
                showChildren={props.showTeamIDs.has(childTeamID)}
                updateShowChildren={updateShowChildren}
              />
            )
          })}
        </ul>
      ) : null}
      {props.showChildren && TeamAuxiliaryComponent ? (
        <TeamAuxiliaryComponent
          team={team}
          teamID={teamID}
          highlightIDsSet={props.highlightIDsSet}
        />
      ) : null}
    </TreeRow>
  )
}

function getTeamIconType(teamType?: Team['teamType']) {
  switch (teamType) {
    case 'ocDOMAIN':
      return 'domain'
    case 'ocPROJECT':
      return 'project'
    default:
    case 'ocTEAM':
      return 'team'
  }
}

export { TreeRowTeam }
