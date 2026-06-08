/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TeamDefaultEnrollmentsTeamEndpointResponses = {
  get: {
    success: () => {
      return {
        defaultEnrollments: [
          {
            curriculum: {
              name: 'Google Search 201 - Advanced Searching',
              elementType: 'ocBLOCK',
              description:
                'This course will cover advanced searching techniques and also marketing strategies using Google AdWords.',
              expirationDate: '1900-01-01T00:00:00+00:00',
              curriculumID: 93113,
            },
            teamDefaultEnrollmentID: 5290,
            teamrootID: 4648,
            createdByID: 4792,
            createdDate: '2011-12-29T17:25:27.693+00:00',
            isCascade: false,
            roleIDOption: 0,
            onlyNewMembers: false,
            personOutsideType: '',
            team: {
              name: 'Old Avengers Team',
              description:
                'The Avengers is a team of superheroes, appearing in magazines published by Marvel Comics. The team made its debut in The Avengers #1 (Sept. 1963), and was created by writer-editor Stan Lee and artist / co-plotter Jack Kirby.',
              subType: 'ocTEAM',
              subDomainParentNamePath: '\t',
              iPath: ',551,',
            },
            createdBy: {
              elementName: 'Pete Bachman',
              activeStatus: 'ocENABLED',
              elementType: 'ocPERSON',
              elementSubType: 'ocITEM',
            },
            permission: {
              hasChange: true,
              hasDelete: true,
              hasView: true,
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
