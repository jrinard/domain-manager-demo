import { DEFAULT_DEMO_DOMAIN_NAME, getDemoSession } from './demoStore'

/** Portfolio demo Roles API — minimal list. */
export function getDemoRolesResponse() {
  return {
    roles: [
      {
        roleID: 1,
        teamRoot: 551,
        roleName: 'Sys Admin',
        roleDesc: 'Portfolio demo administrator role.',
        teamName: DEFAULT_DEMO_DOMAIN_NAME,
        iPath: ',',
        parentNamePath: '\t',
        domainID: 551,
        hasView: true,
        hasChange: true,
        hasDelete: true,
      },
      {
        roleID: 2,
        teamRoot: 551,
        roleName: 'Company Admin',
        roleDesc: 'Portfolio demo company admin role.',
        teamName: DEFAULT_DEMO_DOMAIN_NAME,
        iPath: ',',
        parentNamePath: '\t',
        domainID: 551,
        hasView: true,
        hasChange: true,
        hasDelete: true,
      },
      {
        roleID: 3,
        teamRoot: 551,
        roleName: 'Manager',
        roleDesc: 'Portfolio demo manager role.',
        teamName: DEFAULT_DEMO_DOMAIN_NAME,
        iPath: ',',
        parentNamePath: '\t',
        domainID: 551,
        hasView: true,
        hasChange: true,
        hasDelete: false,
      },
    ],
    session: getDemoSession(),
    error: { sts: 0, msg: 'initialized' },
    links: [],
  }
}
