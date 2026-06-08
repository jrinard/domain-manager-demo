import * as React from 'react'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { TytoData } from '@spacedock/manifest'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { Link } from '@spacedock/navigator'
import { Icon } from '@falcon/icons'
import { Button } from '@falcon/buttons'
import {
  Breadcrumb,
  ComboBox,
  Dialog,
  TextHeading,
  Tabs,
  useToast,
  SkeletonSquare,
  SkeletonText,
} from '@spacedock/falcon-ui'
import { TeamTreeInput } from '@spacedock/starliner'
import { useTeamAdminPermissions, useTeamsFiltered } from '../../data/hooks'
import { useCurrentUser } from '@spacedock/chaincode'
import { useParamNumber } from '@spacedock/use-param-number'
import { useScreenSize } from '@domain/ui'
import useTeamFromURL from '../../data/hooks/useTeamFromURL'
import { DOMAIN_MANAGER_PATHS } from '../../data/constants'

const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'

interface TeamHeaderProps extends React.PropsWithChildren {
  teamID: number
}

const TeamHeader = (props: TeamHeaderProps) => {
  const toast = useToast()
  const screenSizeData = useScreenSize()
  const isMobile = screenSizeData.semanticScreenWidth === 'mobile'
  const location = useLocation()
  const navigate = useNavigate()

  //* Special Check for 551 Only
  const currentUser = useCurrentUser()
  const isSysAdmin = currentUser?.roleID === 1
  const onCourseURL = currentUser?.onCourseURL

  //* GET ALL THE TEAMS YOU CAN SEE
  const teamsQuery = useTeamsFiltered({
    teamType: 'ocDOMAIN',
    operation: 'ocVIEW',
  })

  //* PERMISSIONS TEAM
  const teamID = useParamNumber('teamID')
  const contextID = React.useMemo(() => teamID || 0, [teamID])
  const teamAdminPerms = useTeamAdminPermissions(contextID)
  const permissions = teamAdminPerms?.admin?.permissions
  const permissionsByFunctionName = React.useMemo(
    () => _.keyBy(permissions, 'functionName'),
    [permissions],
  )
  const hasTeamViewPerms = permissionsByFunctionName['Teams']?.viewAccess
  const hasTeamChangePerms = permissionsByFunctionName['Teams']?.changeAccess

  //* SINGLE TEAM DATA FROM YOUR CONTEXT
  const singleTeamData = useTeamFromURL()
  const team = singleTeamData.data?.team

  //* TAB OPTIONS
  const teamTabs = React.useMemo(() => {
    const tabs = [
      {
        label: IS_PORTFOLIO_DEMO ? 'HOME' : 'TRYYB',
        id: 'tryyb',
        to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/${props.teamID}/tryyb`,
        order: 1,
        disabled: false,
      },
      {
        label: 'MENU',
        id: 'menu',
        to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/${props.teamID}/menu`,
        order: 5,
        disabled: false,
      },
    ]

    tabs.push({
      label: 'MASTERY',
      id: 'mastery',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/${props.teamID}/mastery`,
      order: 10,
      disabled: true,
    })

    tabs.push({
      label: 'IMAGES',
      id: 'images',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/${props.teamID}/images`,
      order: 20,
      disabled: false,
    })

    tabs.push({
      label: 'CUSTOM DOMAIN NAMES',
      id: 'customNames',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/${props.teamID}/custom-names`,
      order: 30,
      disabled: true,
    })

    tabs.push({
      label: 'R3 PERMISSIONS',
      id: 'r3Perms',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/${props.teamID}/r3`,
      order: 40,
      disabled: true,
    })

    tabs.push({
      label: 'SERVICES',
      id: 'services',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/${props.teamID}/services`,
      order: 50,
      disabled: true,
    })

    tabs.sort((a, b) => a.order - b.order)

    return tabs
  }, [props.teamID, permissions])

  const [domainTeamDialog, setDomainTeamDialog] = useState<boolean>(false)
  const [teamForPath, setTeamForPath] = useState<TytoData.Team | undefined>()

  useEffect(() => {
    if (!team || !teamsQuery.teams) {
      setTeamForPath(undefined)
      return
    }
    if (team && teamsQuery.teams) {
      const found = teamsQuery.teams.find((t) => t.teamID === team.teamID)
      if (found !== teamForPath) {
        setTeamForPath(found)
      }
    }
  }, [team, teamsQuery.teams])

  const redTabHighlight = React.useMemo(() => {
    return getCurrentTab(location.pathname)
  }, [location.pathname])

  if (!team || props.teamID !== singleTeamData.data?.team.teamID) {
    return (
      <div className="bg-grayscale-900 flex h-[180px] flex-col gap-4 rounded-xl pt-2 opacity-30">
        {/* Domain Manager title */}
        <div className="flex items-center">
          <SkeletonText size="5xl" length="xlong" /> {/* 'Domain Manager' */}
        </div>

        {/* Top row: icon + text + button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center items-baseline gap-4">
            <SkeletonSquare size="10" /> {/* Icon*/}
            <SkeletonText size="5xl" length="xlong" /> {/* 'Name' */}
            <SkeletonText size="lg" length="short" /> {/* ID */}
          </div>
          <div className="flex justify-end">
            <SkeletonText className="h-8 w-56 rounded-md" /> {/* Button */}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="">
          <SkeletonText size="sm" length="medium" />
        </div>

        {/* Menu Tabs */}
        <div className="flex w-full max-w-3xl">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonText key={i} length="short" className="mr-4 h-8 w-32" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Layout */}
      {isMobile ? (
        <div className="space-y-4">
          {/* Domain Manager title - smaller on mobile */}
          <div className="mt-2">
            <TextHeading size={3}>Domain Manager</TextHeading>
          </div>

          {/* Icon, name, and ID row */}
          <div className="flex items-baseline gap-4">
            <span className="relative top-[6px]">
              <Icon icon={'account-multiple-outline'} size="2xl" />
            </span>
            <TextHeading size={4}>{team.teamName}</TextHeading>

            {isSysAdmin ? (
              <Link
                className="hover:underline"
                target="_blank"
                to={`${onCourseURL}/v25/system/element_info.asp?ID=${props.teamID}`}
              >
                <span className="opacity-30">
                  <div className="group-surface-dark:text-secondary group-surface-light:text-primary text-sm uppercase print:text-black">
                    {props.teamID}
                  </div>
                </span>
              </Link>
            ) : (
              <span className="opacity-30">
                <div className="group-surface-dark:text-secondary group-surface-light:text-primary text-sm uppercase print:text-black">
                  {props.teamID}
                </div>
              </span>
            )}
          </div>

          {/* Button centered below */}
          <div className="flex justify-center">
            <Button
              disabled={false}
              variant="shadow"
              onClick={() => {
                //// if (hasCreateTeam) {
                setDomainTeamDialog(!domainTeamDialog)
                //// }
              }}
            >
              Change Domain or Team
            </Button>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <>
          <div className="flex items-center justify-between ">
            <TextHeading size={2}>Domain Manager</TextHeading>
          </div>

          <div className="flex items-center justify-between ">
            <div className="flex items-baseline gap-4">
              <span className="relative top-[6px]">
                <Icon icon={'account-multiple-outline'} size="2xl" />
              </span>
              <TextHeading size={3}>{team.teamName}</TextHeading>

              {isSysAdmin ? (
                <Link
                  className="hover:underline"
                  target="_blank"
                  to={`${onCourseURL}/v25/system/element_info.asp?ID=${props.teamID}`}
                >
                  <span className="opacity-30">
                    <div className="group-surface-dark:text-secondary group-surface-light:text-primary text-lg uppercase print:text-black">
                      {props.teamID}
                    </div>
                  </span>
                </Link>
              ) : (
                <span className="opacity-30">
                  <div className="group-surface-dark:text-secondary group-surface-light:text-primary text-lg uppercase print:text-black">
                    {props.teamID}
                  </div>
                </span>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                disabled={false}
                variant="shadow"
                onClick={() => {
                  //// if (hasCreateTeam) {
                  setDomainTeamDialog(!domainTeamDialog)
                  //// }
                }}
              >
                Change Domain or Team
              </Button>
            </div>
          </div>
        </>
      )}

      <div className="mb-2 opacity-50">
        {teamForPath && (
          <Breadcrumb
            items={getTeamPath(
              teamForPath.parentNamePath,
              teamForPath.iPath,
              team?.teamName || teamForPath.name || '',
              team?.teamID || teamForPath.teamID || 0,
            )}
          />
        )}
      </div>

      {domainTeamDialog && (
        <Dialog
          maxWidth={isMobile ? 'base' : 'lg'}
          maxHeight={'screen'}
          open={domainTeamDialog}
          onOpenChange={setDomainTeamDialog}
          title="Choose Domain or Team"
          modal={false}
        >
          <div className={isMobile ? 'h-[80vh] overflow-auto' : 'h-[70vh]'}>
            <TeamTreeInput
              teams={teamsQuery.teams ?? []}
              isLoading={teamsQuery.isPending}
              onSelect={(teamID, teamType) => {
                // // const selectedTeam = teamOptions.find(
                // //   (t) => t.value === String(teamID),
                // // )
                if (teamID && teamType) {
                  if (teamType === 'ocDOMAIN') {
                    navigate(
                      `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${teamID}/tryyb`,
                    )
                  } else {
                    navigate(
                      `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/${teamID}/tryyb`,
                    )
                  }
                }

                setDomainTeamDialog(false)
              }}
              projectsIncluded={false}
            />
          </div>
        </Dialog>
      )}

      {/* In Mobile we swap Tabs for Combobox */}
      {isMobile ? (
        <ComboBox
          triggerClassName="w-full"
          items={teamTabs.map((tab) => ({
            value: tab.id,
            item: tab.label,
          }))}
          value={redTabHighlight}
          onChange={(value) => {
            const tab = teamTabs.find((t) => t.id === value)
            if (tab?.to) navigate(tab.to)
          }}
          selectPlaceholder="Domain Options"
          includeSearch={false}
          id="domain-tabs-combobox"
          aria-label=""
        />
      ) : team && team.teamID ? (
        // Desktop view: Tabs
        <Tabs
          key={`${team.teamName}-${team.teamID}`}
          selected={redTabHighlight}
          items={teamTabs}
          ariaLabelBy="domain-tabs"
          onSelect={(id) => {
            const tab = teamTabs.find((t) => t.id === id)
            if (tab?.to) navigate(tab.to)
          }}
        />
      ) : (
        <div>Loading Tabs</div>
      )}
    </>
  )
}

function getTeamPath(
  parentNamePath: string,
  iPath: string,
  teamName: string,
  teamID: number,
): { label: string; id: string | number; to?: string }[] {
  const nameSplit = parentNamePath.split('\t').filter(Boolean)
  const idSplit = iPath.split(',').filter(Boolean)

  if (idSplit.length === 1) {
    return [{ label: teamName, id: teamID }]
  }

  const items: { label: string; id: string | number; to?: string }[] = []

  nameSplit.forEach((name, curIndx) => {
    if (curIndx === nameSplit.length - 1) {
      items.push({ label: teamName, id: teamID })
    } else {
      items.push({ label: name, id: Number(idSplit[curIndx]) })
    }
  })

  return items
}

function getCurrentTab(pathname: string) {
  if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/:teamID/tryyb`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'tryyb'
  } else if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/:teamID/mastery`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'mastery'
  } else if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/:teamID/menu`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'menu'
  } else if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/:teamID/images`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'images'
  } else if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/:teamID/custom-names`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'customNames'
  } else if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/:teamID/r3`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'r3'
  } else if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/team/:teamID/services`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'services'
  }
  return 'tryyb'
}

export default TeamHeader
