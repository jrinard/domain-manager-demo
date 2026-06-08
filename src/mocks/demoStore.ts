import type { DomainUI } from '@spacedock/manifest'
import {
  DEMO_MASTERY_CONFIG,
  DEMO_MENU_CONFIG,
  DEMO_ACME_HOME_CONFIG,
  DEMO_NORTHWIND_HOME_CONFIG,
  DEMO_TRYYB_LIVE_CONFIG,
} from './fixtures/configBodies'
import { DEMO_TRYYB_LIBRARY_IMAGES } from './fixtures/demoLibraryImages'
import { demoAssets } from '../demo/demoAssetPaths'

export type ConfigType = 'ocTRYYBSTART' | 'ocTRYYBTOPMENU' | 'ocMASTERYSTART'

/** Root domain used by the default portfolio landing route. */
export const DEFAULT_DEMO_DOMAIN_ID = 551
export const DEFAULT_DEMO_DOMAIN_NAME = 'Columbia Bank'

export interface DemoDomain {
  teamID: number
  name: string
  onCourseURL: string
}

export const DEMO_DOMAINS: DemoDomain[] = [
  {
    teamID: 551,
    name: DEFAULT_DEMO_DOMAIN_NAME,
    onCourseURL: 'http://localhost:4400',
  },
  {
    teamID: 1001,
    name: 'Acme Learning Co.',
    onCourseURL: 'http://localhost:4400',
  },
  {
    teamID: 1002,
    name: 'Northwind Academy',
    onCourseURL: 'http://localhost:4400',
  },
]

export const DEMO_DOMAIN_IDS = new Set(DEMO_DOMAINS.map((d) => d.teamID))

export const ACME_DEMO_DOMAIN_ID = 1001
export const NORTHWIND_DEMO_DOMAIN_ID = 1002

const DEMO_MEMBER = { memberID: 9001, memberName: 'Portfolio Demo User' }

const daysAgo = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

/** Default Tryyb config GUIDs for the portfolio landing domain. */
export const DEMO_TRYYB_LIVE_GUID = `demo-${DEFAULT_DEMO_DOMAIN_ID}-tryyb-live`
export const DEMO_TRYYB_DRAFT_GUID = `demo-${DEFAULT_DEMO_DOMAIN_ID}-tryyb-draft`

const now = () => new Date().toISOString()

function demoDomainImage(
  imageName: string,
  pathURL: string,
  imageID: number,
): DomainUI.Image {
  return {
    imageID,
    aboutID: 0,
    aboutType: '',
    originalMimeType: pathURL.endsWith('.jpg') ? 'image/jpeg' : 'image/png',
    height: 0,
    width: 0,
    length: 0,
    originalSizeBytes: 0,
    sequence: 1,
    orientation: 'ocVOID',
    originalMD5: '',
    userDescription: '',
    pathURL,
    imageName,
    originalName: imageName,
    elementType: 'ocDOMAINUI',
    imageType: 'ocIMAGE',
    activeStatus: 'ocENABLED',
  }
}

function demoDomainImages() {
  return [
    demoDomainImage('logo_link', demoAssets.columbiaLogoLight, 90001),
    demoDomainImage('logo_link_DARK', demoAssets.columbiaLogoLight, 90002),
    demoDomainImage('logoImagePath', demoAssets.columbiaLogoLight, 90003),
  ]
}

function configBodyForType(configType: ConfigType): string {
  if (configType === 'ocTRYYBTOPMENU') {
    return JSON.stringify(DEMO_MENU_CONFIG)
  }
  if (configType === 'ocMASTERYSTART') {
    return JSON.stringify(DEMO_MASTERY_CONFIG)
  }
  return JSON.stringify(DEMO_TRYYB_LIVE_CONFIG)
}

function tryybConfigBody(): string {
  return JSON.stringify(DEMO_TRYYB_LIVE_CONFIG)
}

function homeConfigBodyForDomain(domainID: number): string {
  if (domainID === DEFAULT_DEMO_DOMAIN_ID) {
    return tryybConfigBody()
  }
  if (domainID === ACME_DEMO_DOMAIN_ID) {
    return JSON.stringify(DEMO_ACME_HOME_CONFIG)
  }
  if (domainID === NORTHWIND_DEMO_DOMAIN_ID) {
    return JSON.stringify(DEMO_NORTHWIND_HOME_CONFIG)
  }
  return JSON.stringify(DEMO_TRYYB_LIVE_CONFIG)
}

function buildFullConfig(opts: {
  guid: string
  domainID: number
  configType: ConfigType
  activeStatus: DomainUI.UIConfigActiveStatus
  configName: string
  configDescription?: string
  authorNote?: string
  mainBody?: string
  libraryImages?: DomainUI.UIConfigLibraryImageItem[]
  modifiedDate?: string
  createdDate?: string
}): DomainUI.UIConfig & {
  configName: string
  configDescription: string
  authorNote: string
} {
  const created = opts.createdDate ?? opts.modifiedDate ?? now()
  const modified = opts.modifiedDate ?? now()
  return {
    elementType: 'ocDOMAINUI',
    configType: opts.configType,
    activeStatus: opts.activeStatus,
    domainID: opts.domainID,
    outsideID: '',
    createdByID: DEMO_MEMBER.memberID,
    createdDate: created,
    primaryElementID: opts.domainID,
    modifiedByID: DEMO_MEMBER.memberID,
    modifiedDate: modified,
    shareChangedDate: modified,
    shareChangedByID: DEMO_MEMBER.memberID,
    UIconfigGUID: opts.guid,
    mimeType: 'application/json',
    mainBody: opts.mainBody ?? configBodyForType(opts.configType),
    UIschema: '',
    mainBodyIsValid: true,
    UIschemaValidatorAgent: '',
    libraryLessons: [],
    libraryImages: opts.libraryImages ?? [],
    modifiedBy: DEMO_MEMBER,
    createdBy: DEMO_MEMBER,
    shareChangedBy: DEMO_MEMBER,
    configName: opts.configName,
    configDescription: opts.configDescription ?? '',
    authorNote: opts.authorNote ?? '',
  }
}

