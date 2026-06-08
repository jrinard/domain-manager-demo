/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const EventAttendeeEndpointResponses = {
  delete: {
    success: () => {
      return {
        recordsAffected: -1,
        session: {
          userID: 2209853,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2024-02-19T03:15:45.123+00:00',
          domainID: 1698652,
          timeOutMnts: 129600,
          onCourseURL: 'https://cardoneventuresceo.com',
          profileThumbPath:
            '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
          teamRootID: 1763850,
          roleID: 432,
          onlinePreference: 'ocAVAILABLE',
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
          userID: 2209853,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2024-02-12T23:54:29.043+00:00',
          domainID: 1698652,
          timeOutMnts: 129600,
          onCourseURL: 'https://cardoneventuresceo.com',
          profileThumbPath:
            '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
          teamRootID: 1763850,
          roleID: 432,
          onlinePreference: 'ocAVAILABLE',
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
        eventAttendeeID: 729960,
        countAdded: 1,
        session: {
          userID: 2209853,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2024-02-14T18:08:43.01+00:00',
          domainID: 1698652,
          timeOutMnts: 129600,
          onCourseURL: 'https://cardoneventuresceo.com',
          profileThumbPath:
            '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
          teamRootID: 1763850,
          roleID: 432,
          onlinePreference: 'ocAVAILABLE',
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
