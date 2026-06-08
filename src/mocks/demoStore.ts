import type { DomainUI } from '@spacedock/manifest'
import {
  DEMO_HOME_CONFIG,
  DEMO_MASTERY_CONFIG,
  DEMO_MENU_CONFIG,
} from './fixtures/configBodies'

export type ConfigType = 'ocTRYYBSTART' | 'ocTRYYBTOPMENU' | 'ocMASTERYSTART'

/** Root domain used by @tyto/lore fixtures and the default portfolio landing route. */
export const DEFAULT_DEMO_DOMAIN_ID = 551

export interface DemoDomain {
  teamID: number
  name: string
  onCourseURL: string
}

export const DEMO_DOMAINS: DemoDomain[] = [
  { teamID: 551, name: 'Cherry', onCourseURL: 'http://localhost:4400' },
  { teamID: 1001, name: 'Acme Learning Co.', onCourseURL: 'http://localhost:4400' },
  { teamID: 1002, name: 'Northwind Academy', onCourseURL: 'http://localhost:4400' },
  { teamID: 1003, name: 'Contoso Training', onCourseURL: 'http://localhost:4400' },
]

const DEMO_MEMBER = { memberID: 9001, memberName: 'Portfolio Demo User' }

const now = () => new Date().toISOString()

function configBodyForType(configType: ConfigType): string {
  if (configType === 'ocTRYYBTOPMENU') {
    return JSON.stringify(DEMO_MENU_CONFIG)
  }
  if (configType === 'ocMASTERYSTART') {
    return JSON.stringify(DEMO_MASTERY_CONFIG)
  }
  return JSON.stringify(DEMO_HOME_CONFIG)
}

function buildFullConfig(opts: {
  guid: string
  domainID: number
  configType: ConfigType
  activeStatus: DomainUI.UIConfigActiveStatus
  configName: string
  configDescription?: string
}): DomainUI.UIConfig & {
  configName: string
  configDescription: string
  authorNote: string
} {
  const modified = now()
  return {
    elementType: 'ocDOMAINUI',
    configType: opts.configType,
    activeStatus: opts.activeStatus,
    domainID: opts.domainID,
    outsideID: '',
    createdByID: DEMO_MEMBER.memberID,
    createdDate: modified,
    primaryElementID: opts.domainID,
    modifiedByID: DEMO_MEMBER.memberID,
    modifiedDate: modified,
    shareChangedDate: modified,
    shareChangedByID: DEMO_MEMBER.memberID,
    UIconfigGUID: opts.guid,
    mimeType: 'application/json',
    mainBody: configBodyForType(opts.configType),
    UIschema: '',
    mainBodyIsValid: true,
    UIschemaValidatorAgent: '',
    libraryLessons: [],
    libraryImages: [],
    modifiedBy: DEMO_MEMBER,
    createdBy: DEMO_MEMBER,
    shareChangedBy: DEMO_MEMBER,
    configName: opts.configName,
    configDescription: opts.configDescription ?? '',
    authorNote: '',
  }
}

type StoredConfig = ReturnType<typeof buildFullConfig>

const configs = new Map<string, StoredConfig>()

function seedConfigs() {
  if (configs.size > 0) return

  for (const domain of DEMO_DOMAINS) {
    const id = domain.teamID
    const types: { type: ConfigType; slug: string; label: string }[] = [
      { type: 'ocTRYYBSTART', slug: 'tryyb', label: 'Tryyb Home' },
      { type: 'ocTRYYBTOPMENU', slug: 'menu', label: 'Top Menu' },
      { type: 'ocMASTERYSTART', slug: 'mastery', label: 'Mastery Home' },
    ]

    for (const { type, slug, label } of types) {
      configs.set(`demo-${id}-${slug}-live`, buildFullConfig({
        guid: `demo-${id}-${slug}-live`,
        domainID: id,
        configType: type,
        activeStatus: 'ocENABLED',
        configName: `${label} (Live)`,
        configDescription: `Production ${label.toLowerCase()} for ${domain.name}`,
      }))

      configs.set(`demo-${id}-${slug}-draft`, buildFullConfig({
        guid: `demo-${id}-${slug}-draft`,
        domainID: id,
        configType: type,
        activeStatus: 'ocDRAFT',
        configName: `${label} (Draft)`,
        configDescription: `Work in progress — ${domain.name}`,
      }))
    }
  }
}

