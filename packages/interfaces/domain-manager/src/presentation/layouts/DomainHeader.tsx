import * as React from 'react'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { TytoData } from '@spacedock/manifest'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useTeamQuery } from '@tyto/query'
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
  SkeletonText,
  SkeletonSquare,
} from '@spacedock/falcon-ui'
import { TeamTreeInput } from '@spacedock/starliner'
import { useTeamAdminPermissions, useTeamsFiltered } from '../../data/hooks'
import { useParamNumber } from '@spacedock/use-param-number'
import { useCurrentUser } from '@spacedock/chaincode'
import { useScreenSize } from '@domain/ui'

import { DOMAIN_MANAGER_PATHS } from '../../data/constants'
import useDomainFromURL from '../../data/hooks/useDomainFromURL'
import { NewDomainWizard } from '../organisms/newDomainWizard/NewDomainWizard'
import { NewDomainDialog } from '@interfaces/team-editor'

import {
  getTeamTreeSearchArgs,
  useInvalidSearchQuery,
} from '@interfaces/team-editor'

interface DomainHeaderProps extends React.PropsWithChildren {
  teamID: number
}

/** Portfolio demo: only Home / Menu / Mastery tabs; no wizard or create-domain flows. */
const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'
const PORTFOLIO_DEMO_TAB_IDS = new Set(['tryyb', 'menu', 'mastery'])

