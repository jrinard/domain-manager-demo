/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const ViewHistoryMostRecentEndpointResponses = {
  success: () => {
    return {
      history: [
        {
          maxHistDateUTC: '2024-01-11T17:02:25.507Z',
          lessonID: 2167508,
          lessonType: 'ocVIDEO',
          assetType: 'ocVideo',
          lessonName: 'Negotiating Skills',
        },
        {
          maxHistDateUTC: '2024-01-11T16:23:07.823Z',
          lessonID: 2167549,
          lessonType: 'ocVIDEO',
          assetType: 'ocVideo',
          lessonName: 'Using Choices in Negotiating',
        },
      ],
      session: {
        adminID: 0,
        changePassword: false,
        domainID: 551,
        koPermissionSyncDate: '2023-09-29T15:25:54.27+00:00',
        onCourseURL: 'https://cherry.mocaworks.com',
        onlinePreference: 'ocHIDDEN',
        profileThumbPath:
          '/v2/domains/551/assets/1960713_tsc3eykcizn_200px.jpg',
        roleID: 1,
        teamRootID: 551,
        teamListSyncDate: '1900-01-01T00:00:00+00:00',
        termsOfServiceSignatureRequired: false,
        timeOutMnts: 129600,
        userID: 1960713,
        userName: 'Joshua Rinard',
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
