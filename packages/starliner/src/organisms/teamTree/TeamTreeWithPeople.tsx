import _ from 'lodash'
import { PropsWithChildren, useMemo, useState } from 'react'
import { cva, mergeClasses, VariantProps } from '@falcon/style'
import { useSet } from '@spacedock/noonian'
import {
  Checkbox,
  Label,
  SkeletonText,
  TextSubHeading,
  Banner,
} from '@spacedock/falcon-ui'

import { usePeopleByID } from '../../hooks/userPersonByID'
import {
  getMembershipKey,
  useMembershipsByID,
} from '../../hooks/useMembershipsByID'
import { usePersonMembershipsMap } from '../../hooks/usePersonMembershipsMap'
import { useFilteredPeople } from '../../hooks/useFilteredPeople'
import { useTeamIDsBelow } from '../../hooks/useTeamIDsBelow'

import type { PeopleData, MinPerson } from '../../types'
import type { TeamTreeProps } from './TeamTree'
import { TeamTree } from './TeamTree'
import { TreeRowBase } from '../../molecules/treeRow/TreeRow'
import { TreeRowPerson } from '../../molecules/treeRow/TreeRowPerson'

const variants = cva('', {
  variants: {
    indentation: {
      lg: 'pl-5',
      md: 'pl-6',
      sm: 'pl-1',
    },
    indentationLine: {
      true: 'border-light-300 border-l',
      false: '',
    },
  },
  defaultVariants: {
    indentation: 'lg',
    indentationLine: false,
  },
})

const PERSON_SCOPE_OPTIONS = [
  { item: 'Focused Teams and Below', value: 'focused-teams' },
  { item: 'Currently Viewed Team and Below', value: 'current-team' },
]

export interface TeamTreeWithPeopleProps
  extends Omit<TeamTreeProps, 'teamAuxiliaryComponent'>,
    VariantProps<typeof variants> {
  className?: string
  peopleData?: PeopleData
  onPersonSelect: (personID: number, person: MinPerson) => void
  isLoadingPeopleData?: boolean
}

const EMPTY_ARR: number[] = []

