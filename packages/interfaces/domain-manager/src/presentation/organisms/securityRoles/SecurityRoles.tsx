import { useMemo } from 'react'
import {
  ComboBox,
  TextBody,
  TextHeading,
  Tooltip,
  useToast,
} from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { Link } from '@spacedock/navigator'
import {
  useRolesReadQuery,
  useTeamQuery,
  useDomainUpdateMutation,
} from '@tyto/query'
import { keyBy } from 'lodash'
import { useCurrentUser } from '@spacedock/chaincode'
import { useTeamsFiltered } from '../../../data/hooks'

const ROLE_PICKER_EXCLUDED_ROOT_TEAM_IDS = new Set([551, 1825957])

const ROLE_COMBO_GROUP_HEADING_CLASS =
  'cmdk-group-heading:uppercase cmdk-group-heading:font-bold cmdk-group-heading:text-muted-fg cmdk-group-heading:tracking-wide'

function parseIPathToNumericIds(iPath: string): number[] {
  return iPath
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n))
}

function ancestorIdsForDomainFromIPath(
  iPath: string,
  domainID: number,
): number[] | undefined {
  const raw = parseIPathToNumericIds(iPath)
  const idx = raw.lastIndexOf(domainID)
  if (idx === -1) return undefined
  return raw.slice(0, idx)
}

function resolveAncestorIds(
  domainID: number,
  teamIPath: string | undefined,
  donors: Array<{ teamID: number; domainID: number; iPath?: string }>,
): number[] | undefined {
  const trimmed = teamIPath?.trim()
  if (trimmed) {
    const direct = ancestorIdsForDomainFromIPath(trimmed, domainID)
    if (direct !== undefined) return direct
  }

  if (!donors.length) return undefined

  const sameDomain = donors.filter((t) => t.domainID === domainID)
  const otherDomain = donors.filter((t) => !sameDomain.includes(t))

  const sequences = [sameDomain, otherDomain]
  return sequences.reduce<number[] | undefined>((found, list) => {
    if (found !== undefined) return found
    return list.reduce<number[] | undefined>((innerFound, row) => {
      if (innerFound !== undefined) return innerFound
      const p = row.iPath?.trim()
      if (!p) return undefined
      const raw = parseIPathToNumericIds(p)
      if (!raw.includes(domainID)) return undefined
      return ancestorIdsForDomainFromIPath(p, domainID)
    }, undefined)
  }, undefined)
}

function formatRoleComboLabel(role: {
  roleName: string
  roleID: number
  teamName?: string
}) {
  const team = role.teamName?.trim()
  return team
    ? `${role.roleName} (${role.roleID}) - ${team}`
    : `${role.roleName} (${role.roleID})`
}

interface SecurityRolesProps {
  domainID: number
  roleID: number
  onRoleIDChange: (roleID: number) => void
  canChange: boolean
}