seedConfigs()

export function getDemoTeamsByFunction() {
  const cherryRoot = {
    level: 1,
    iPath: ',551,',
    parentID: 551,
    isAbove: false,
    isBelow: true,
    isDirect: true,
    isLeader: false,
    isCascade: false,
    isCascadeInherited: false,
    parentNamePath: '\t',
    isTeamToolsConfig: true,
    teamDesc: 'Root demo domain (lore ID 551)',
    teamType: 'ocDOMAIN' as const,
    teamID: DEFAULT_DEMO_DOMAIN_ID,
    profileImageID: 0,
    outsideType: '',
    outsideExpirationDate: '1900-01-01T00:00:00+00:00',
    name: 'Cherry',
    ocType: 'ocTEAM',
    domainID: DEFAULT_DEMO_DOMAIN_ID,
    subDomainParentNamePath: '\t',
    activeStatus: 'ocENABLED' as const,
  }

  const childDomains = DEMO_DOMAINS.filter((d) => d.teamID !== DEFAULT_DEMO_DOMAIN_ID).map(
    (d, index) => ({
      level: 2,
      iPath: `,551,${d.teamID},`,
      parentID: 551,
      isAbove: false,
      isBelow: true,
      isDirect: true,
      isLeader: false,
      isCascade: false,
      isCascadeInherited: false,
      parentNamePath: '\tCherry\t',
      isTeamToolsConfig: index === 0,
      teamDesc: 'Portfolio demo domain',
      teamType: 'ocDOMAIN' as const,
      teamID: d.teamID,
      profileImageID: 0,
      outsideType: '',
      outsideExpirationDate: '1900-01-01T00:00:00+00:00',
      name: d.name,
      ocType: 'ocTEAM',
      domainID: d.teamID,
      subDomainParentNamePath: '\t',
      activeStatus: 'ocENABLED' as const,
    }),
  )

  return [cherryRoot, ...childDomains]
}

export function getDemoTeam(teamID: number) {
  const domain = DEMO_DOMAINS.find((d) => d.teamID === teamID)
  const isRootCherry = teamID === DEFAULT_DEMO_DOMAIN_ID
  return {
    team: {
      teamID,
      teamName: domain?.name ?? (isRootCherry ? 'Cherry' : `Domain ${teamID}`),
      elementType: 'ocTEAM',
      teamDesc: isRootCherry ? 'Root demo domain' : 'Portfolio demo',
      teamType: 'ocDOMAIN',
      domainID: teamID,
      activeStatus: 'ocENABLED',
      primaryElementID: isRootCherry ? teamID : 551,
      iPath: isRootCherry ? ',551,' : `,551,${teamID},`,
      teamToolsConfig: {
        modifiedByID: 9001,
        modifiedDate: now(),
        teamName: domain?.name ?? 'Demo',
        teamRoot: teamID,
        onInitialize: {
          mayTakeDisc: true,
          mayImportDisc: false,
          mayTakeBasicTrain: false,
          mayTakeAdvTrain: false,
          hasBasicViewDisc: true,
          hasAdvViewDisc: false,
          hasPermitChange: false,
          hasGrantPermitChange: false,
        },
        onDiscComplete: {
          mayTakeDisc: true,
          mayImportDisc: false,
          mayTakeBasicTrain: false,
          mayTakeAdvTrain: false,
          hasBasicViewDisc: true,
          hasAdvViewDisc: false,
          hasPermitChange: false,
          hasGrantPermitChange: false,
        },
        onBasicTrainingComplete: {
          mayTakeDisc: false,
          mayImportDisc: false,
          mayTakeBasicTrain: false,
          mayTakeAdvTrain: false,
          hasBasicViewDisc: false,
          hasAdvViewDisc: false,
          hasPermitChange: false,
          hasGrantPermitChange: false,
        },
        onAdvTrainingComplete: {
          mayTakeDisc: false,
          mayImportDisc: false,
          mayTakeBasicTrain: false,
          mayTakeAdvTrain: false,
          hasBasicViewDisc: false,
          hasAdvViewDisc: false,
          hasPermitChange: false,
          hasGrantPermitChange: false,
        },
        basicTrainingID: 0,
        advTrainingID: 0,
      },
    },
    session: getDemoSession(),
    error: { sts: 0, msg: 'initialized' },
    links: [],
    profileImages: [],
  }
}