type StoredConfig = ReturnType<typeof buildFullConfig>

const configs = new Map<string, StoredConfig>()

function seedConfigs() {
  if (configs.size > 0) return

  for (const domain of DEMO_DOMAINS) {
    const id = domain.teamID
    const types: { type: ConfigType; slug: string; label: string }[] = [
      { type: 'ocTRYYBSTART', slug: 'home', label: 'HOME' },
      { type: 'ocTRYYBTOPMENU', slug: 'menu', label: 'Top Menu' },
      { type: 'ocMASTERYSTART', slug: 'mastery', label: 'Mastery Home' },
    ]

    for (const { type, slug, label } of types) {
      const isHome = type === 'ocTRYYBSTART'
      const isColumbia = id === DEFAULT_DEMO_DOMAIN_ID
      const liveModified = daysAgo(isHome ? 14 : 7)
      const draftModified = daysAgo(isHome ? 2 : 3)
      const liveCreated = daysAgo(isHome ? 30 : 14)

      configs.set(`demo-${id}-${slug}-live`, buildFullConfig({
        guid: `demo-${id}-${slug}-live`,
        domainID: id,
        configType: type,
        activeStatus: 'ocENABLED',
        configName: isHome
          ? isColumbia
            ? 'Columbia Bank Live Home'
            : `${domain.name} Live Home`
          : `${label} (Live)`,
        configDescription: isHome
          ? isColumbia
            ? 'Columbia Bank homepage — banners, quick links, and footer.'
            : `${domain.name} homepage (demo).`
          : `Production ${label.toLowerCase()} for ${domain.name}`,
        mainBody: isHome ? homeConfigBodyForDomain(id) : undefined,
        libraryImages: isHome && isColumbia ? DEMO_TRYYB_LIBRARY_IMAGES : undefined,
        createdDate: liveCreated,
        modifiedDate: liveModified,
      }))

      configs.set(`demo-${id}-${slug}-draft`, buildFullConfig({
        guid: `demo-${id}-${slug}-draft`,
        domainID: id,
        configType: type,
        activeStatus: 'ocDRAFT',
        configName: isHome
          ? isColumbia
            ? 'Columbia Bank Draft Home'
            : `${domain.name} Draft Home`
          : `${label} (Draft)`,
        configDescription: isHome
          ? isColumbia
            ? 'Columbia Bank homepage draft — same layout as live for preview.'
            : `${domain.name} homepage draft (demo).`
          : `Work in progress — ${domain.name}`,
        authorNote: isHome && isColumbia
          ? 'Columbia Bank demo layout with local section images.'
          : undefined,
        mainBody: isHome ? homeConfigBodyForDomain(id) : undefined,
        libraryImages: isHome && isColumbia ? DEMO_TRYYB_LIBRARY_IMAGES : undefined,
        createdDate: daysAgo(isHome ? 5 : 4),
        modifiedDate: draftModified,
      }))
    }
  }
}

seedConfigs()

export function getDemoTeamsByFunction() {
  return DEMO_DOMAINS.map((d) => ({
    level: 1,
    iPath: `,${d.teamID},`,
    parentID: 0,
    isAbove: false,
    isBelow: true,
    isDirect: true,
    isLeader: false,
    isCascade: false,
    isCascadeInherited: false,
    parentNamePath: '\t',
    isTeamToolsConfig: d.teamID === DEFAULT_DEMO_DOMAIN_ID,
    teamDesc:
      d.teamID === DEFAULT_DEMO_DOMAIN_ID
        ? 'Columbia Bank portfolio demo domain'
        : 'Portfolio demo domain',
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
  }))
}

export function getDemoTeam(teamID: number) {
  const domain = DEMO_DOMAINS.find((d) => d.teamID === teamID)
  const isRootDomain = teamID === DEFAULT_DEMO_DOMAIN_ID
  return {
    team: {
      teamID,
      teamName: domain?.name ?? (isRootDomain ? DEFAULT_DEMO_DOMAIN_NAME : `Domain ${teamID}`),
      elementType: 'ocTEAM',
      teamDesc: isRootDomain ? 'Columbia Bank portfolio demo' : 'Portfolio demo',
      teamType: 'ocDOMAIN',
      domainID: teamID,
      activeStatus: 'ocENABLED',
      primaryElementID: isRootDomain ? teamID : 551,
      iPath: isRootDomain ? ',551,' : `,551,${teamID},`,
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
    profileThumbPath: demoAssets.profile.demoUser,
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
      images: demoDomainImages(),
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