const DomainHeader = (props: DomainHeaderProps) => {
  const toast = useToast()
  const screenSizeData = useScreenSize()
  const isMobile = screenSizeData.semanticScreenWidth === 'mobile'

  const location = useLocation() //Part of Navigate
  const navigate = useNavigate()

  const [showSetupWizard, setShowSetupWizard] = React.useState(false)
  const [createNewDomainDialogOpen, setCreateNewDomainDialogOpen] =
    React.useState(false)
  const { invalidateQuery } = useInvalidSearchQuery()

  //* Special Check for 551 Only
  const currentUser = useCurrentUser()
  const isSysAdmin = currentUser?.roleID === 1
  const onCourseURL = currentUser?.onCourseURL

  //* GET ALL THE TEAMS YOU CAN SEE
  const teamsQuery = useTeamsFiltered({
    teamType: 'ocDOMAIN',
    operation: 'ocVIEW',
  })

  //* PERMISSIONS DOMAIN
  const domainID = useParamNumber('domainID')
  const contextID = React.useMemo(() => domainID || 0, [domainID])
  const teamAdminPerms = useTeamAdminPermissions(contextID)
  const permissions = teamAdminPerms?.admin?.permissions
  const permissionsByFunctionName = React.useMemo(
    () => _.keyBy(permissions, 'functionName'),
    [permissions],
  )
  const hasDomainViewPerms = permissionsByFunctionName['Domain']?.viewAccess
  const hasDomainAddPerms = permissionsByFunctionName['Domain']?.addAccess
  const hasDomainChangePerms = permissionsByFunctionName['Domain']?.changeAccess

  //* SINGLE DOMAIN DATA FROM YOUR CONTEXT
  const domainFromUrl = useDomainFromURL()
  const singleDomainDataAsTeam = useTeamQuery({
    teamID: domainID || domainFromUrl.data?.domain.domainID || 0,
    isEnabled: !!domainID || !!domainFromUrl.data?.domain.domainID,
  })
  const domainAsTeam = singleDomainDataAsTeam.data?.team

  //* TAB OPTIONS
  const domainTabs = React.useMemo(() => {
    const tabs = [
      {
        label: IS_PORTFOLIO_DEMO ? 'HOME' : 'TRYYB',
        id: 'tryyb',
        to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.teamID}/tryyb`,
        order: 1,
        disabled: false,
      },
      {
        label: 'MENU',
        id: 'menu',
        to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.teamID}/menu`,
        order: 5,
        disabled: false,
      },
    ]

    tabs.push({
      label: 'MASTERY',
      id: 'mastery',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.teamID}/mastery`,
      order: 10,
      disabled: false,
    })

    tabs.push({
      label: 'IMAGES',
      id: 'images',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.teamID}/images`,
      order: 20,
      disabled: false,
    })

    tabs.push({
      label: 'THEME',
      id: 'theme',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.teamID}/theme`,
      order: 21,
      disabled: false,
    })

    tabs.push({
      label: 'CUSTOM DOMAIN NAMES',
      id: 'customNames',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.teamID}/custom-names`,
      order: 30,
      disabled: true,
    })

    tabs.push({
      label: 'R3 PERMISSIONS',
      id: 'r3Perms',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.teamID}/r3`,
      order: 40,
      disabled: false, //! Does the R3 Tab need to be temporarily re-disabled once this ticket is closed?
    })

    tabs.push({
      label: 'SERVICES',
      id: 'services',
      to: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.teamID}/services`,
      order: 50,
      disabled: true,
    })

    tabs.sort((a, b) => a.order - b.order)

    if (IS_PORTFOLIO_DEMO) {
      return tabs.filter((tab) => PORTFOLIO_DEMO_TAB_IDS.has(tab.id))
    }

    return tabs
  }, [props.teamID, permissions])

  const [domainTeamDialog, setDomainTeamDialog] = useState<boolean>(false)
  const [teamForPath, setTeamForPath] = useState<TytoData.Team | undefined>()

  useEffect(() => {
    if (!domainAsTeam || !teamsQuery.teams) {
      setTeamForPath(undefined)
      return
    }
    if (domainAsTeam && teamsQuery.teams) {
      const found = teamsQuery.teams.find(
        (t) => t.teamID === domainAsTeam.teamID,
      )
      if (found !== teamForPath) {
        setTeamForPath(found)
      }
    }
  }, [domainAsTeam, teamsQuery.teams])

  // Keep wizard open when child components request it (e.g., after chooser completes)
  useEffect(() => {
    const handler = () => setShowSetupWizard(true)
    window.addEventListener('domain-wizard-keep-open', handler)
    return () => window.removeEventListener('domain-wizard-keep-open', handler)
  }, [])

  const redHighlightTab = React.useMemo(() => {
    return getCurrentTab(location.pathname)
  }, [location.pathname])

  const isLoading =
    singleDomainDataAsTeam.isPending ||
    domainFromUrl.isPending ||
    teamsQuery.isPending ||
    !domainAsTeam ||
    (domainFromUrl.data?.domain.domainID &&
      props.teamID !== domainFromUrl.data.domain.domainID)

  if (isLoading) {
    return (
      <div className="bg-grayscale-900 flex h-[180px] flex-col gap-4 rounded-xl px-3 pt-2 opacity-30">
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
            <TextHeading size={3} className="text-site-fg">
              Domain Manager
            </TextHeading>
          </div>

          {/* Icon, name, and ID row */}
          <div className="flex items-baseline gap-4">
            <span className="relative top-[6px]">
              <Icon icon={'house-outline'} size="2xl" />
            </span>
            <TextHeading size={4} className="text-site-fg">
              {domainAsTeam.teamName}
            </TextHeading>

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
              variant="primary"
              onClick={() => {
                //// if (hasCreateTeam) {
                setDomainTeamDialog(!domainTeamDialog)
                //// }
              }}
            >
              Change Domain
            </Button>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <>
          <div className="mt-2 flex items-center justify-between">
            <TextHeading size={2} className="text-site-fg">
              Domain Manager
            </TextHeading>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-4">
              <span className="relative top-[6px]">
                <Icon icon={'house-outline'} size="2xl" />
              </span>
              <TextHeading size={3} className="text-site-fg">
                {domainAsTeam.teamName}
              </TextHeading>

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

            <div className="flex justify-end gap-4">
              {!IS_PORTFOLIO_DEMO && (
                <Button
                  disabled={false}
                  variant="outline"
                  onClick={() => {
                    setShowSetupWizard((cur) => !cur)
                  }}
                >
                  Setup Wizard
                </Button>
              )}

              <Button
                disabled={false}
                variant="secondary"
                onClick={() => {
                  setDomainTeamDialog(!domainTeamDialog)
                }}
              >
                Change Domain
              </Button>

              {!IS_PORTFOLIO_DEMO && (
                <Button
                  disabled={!hasDomainAddPerms}
                  variant="outline"
                  onClick={() => {
                    if (hasDomainAddPerms) {
                      setCreateNewDomainDialogOpen(!createNewDomainDialogOpen)
                    }
                  }}
                >
                  Create Domain
                </Button>
              )}
            </div>
          </div>

          {!IS_PORTFOLIO_DEMO && (
            <NewDomainWizard
              domainID={domainID || 0}
              open={showSetupWizard}
              onOpenChange={setShowSetupWizard}
            />
          )}

          {!IS_PORTFOLIO_DEMO && createNewDomainDialogOpen && (
            <NewDomainDialog
              open={createNewDomainDialogOpen}
              domain={domainAsTeam}
              onSuccess={() => {
                teamsQuery.refetch()
                invalidateQuery(getTeamTreeSearchArgs())
                setCreateNewDomainDialogOpen(false)
              }}
              onOpenChange={(isOpen) => {
                if (!isOpen) setCreateNewDomainDialogOpen(false)
              }}
            />
          )}
        </>
      )}
      {domainTeamDialog && (
        <Dialog
          maxWidth={isMobile ? 'base' : 'lg'}
          maxHeight={'screen'}
          open={domainTeamDialog}
          onOpenChange={setDomainTeamDialog}
          title="Choose Domain To Customize"
          modal={false}
        >
          <div className={isMobile ? 'h-[80vh] overflow-auto' : 'h-[70vh]'}>
            <TeamTreeInput
              size={isMobile ? 'fill-screen' : 'base'}
              teams={teamsQuery.teams ?? []}
              isLoading={teamsQuery.isPending}
              onSelect={(teamID, teamType) => {
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
              teamsIncluded={false}
            />
          </div>
        </Dialog>
      )}

      <div className="mb-2 opacity-50">
        {teamForPath && (
          <Breadcrumb
            items={getTeamPath(
              teamForPath.parentNamePath,
              teamForPath.iPath,
              domainAsTeam.teamName,
              domainAsTeam.teamID,
            )}
          />
        )}
      </div>

      {/* In Mobile we swap Tabs for Combobox */}
      {isMobile ? (
        <ComboBox
          triggerClassName="w-full"
          items={domainTabs.map((tab) => ({
            value: tab.id,
            item: tab.label,
          }))}
          value={redHighlightTab}
          onChange={(value) => {
            const tab = domainTabs.find((t) => t.id === value)
            if (tab?.to) navigate(tab.to)
          }}
          selectPlaceholder="Domain Options"
          includeSearch={false}
          id="domain-tabs-combobox"
          aria-label=""
        />
      ) : domainAsTeam && domainAsTeam.teamID ? (
        // Desktop view: Tabs
        <Tabs
          key={`${domainAsTeam.teamName}-${domainAsTeam.teamID}`}
          selected={redHighlightTab}
          items={domainTabs}
          ariaLabelBy="domain-tabs"
          onSelect={(id) => {
            const tab = domainTabs.find((t) => t.id === id)
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
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/:domainID/tryyb`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'tryyb'
  } else if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/:domainID/mastery`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'mastery'
  } else if (
    matchPath(
      {
        path: `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/:domainID/menu`,
        end: false,
      },
      pathname,
    ) != null
  ) {
    return 'menu'
  } else if (
    matchPath(
      `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/:domainID/images`,
      pathname,
    ) != null
  ) {
    return 'images'
  } else if (
    matchPath(
      `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/:domainID/custom-names`,
      pathname,
    ) != null
  ) {
    return 'customNames'
  } else if (
    matchPath(
      `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/:domainID/r3`,
      pathname,
    ) != null
  ) {
    return 'r3'
  } else if (
    matchPath(
      `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/:domainID/domain-services`,
      pathname,
    ) != null
  ) {
    return 'services'
  } else if (
    matchPath(
      `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/:domainID/theme`,
      pathname,
    ) != null
  ) {
    return 'theme'
  }
  return 'tryyb'
}

export default DomainHeader
