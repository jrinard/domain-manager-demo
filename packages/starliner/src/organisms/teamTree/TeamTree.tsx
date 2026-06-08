import { cva, mergeClasses, VariantProps } from '@falcon/style'
import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useRef } from 'react'

import { useSet } from '@spacedock/noonian'

import type { Team } from '../../types'
import { useTopLevelTeams } from '../../hooks/useTopLevelTeams'
import { useTeamsByID } from '../../hooks/useTeamsByID'
import { useTeamRelationshipsMap } from '../../hooks/useTeamRelationshipsMap'
import { useFilteredTeamTreeData } from '../../hooks/useFilteredTeamTreeData'
import { useScopedTeams } from '../../hooks/useScopedTeams'

import type { TreeRowTeamProps } from '../../molecules/treeRow/TreeRowTeam'
import { TreeRowTeam } from '../../molecules/treeRow/TreeRowTeam'
import { SkeletonText } from '@spacedock/falcon-ui'

const variants = cva('flex flex-col gap-4', {
  variants: {
    contain: {
      true: '',
      false: 'overflow-auto',
    },
    indentation: {
      lg: '',
      md: '',
      sm: '',
    },
    indentationLine: {
      true: 'border-light-300 border-l',
      false: '',
    },
  },
  defaultVariants: {
    contain: false,
    indentation: 'lg',
    indentationLine: false,
  },
})

export interface TeamTreeProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  searchTerm: TreeRowTeamProps['searchTerm']
  teamAuxiliaryComponent?: TreeRowTeamProps['teamAuxiliaryComponent']
  teams: Team[]
  targetTeamID?: number
  onSelect: (
    teamID: number,
    teamType?: 'ocDOMAIN' | 'ocTEAM' | 'ocPROJECT',
  ) => void
  toggleFocusTeamID?: (teamID: number) => void
  forceShowTeamToggle?: boolean
  forceShowTeamMembers?: boolean
  isLoading?: boolean
  highlightIDs?: number[]
  focusTeamIDs?: number[]
}

const TeamTree = ({
  contain,
  indentation,
  indentationLine,
  searchTerm,
  targetTeamID,
  teams,
  onSelect,
  highlightIDs,
  teamAuxiliaryComponent,
  forceShowTeamToggle,
  forceShowTeamMembers,
  isLoading,
  focusTeamIDs,
  toggleFocusTeamID,
}: TeamTreeProps) => {
  const prevSearchTerm = useRef(searchTerm)
  const initialToggleStateSnapshot = useRef<Set<number>>(new Set())

  const teamsByID = useTeamsByID(teams)
  const scopedTeams = useScopedTeams(teams, teamsByID, focusTeamIDs)
  const teamRelationshipsMap = useTeamRelationshipsMap(scopedTeams)
  const filteredTeamTreeData = useFilteredTeamTreeData({
    teamID: targetTeamID,
    teams: scopedTeams,
    searchTerm,
  })
  const topLevelTeams = useTopLevelTeams(scopedTeams)
  const showTeamIDs = useSet<number>({
    initialList: topLevelTeams.map((team) => team.teamID),
  })

  const matchingTeam = useMemo(() => {
    if (!scopedTeams || !scopedTeams.length || !targetTeamID) {
      return undefined
    }

    return scopedTeams.find((team) => team.teamID === targetTeamID)
  }, [targetTeamID, scopedTeams])

  useEffect(() => {
    if (searchTerm) return
    if (matchingTeam && matchingTeam.iPath) {
      const teamIDsUnparsed = matchingTeam.iPath.split(',').slice(1, -1)

      if (!teamIDsUnparsed.length) return

      const pathItems = new Set<number>()

      teamIDsUnparsed.forEach((teamIDUnparsed) => {
        const parsed = parseInt(teamIDUnparsed, 10)

        if (isNaN(parsed)) {
          console.error('Failed to parse teamID from iPath:', teamIDUnparsed)
          return
        }

        pathItems.add(parsed)
      })

      showTeamIDs.merge(pathItems)
    }
  }, [matchingTeam, searchTerm])

  useEffect(() => {
    if (searchTerm && !prevSearchTerm.current) {
      initialToggleStateSnapshot.current = new Set(
        showTeamIDs.__dangerousSetReference,
      )
      showTeamIDs.clear()
    } else if (!searchTerm && prevSearchTerm.current) {
      showTeamIDs.merge(initialToggleStateSnapshot.current)
    }

    prevSearchTerm.current = searchTerm
  }, [searchTerm])

  const highlightIDsSet = useMemo(() => {
    return new Set(highlightIDs ?? [])
  }, [highlightIDs])

  const focusTeamIDsSet = useMemo(() => new Set(focusTeamIDs), [focusTeamIDs])

  const topTeamsExist = !!topLevelTeams.length

  return (
    <div className={mergeClasses(variants({ contain }))}>
      <ul className="flex flex-col gap-4">
        {isLoading ? (
          <SkeletonText />
        ) : topTeamsExist ? (
          <>
            {topLevelTeams.map((team) => (
              <TreeRowTeam
                key={team.teamID}
                indentation={indentation}
                indentationLine={indentationLine}
                forceShowTeamToggle={forceShowTeamToggle}
                onSelect={onSelect}
                searchTerm={searchTerm}
                teamAuxiliaryComponent={teamAuxiliaryComponent}
                teamID={team.teamID}
                showChildren={showTeamIDs.has(team.teamID)}
                showLists={filteredTeamTreeData}
                showTeamIDs={showTeamIDs.__dangerousSetReference}
                teamRelationships={teamRelationshipsMap}
                teamsByID={teamsByID}
                updateShowChildren={(teamID, shouldShow) =>
                  showTeamIDs.toggle(teamID)
                }
                highlight={highlightIDsSet.has(team.teamID)}
                highlightIDsSet={highlightIDsSet}
                level={0}
                focusTeamIDsSet={focusTeamIDsSet}
                toggleFocusTeamID={toggleFocusTeamID}
              />
            ))}
          </>
        ) : (
          <span>No Teams</span>
        )}
      </ul>
    </div>
  )
}
TeamTree.displayName = 'TeamTree'

export { TeamTree }
