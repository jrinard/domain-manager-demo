/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const PlatformReviewTeamInitializeEndpointResponses = {
  post: {
    success: () => {
      return {
        newTaskID: 3464983,
        session: {
          userID: 2259743,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2024-03-04T20:06:44.733+00:00',
          domainID: 551,
          timeOutMnts: 2160,
          onCourseURL: 'https://cherry.mocaworks.com',
          teamRootID: 501865,
          roleID: 1,
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
