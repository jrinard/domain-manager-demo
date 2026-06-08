/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const LaunchEnrollmentEndpointResponses = {
  success: () => {
    return {
      recordsAffected: -1,
      session: {
        userID: 1960713,
        userName: 'Joshua Rinard',
        changePassword: false,
        termsOfServiceSignatureRequired: false,
        adminID: 0,
        teamListSyncDate: '1900-01-01T00:00:00-08:00',
        koPermissionSyncDate: '1900-01-01T00:00:00-08:00',
        domainID: 551,
        timeOutMnts: 129600,
        onCourseURL: 'https://oc.mocaworks.com',
        profileThumbPath:
          '/v2/domains/551/assets/1960713_lqzzjhduv2h_200px.jpg',
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