const TeamTreeWithPeople = ({
  peopleData,
  isLoadingPeopleData,
  ...props
}: TeamTreeWithPeopleProps) => {
  const [scopePersonResults, updateScopePersonResults] = useState(false)
  const [personScopeTarget] =
    useState<(typeof PERSON_SCOPE_OPTIONS)[number]['value']>('focused-teams')
  const showUsersData = useSet<number>({})
  const showTeamMembersSet = useSet<number>({})
  const peopleByID = usePeopleByID(peopleData?.people)
  const personMembershipsMap = usePersonMembershipsMap(peopleData?.memberships)
  const membershipsKeyed = useMembershipsByID(peopleData)
  const teamIDsBelow = useTeamIDsBelow({
    targetTeamIDs: props.focusTeamIDs,
    teams: props.teams,
  })

  const filteredPeople = useFilteredPeople({
    searchTerm: props.searchTerm,
    peopleData,
    personMembershipsMap: personMembershipsMap,
    teamIDsBelow: scopePersonResults ? teamIDsBelow : EMPTY_ARR,
  })

  const sortedTopLevelTeams = useMemo(
    () => _.sortBy(props.teams, ['name']),
    [props.teams],
  )
  const sortedFilteredPeople = useMemo(
    () => _.sortBy(filteredPeople, ['familyName']),
    [filteredPeople],
  )

  return (
    <div className={mergeClasses('overflow-auto', props.className)}>
      <TeamTree
        {...props}
        contain
        forceShowTeamToggle
        teams={sortedTopLevelTeams}
        teamAuxiliaryComponent={({ team, teamID, highlightIDsSet }) => {
          const showingMembers =
            props.forceShowTeamMembers || showTeamMembersSet.has(teamID)

          return (
            <>
              {!props.forceShowTeamMembers && (
                <NestedContainerBase>
                  <TreeRowBase {...props}>
                    <div className="flex flex-row pt-3 text-xs opacity-50 transition-opacity hover:opacity-100">
                      <button
                        className="pl-2"
                        onClick={() =>
                          showingMembers
                            ? showTeamMembersSet.delete(teamID)
                            : showTeamMembersSet.add(teamID)
                        }
                      >
                        {showingMembers
                          ? `Hide Team Members`
                          : `Show Team Members`}
                      </button>
                    </div>
                  </TreeRowBase>
                </NestedContainerBase>
              )}

              {showingMembers &&
                (!peopleData ? (
                  <div
                    className={mergeClasses(
                      'flex flex-col gap-4 py-2',
                      variants({ indentation: props.indentation }),
                    )}
                  >
                    <SkeletonText />
                    <SkeletonText />
                    <SkeletonText />
                  </div>
                ) : (
                  <TeamMemberships
                    indentation={props.indentation}
                    indentationLine={props.indentationLine}
                    onSelect={(userID, person) =>
                      props.onPersonSelect(userID, person)
                    }
                    peopleByID={peopleByID}
                    keyedMemberships={membershipsKeyed}
                    userIDs={
                      personMembershipsMap.userIDsByTeamID?.[teamID] ?? []
                    }
                    showUserIDs={showUsersData.__dangerousSetReference}
                    toggleShowUser={(userID) => showUsersData.toggle(userID)}
                    teamID={teamID}
                    searchTerm={props.searchTerm}
                    highlightIDsSet={highlightIDsSet}
                  />
                ))}
            </>
          )
        }}
      />

      {props.searchTerm ? (
        <>
          <TextSubHeading className="mb-2 mt-10 flex items-center justify-start text-lg">
            Person Results <hr className="border-bg-contrast-high ml-2 grow" />
          </TextSubHeading>

          <div
            className={mergeClasses(
              'mb-4 flex flex-row flex-wrap items-center gap-2 rounded border border-solid border-transparent p-2',
              scopePersonResults &&
                'bg-bg-contrast-low border-bg-contrast-high',
            )}
          >
            <div className="inline-flex flex-row items-start gap-1 text-sm">
              <Checkbox
                className="mt-1"
                id="scope-teamtree-person-results"
                size="sm"
                color="secondary"
                checked={scopePersonResults}
                onCheckedChange={(checkedState) =>
                  updateScopePersonResults((currentValue) =>
                    typeof checkedState === 'boolean'
                      ? checkedState
                      : !currentValue,
                  )
                }
              />
              <Label textType="input" htmlFor="scope-teamtree-person-results">
                Scope Results to Focused Teams and Below
              </Label>
            </div>
            {scopePersonResults &&
              personScopeTarget === 'focused-teams' &&
              !props.focusTeamIDs?.length && (
                <div className="block w-full">
                  <Banner
                    preset="warn"
                    size="small"
                    headerText={'No Teams currently Focused'}
                  />
                </div>
              )}
          </div>
        </>
      ) : null}
      {props.searchTerm ? (
        isLoadingPeopleData ? (
          <div className="flex flex-col gap-4 py-2">
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
          </div>
        ) : (
          <ul className="ml-0">
            {sortedFilteredPeople.map((person) => (
              <TreeRowPerson
                indentationLine={props.indentationLine}
                key={person.userID}
                personID={person.userID}
                email={person.email}
                title={`${person.givenName} ${person.familyName}`}
                // // trailingText={props.searchTerm ? person.email : undefined}
                type="user"
                subType={
                  person.elementSubType === 'ocROBOT' ? 'robot' : undefined
                }
                showChildren={
                  showUsersData.has(person.userID) || props.searchTerm !== ''
                }
                updateShowChildren={() => showUsersData.toggle(person.userID)}
                primaryTeamName={person.primaryElementName}
                lastActivityDate={person.lastActivity}
                onSelect={() => props.onPersonSelect(person.userID, person)}
                searchTerm={props.searchTerm}
                onPrimaryTeamSelect={() =>
                  window.alert(
                    `(${person.givenName} ${person.familyName}) Default Team is ${person.primaryElementName}`,
                  )
                }
                level={0}
                highlight={props.highlightIDs?.includes(person.userID)}
              />
            ))}
          </ul>
        )
      ) : null}
    </div>
  )
}