export function SecurityRoles({
  domainID,
  roleID,
  onRoleIDChange,
  canChange,
}: SecurityRolesProps) {
  const roles = useRolesReadQuery({})
  const currentSession = useCurrentUser()
  const onCourseURL = currentSession?.onCourseURL
  const { toastSuccess, toastError } = useToast()

  const domainTeamQuery = useTeamQuery({
    teamID: domainID || 0,
    isEnabled: !!domainID,
  })

  const teamsFiltered = useTeamsFiltered({ filterOutProjects: true })

  const updateDomain = useDomainUpdateMutation({
    onSuccess: () => {
      toastSuccess({ description: 'Default security role updated.' })
    },
    onError: () => {
      toastError({ description: 'Failed to update default security role.' })
    },
  })

  const keyedRoles = useMemo(() => {
    if (!roles.isPending && roles.data?.roles) {
      return keyBy(roles.data.roles, (r) => r.roleID)
    }
  }, [roles.isPending, roles.data])

  const assignableOrder = useMemo(() => {
    const team = domainTeamQuery.data?.team as
      | { teamID: number; iPath?: string }
      | undefined

    const donors = (teamsFiltered.teams ?? []).map((t) => ({
      teamID: (t as { teamID: number }).teamID,
      domainID: (t as { domainID: number }).domainID,
      iPath: (t as { iPath?: string }).iPath,
    }))

    const ancestorIds = resolveAncestorIds(domainID, team?.iPath, donors)

    if (!ancestorIds) return []

    const ancestry = [...ancestorIds, domainID]
    return ancestry.filter((id) => !ROLE_PICKER_EXCLUDED_ROOT_TEAM_IDS.has(id))
  }, [domainID, domainTeamQuery.data?.team, teamsFiltered.teams])

  const { roleComboItems, roleItemGroups } = useMemo(() => {
    if (!roles.isSuccess || !roles.data?.roles?.length) {
      return { roleComboItems: [], roleItemGroups: undefined }
    }

    const roleList = roles.data.roles
    const toComboItem = (role: (typeof roleList)[number]) => ({
      value: `${role.roleID}`,
      item: formatRoleComboLabel(role),
    })
    const sortByRoleName = (
      a: (typeof roleList)[number],
      b: (typeof roleList)[number],
    ) => a.roleName.localeCompare(b.roleName)

    if (!assignableOrder.length) {
      const localFallback = roleList.filter(
        (r) => r.teamRoot === domainID || r.domainID === domainID,
      )
      const items = [...localFallback].sort(sortByRoleName).map(toComboItem)
      return {
        roleComboItems: items,
        roleItemGroups: items.length
          ? [
              {
                heading: 'Roles in your local context',
                groupClassName: ROLE_COMBO_GROUP_HEADING_CLASS,
                items,
              },
            ]
          : undefined,
      }
    }

    const assignableSet = new Set(assignableOrder)
    const depthIndex = new Map(
      assignableOrder.map((teamRootId, index) => [teamRootId, index]),
    )

    const inScope = roleList.filter((r) => assignableSet.has(r.teamRoot))
    const inheritedRoles = inScope.filter((r) => r.teamRoot !== domainID)
    const localRoles = inScope.filter((r) => r.teamRoot === domainID)

    const sortInherited = (
      a: (typeof roleList)[number],
      b: (typeof roleList)[number],
    ) => {
      const da = depthIndex.get(a.teamRoot) ?? 0
      const db = depthIndex.get(b.teamRoot) ?? 0
      if (da !== db) return da - db
      return sortByRoleName(a, b)
    }

    const groups: {
      heading: string
      items: { value: string; item: string }[]
      groupClassName?: string
    }[] = []

    if (inheritedRoles.length) {
      groups.push({
        heading: 'Main Inherited Roles',
        groupClassName: ROLE_COMBO_GROUP_HEADING_CLASS,
        items: [...inheritedRoles].sort(sortInherited).map(toComboItem),
      })
    }
    if (localRoles.length) {
      groups.push({
        heading: 'Roles in your local context',
        groupClassName: ROLE_COMBO_GROUP_HEADING_CLASS,
        items: [...localRoles].sort(sortByRoleName).map(toComboItem),
      })
    }

    return {
      roleComboItems: groups.flatMap((g) => g.items),
      roleItemGroups: groups.length ? groups : undefined,
    }
  }, [roles.isSuccess, roles.data?.roles, domainID, assignableOrder])

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-2">
        <TextHeading size={4}>
          <span className="inline-flex items-center gap-2">
            <label htmlFor="dm-security-role">DEFAULT SECURITY ROLE</label>
            <Tooltip
              content={
                <span className="inline-block max-w-xs text-wrap">
                  Roles from this domain and parent domains on the branch. Not
                  sibling domains.
                </span>
              }
            >
              <Icon
                icon="info-outline"
                className="text-muted-fg size-4 shrink-0"
              />
            </Tooltip>
          </span>
        </TextHeading>
        <ComboBox
          selectPlaceholder={
            keyedRoles?.[roleID]
              ? formatRoleComboLabel(keyedRoles[roleID])
              : `${roleID || 'Select a role'}`
          }
          items={
            roleItemGroups && roleItemGroups.length > 0
              ? roleItemGroups
              : roleComboItems
          }
          separateItemGroups={!!roleItemGroups && roleItemGroups.length > 1}
          value={`${roleID}`}
          onChange={(value) => {
            if (!canChange) return
            const newRoleID = Number(value)
            onRoleIDChange(newRoleID)
            updateDomain.mutate({
              domainID,
              defaultRoleID: newRoleID,
            })
          }}
          disabled={!canChange}
          id="dm-security-role"
        />
      </div>

      {keyedRoles?.[roleID]?.roleDesc && (
        <TextBody className="text-muted-fg text-sm">
          {keyedRoles[roleID].roleDesc}
        </TextBody>
      )}

      {!!roleID && canChange && onCourseURL && (
        <div className="flex gap-4">
          <Link
            className="text-sm underline opacity-60"
            target="_blank"
            to={`${onCourseURL}/x/manage/roles/${roleID}`}
          >
            View Details for Role ({roleID})
          </Link>
          <Link
            className="text-sm underline opacity-60"
            target="_blank"
            to={`${onCourseURL}/v2/roles/scope_listfunctions.asp?roleID=${roleID}`}
          >
            (Legacy Version)
          </Link>
        </div>
      )}
    </div>
  )
}

SecurityRoles.displayName = 'SecurityRoles'
