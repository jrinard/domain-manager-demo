export const ViewHistorySummaryEndpointResponses = {
  success: () => {
    return {
      lessonViewHistory: [
        {
          viewCount: 8,
          minHistDateUTC: '2024-04-05T16:53:29.083Z',
          maxHistDateUTC: '2024-04-05T17:34:51.117Z',
          userID: 2048276,
          givenName: 'Ariel',
          familyName: 'Zilist',
          lessonID: 2112491,
        },
        {
          viewCount: 2,
          minHistDateUTC: '2024-04-05T16:26:00.193Z',
          maxHistDateUTC: '2024-04-05T16:26:02.467Z',
          userID: 2048276,
          givenName: 'Ariel',
          familyName: 'Zilist',
          lessonID: 2112485,
        },
        {
          viewCount: 2,
          minHistDateUTC: '2024-04-04T17:10:06.11Z',
          maxHistDateUTC: '2024-04-04T17:10:11.933Z',
          userID: 2048276,
          givenName: 'Ariel',
          familyName: 'Zilist',
          lessonID: 2112477,
        },
        {
          viewCount: 2,
          minHistDateUTC: '2024-04-03T22:38:09.11Z',
          maxHistDateUTC: '2024-04-03T22:38:11.34Z',
          userID: 2048276,
          givenName: 'Ariel',
          familyName: 'Zilist',
          lessonID: 2112473,
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
