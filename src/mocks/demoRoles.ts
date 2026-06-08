import { getDemoSession } from './demoStore'

/** Portfolio demo Roles API — minimal list, no lore/Cherry. */
export function getDemoRolesResponse() {
  return {
    roles: [
      {
        roleID: 1,
        teamRoot: 551,
        roleName: 'Sys Admin',
        roleDesc: 'Portfolio demo administrator role.',
        teamName: 'Cherry',
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
        teamName: 'Cherry',
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
        teamName: 'Cherry',
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