interface TeamMembershipsProps extends VariantProps<typeof variants> {
  keyedMemberships: ReturnType<typeof useMembershipsByID>
  userIDs: number[]
  peopleByID: ReturnType<typeof usePeopleByID>
  showUserIDs: Set<number>
  toggleShowUser: (userID: number) => void
  teamID: number
  onSelect: (userID: number, person: MinPerson) => void
  highlightIDsSet?: Set<number>
  searchTerm?: string
}

const TeamMemberships = (props: TeamMembershipsProps) => {
  const sortedUserIDs = useMemo(() => {
    const personRecords: Array<MinPerson & { isTeamLeader: boolean }> = []

    if (!props.userIDs?.length) {
      return []
    }

    props.userIDs.forEach((userID) => {
      const memObject =
        props.keyedMemberships[getMembershipKey(userID, props.teamID)]
      const person = props.peopleByID[userID]

      if (!memObject || !person) {
        return
      }

      personRecords.push({
        ...person,
        isTeamLeader: memObject.isTeamLeader,
      })
    })

    // * Put Team Leaders at the top and non-leaders below, and sort alphabetically by family name
    return _.orderBy(
      personRecords,
      ['isTeamLeader', 'familyName'],
      ['desc', 'asc'],
    ).map((person) => person.userID)
  }, [props.userIDs, props.keyedMemberships, props.peopleByID, props.teamID])

  if (!props.userIDs?.length) {
    return null
  }

  return (
    <ul
      className={mergeClasses(
        variants({
          indentation: props.indentation,
          indentationLine: props.indentationLine,
        }),
      )}
    >
      {sortedUserIDs.map((userID) => {
        const memObject =
          props.keyedMemberships[getMembershipKey(userID, props.teamID)]
        const person = props.peopleByID[userID]

        if (!memObject || !person) {
          return null
        }

        return (
          <TreeRowPerson
            key={userID}
            personID={person.userID}
            indentationLine={props.indentationLine}
            isDeactivated={person._LOCAL_isDeactivated}
            title={`${person?.givenName} ${person?.familyName}`}
            email={person.email}
            // // trailingText={props.searchTerm ? person.email : undefined}
            type={determineUserIcon(
              memObject,
              person.primaryElementID === props.teamID,
            )}
            subType={person.elementSubType === 'ocROBOT' ? 'robot' : undefined}
            showChildren={props.showUserIDs.has(userID)}
            updateShowChildren={() => props.toggleShowUser(userID)}
            primaryTeamName={person.primaryElementName}
            lastActivityDate={person?.lastActivity}
            onSelect={() => props.onSelect(userID, person)}
            onPrimaryTeamSelect={() =>
              window.alert(
                `(${person.givenName} ${person.familyName}) Default Team is ${person.primaryElementName}`,
              )
            }
            highlight={props.highlightIDsSet?.has(userID)}
            searchTerm={props.searchTerm}
          />
        )
      })}
    </ul>
  )
}

interface NestedContainerBaseProps
  extends VariantProps<typeof variants>,
    PropsWithChildren {
  hideChildren?: boolean
}

const NestedContainerBase = (props: NestedContainerBaseProps) => {
  if (props.hideChildren) {
    return null
  }

  return (
    <ul
      className={mergeClasses(
        variants({
          indentation: props.indentation,
          indentationLine: props.indentationLine,
        }),
      )}
    >
      {props.children}
    </ul>
  )
}

function determineUserIcon(
  membership: TeamMembershipsProps['keyedMemberships'][keyof TeamMembershipsProps['keyedMemberships']],
  isPrimaryTeam: boolean,
) {
  if (membership.isTeamLeader && isPrimaryTeam) {
    return 'both'
  } else if (membership.isTeamLeader) {
    return 'teamLeader'
  } else if (isPrimaryTeam) {
    return 'primaryTeam'
  } else {
    return 'user'
  }
}

export { TeamTreeWithPeople, NestedContainerBase }
