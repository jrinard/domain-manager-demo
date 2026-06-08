/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const PeopleByFunctionEndpointResponses = {
  success: () => {
    return {
      people: [
        {
          userID: 2202374,
          roleID: 429,
          roleName: 'Selenium Test Role',
          givenName: 'Yoda',
          familyName: 'Admin',
          familiarName: '',
          countLookingDown: 0,
          countLookingUp: 0,
          countLookingDirect: 1,
        },
        {
          userID: 2371716,
          roleID: 429,
          roleName: 'Selenium Test Role',
          givenName: 'Green',
          familyName: 'Goblin',
          familiarName: '',
          countLookingDown: 0,
          countLookingUp: 0,
          countLookingDirect: 1,
        },
        {
          userID: 2202377,
          roleID: 429,
          roleName: 'Selenium Test Role',
          givenName: 'Mocaworks',
          familyName: 'Grogu',
          familiarName: '',
          countLookingDown: 0,
          countLookingUp: 0,
          countLookingDirect: 1,
        },

        {
          userID: 2202373,
          roleID: 429,
          roleName: 'Selenium Test Role',
          givenName: 'Luke',
          familyName: 'User',
          familiarName: '',
          countLookingDown: 0,
          countLookingUp: 0,
          countLookingDirect: 1,
        },
      ],
      hasViewDown: true,
      hasViewup: true,
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
