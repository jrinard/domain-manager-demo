/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TelecomEndpointResponses = {
  get: {
    success: () => {
      return {
        telecom: [
          {
            telecomGUID: '864261a0-0524-47c2-82dd-7775288d104f',
            label: 'Cell',
            address: '6128609395',
            modifiedByID: 2043811,
            modifiedDateUTC: '2022-06-16T21:30:20.85+00:00',
            seq: 1,
            hasChange: true,
          },
          {
            telecomGUID: '9e3afd57-b9b7-4831-99b2-81a7ec6cbee2',
            label: 'Fake Phone',
            address: '0123456789',
            modifiedByID: 2043811,
            modifiedDateUTC: '2023-12-21T17:28:14.837+00:00',
            seq: 2,
            hasChange: true,
          },
        ],
        hasAdd: true,
        session: {
          userID: 2043811,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2023-12-21T17:26:04.637+00:00',
          domainID: 551,
          timeOutMnts: 90,
          onCourseURL: 'https://cherry.mocaworks.com',
          profileThumbPath:
            '/v2/domains/551/assets/2043811_sxuwdy5uwwo_200px.jpg',
          teamRootID: 551,
          roleID: 1,
          onlinePreference: 'ocHIDDEN',
        },
        error: {
          sts: 0,
          msg: 'initialized',
        },
        links: [],
      }
    },
  },
  post: {
    success: () => {
      return {
        recordsAffected: -1,
        telecomGUID: '9e3afd57-b9b7-4831-99b2-81a7ec6cbee2',
        session: {
          userID: 2043811,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '1900-01-01T00:00:00+00:00',
          domainID: 551,
          timeOutMnts: 90,
          onCourseURL: 'https://cherry.mocaworks.com',
          profileThumbPath:
            '/v2/domains/551/assets/2043811_sxuwdy5uwwo_200px.jpg',
          teamRootID: 551,
          roleID: 1,
          onlinePreference: 'ocHIDDEN',
        },
        error: {
          sts: 0,
          msg: 'initialized',
        },
        links: [],
      }
    },
  },
  put: {
    success: () => {
      return {
        recordsAffected: -1,
        session: {
          userID: 2043811,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2023-12-21T17:26:04.637+00:00',
          domainID: 551,
          timeOutMnts: 90,
          onCourseURL: 'https://cherry.mocaworks.com',
          profileThumbPath:
            '/v2/domains/551/assets/2043811_sxuwdy5uwwo_200px.jpg',
          teamRootID: 551,
          roleID: 1,
          onlinePreference: 'ocHIDDEN',
        },
        error: {
          sts: 0,
          msg: 'initialized',
        },
        links: [],
      }
    },
  },
  invalidMissingRequired: (propName: string) => {
    return {
      data: [],
      links: [],
      error: {
        logID: -1,
        sts: -1000,
        msg: `validation error: ${propName} required`,
        technical: `parameters must contain ${propName}`,
      },
    }
  },
}