export function getDemoSession() {
  return {
    userID: 9001,
    userName: 'Portfolio Demo User',
    changePassword: false,
    termsOfServiceSignatureRequired: false,
    adminID: 0,
    teamListSyncDate: '1900-01-01T00:00:00+00:00',
    koPermissionSyncDate: '2024-01-01T00:00:00.000Z',
    domainID: DEFAULT_DEMO_DOMAIN_ID,
    timeOutMnts: 2160,
    onCourseURL: 'http://localhost:4400',
    profileThumbPath: '',
    teamRootID: DEFAULT_DEMO_DOMAIN_ID,
    roleID: 1,
    onlinePreference: 'ocAVAILABLE',
    sessionKey: 'DEMO-SESSION-KEY',
  }
}

export function getDemoTeamAdmin(teamID: number = DEFAULT_DEMO_DOMAIN_ID) {
  return {
    team: getDemoTeam(teamID).team,
    profileImages: [],
    admin: {
      adminDetail: { detailSummary: '', maxPersons: -1 },
      permissions: [
        {
          functionName: 'Domain',
          fieldName: '',
          changeAccess: true,
          viewAccess: true,
          addAccess: true,
          deleteAccess: true,
        },
        {
          functionName: 'Teams',
          fieldName: '',
          changeAccess: true,
          viewAccess: true,
          addAccess: true,
          deleteAccess: true,
        },
      ],
    },
    session: getDemoSession(),
  }
}

export function getDemoDomain(domainID: number) {
  const domain = DEMO_DOMAINS.find((d) => d.teamID === domainID)
  return {
    domain: {
      domainID,
      onCourseURL: domain?.onCourseURL ?? 'http://localhost:4400',
      otherName: domain?.name ?? 'Demo Domain',
      loginDomainID: 'demo',
      defaultRoleID: 5,
      colorSchemes: 'dark,light',
      menuType: 'top,side',
    },
    session: getDemoSession(),
  }
}

export function getDemoDomainUI(domainID: number) {
  return {
    domainUI: {
      domainID,
      onCourseURL: 'http://localhost:4400',
      loginDomainID: 'demo',
      otherName: DEMO_DOMAINS.find((d) => d.teamID === domainID)?.name ?? 'Demo',
      loginURI: '',
      showKeepMeLoggedIn: true,
      forgotPWLabel: 'Forgot Password?',
      forgotPwURI: '#',
      activateAccountLabel: '',
      activateAccountURI: '',
      loginNameLabel: 'Login Name',
      isSingleSignOn: false,
      contactName: 'Support',
      contactEmail: 'demo@example.com',
      contactPhone: '',
      taglineLabel: 'Demo',
      images: [],
      keyValues: [
        { teamID: domainID, uiKey: 'colorSchemes', uiValue: 'dark,light' },
        { teamID: domainID, uiKey: 'menuType', uiValue: 'top,side' },
      ],
    },
  }
}

export function listConfigurations(domainID: number, configType: ConfigType) {
  return [...configs.values()].filter(
    (c) => c.domainID === domainID && c.configType === configType,
  )
}

export function getConfiguration(guid: string) {
  return configs.get(guid)
}

export function saveConfiguration(
  guid: string,
  patch: Partial<StoredConfig> & { mainBody?: string },
) {
  const existing = configs.get(guid)
  if (!existing) return null
  const updated = {
    ...existing,
    ...patch,
    modifiedDate: now(),
  }
  configs.set(guid, updated)
  return updated
}

export function updateConfigurationStatus(
  guid: string,
  activeStatus: DomainUI.UIConfigActiveStatus,
) {
  return saveConfiguration(guid, { activeStatus })
}
