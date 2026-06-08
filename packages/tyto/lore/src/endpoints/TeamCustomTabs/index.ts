/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TeamCustomTabsEndpointResponses = {
  get: {
    success: () => {
      return {
        membersTabs: [
          {
            itemTraitID: 31385,
            traitID: 922,
            aboutID: 2060224,
            aboutType: 'ocTEAM',
            traitValue: '',
            activeStatus: 'ocENABLED',
            createdByID: 2043811,
            createdDate: '2023-11-30T20:10:52.91+00:00',
            modifiedByID: 2043811,
            modifiedDate: '2023-11-30T20:10:52.91+00:00',
            trait: {
              traitName: 'Test Tab',
              traitDesc: 'www.google.com',
              domainID: 2365525,
              teamRoot: 2365525,
              color: '_blank',
              aboutType: 'ocPersonPage',
              traitCategory: 'Custom Tabs',
              seq: 0,
              activeStatus: 'ocENABLED',
              createdByID: 2043811,
              createdDate: '2023-11-30T16:57:00.767+00:00',
              modifiedByID: 2043811,
              modifiedDate: '2023-11-30T19:49:11.643+00:00',
              iconPath: '',
              ssoMethod: 'ocVACANT',
            },
          },
        ],
        session: {
          userID: 2043811,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2023-11-29T21:34:31.727+00:00',
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
