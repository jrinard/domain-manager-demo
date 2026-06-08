/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const LoginResetPasswordValidateEndpointResponses = {
  get: {
    success: () => {
      return {
        pwSession: {
          userID: 2042763,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2024-01-22T15:40:25.087+00:00',
          domainID: 1698652,
          timeOutMnts: 10080,
          onCourseURL: 'https://cardoneventuresceo.com',
          roleID: 431,
        },
        domain: {
          passwordLength: 4,
          loginDomainID: 'CardoneVentures',
          domainID: 1698652,
          onCourseURL: 'https://cardoneventuresceo.com',
          otherName: 'Cardone Ventures CEO',
        },
        logonName: 'jloch@cardoneventures.com',
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
