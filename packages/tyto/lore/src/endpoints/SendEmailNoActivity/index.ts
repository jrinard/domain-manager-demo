export const SendEmailNoActivityEndpointResponses = {
  success: () => {
    return {
      emailResults: [
        {
          userID: 2537391,
          email: 'FakeNameUser9@kv.com',
          userName: 'FakeTest User9',
          logonName: 'FakeName',
          emKey: 'W5LP18XPS5Z5S8GDH5MLPG4LC0BQZXDN',
          emailQueueID: 20561282,
        },
        {
          userID: 2537394,
          email: 'FakeUserTest1@kv.com',
          userName: 'FakeUser Test1',
          logonName: 'FakeUserTest1@kv.com',
          emKey: '5GKBRBZR9X7NKSGGZYDS9RMKH9S3HX43',
          emailQueueID: 20561283,
        },
        {
          userID: 2537395,
          email: 'fake3@kv.com',
          userName: 'Fake3 User3',
          logonName: 'CustomName',
          emKey: 'PLWYVP3VKZ2CY8ZLJVB7GH3Z6ZF9SV16',
          emailQueueID: 20561284,
        },
      ],
      session: {
        userID: 1960713,
        userName: 'Joshua Rinard',
        changePassword: false,
        termsOfServiceSignatureRequired: false,
        adminID: 0,
        teamListSyncDate: '1900-01-01T00:00:00+00:00',
        koPermissionSyncDate: '1900-01-01T00:00:00+00:00',
        domainID: 551,
        timeOutMnts: 90,
        onCourseURL: 'https://cherry.mocaworks.com',
        profileThumbPath:
          '/v2/domains/551/assets/1960713_tsc3eykcizn_200px.jpg',
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
