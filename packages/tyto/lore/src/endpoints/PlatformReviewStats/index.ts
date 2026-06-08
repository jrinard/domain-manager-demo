/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const PlatformReviewStatsEndpointResponses = {
  get: {
    success: (scenario: 'populated' | 'empty' = 'populated') => {
      if (scenario === 'empty') {
        return {
          startStats: {
            memberRepresentation: [],
            memberStandings: [],
            teamStandings: [],
          },
          cacheDate: '2024-03-12T17:00:00',
          session: {
            userID: 2478041,
            userName: 'Owner Small Earthen Pot',
            changePassword: false,
            termsOfServiceSignatureRequired: false,
            adminID: 2209853,
            teamListSyncDate: '1900-01-01T00:00:00+00:00',
            koPermissionSyncDate: '1900-01-01T00:00:00+00:00',
            domainID: 1698652,
            timeOutMnts: 120,
            onCourseURL: 'https://cardoneventuresceo.com',
            teamRootID: 2478024,
            roleID: 449,
            onlinePreference: 'ocAVAILABLE',
          },
          error: {
            sts: 0,
            msg: 'initialized',
          },
          links: [],
        }
      }
      return {
        startStats: {
          memberRepresentation: [
            {
              memberID: 2209853,
              memberName: 'John Bailey',
              profileImage: {
                assetID: 2218073,
                assetName: 'IMGL8356.jpeg',
                assetDesc: '',
                assetType: 'ocPhoto',
                orientation: 'ocVOID',
                modifiedDate: '2023-05-08T16:28:50.333',
                modifiedByID: 2209853,
                createdDate: '2023-05-08T16:28:50.333',
                createdByID: 2209853,
                createdByName: 'John Bailey',
                sequence: 2,
                softwareRequirements: '',
                originalMD5: 'cRLXetPF0GJd/XfGjnx1pA==',
                domainID: 1698652,
                encodings: [
                  {
                    encodingType: 'ocDEFAULT',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-05-08T16:28:50.333',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 0,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/tyto/api/person/profilephoto?assetID=2218073&encoding=ocDEFAULT',
                  },
                  {
                    encodingType: 'ocORIGINAL',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-05-08T16:28:50.333',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 19240,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/tyto/api/person/profilephoto?assetID=2218073&encoding=ocORIGINAL',
                  },
                  {
                    encodingType: 'ocTHUMBNAIL',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-05-08T16:28:50.333',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 0,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
                  },
                ],
                courseItemID: 2209853,
              },
            },
            {
              memberID: 2077672,
              memberName: 'Ryann Michaud',
              profileImage: {
                assetID: 2191912,
                assetName: '17E79D49-A4AE-4CD7-8F3E-0DEC7B94EA4C.jpeg',
                assetDesc: '',
                assetType: 'ocPhoto',
                orientation: 'ocVOID',
                modifiedDate: '2023-03-01T00:15:25.283',
                modifiedByID: 2077672,
                createdDate: '2023-03-01T00:15:25.28',
                createdByID: 2077672,
                createdByName: 'Ryann Michaud',
                sequence: 3,
                softwareRequirements: '',
                originalMD5: '9Iq2kf18ng5RN8cq2APD7A==',
                domainID: 1698652,
                encodings: [
                  {
                    encodingType: 'ocDEFAULT',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-03-01T00:15:25.283',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 0,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/tyto/api/person/profilephoto?assetID=2191912&encoding=ocDEFAULT',
                  },
                  {
                    encodingType: 'ocORIGINAL',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-03-01T00:15:25.283',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 55742,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/tyto/api/person/profilephoto?assetID=2191912&encoding=ocORIGINAL',
                  },
                  {
                    encodingType: 'ocTHUMBNAIL',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-03-01T00:15:25.283',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 0,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/v2/domains/1698652/assets/2077672_rxw3dy5rut2_200px.jpg',
                  },
                ],
                courseItemID: 2077672,
              },
            },
            {
              memberID: 2279138,
              memberName: 'Margaret Yacoub',
              profileImage: {
                assetID: 2279973,
                assetName: 'IMG-3574-Facetune-07-05-2022-23-36-59.jpeg',
                assetDesc: '',
                assetType: 'ocPhoto',
                orientation: 'ocVOID',
                modifiedDate: '2023-08-28T22:12:25.667',
                modifiedByID: 2279138,
                createdDate: '2023-08-28T22:12:25.667',
                createdByID: 2279138,
                createdByName: 'Margaret Yacoub',
                sequence: 2,
                softwareRequirements: '',
                originalMD5: 'nFbDpia8/xjVedu7gliBuA==',
                domainID: 1698652,
                encodings: [
                  {
                    encodingType: 'ocDEFAULT',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-08-28T22:12:25.667',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 0,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/tyto/api/person/profilephoto?assetID=2279973&encoding=ocDEFAULT',
                  },
                  {
                    encodingType: 'ocORIGINAL',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-08-28T22:12:25.667',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 31952,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/tyto/api/person/profilephoto?assetID=2279973&encoding=ocORIGINAL',
                  },
                  {
                    encodingType: 'ocTHUMBNAIL',
                    mimeType: 'image/jpeg',
                    modifiedDate: '2023-08-28T22:12:25.667',
                    height: 500,
                    width: 500,
                    length: 0,
                    sizeBytes: 0,
                    techNote: '',
                    activeStatus: 'ocENABLED',
                    pathURL:
                      '/v2/domains/1698652/assets/2279138_vonqx4dwkwi_200px.jpg',
                  },
                ],
                courseItemID: 2279138,
              },
            },
            {
              memberID: 2478042,
              memberName: 'PR Manager Tester',
            },
          ],
          memberStandings: [
            {
              memberID: 2478040,
              cvPoints: 0,
              givenName: 'Employee',
              familyInitial: 'o',
            },
            {
              memberID: 2478041,
              cvPoints: 0,
              givenName: 'Owner',
              familyInitial: 'S',
            },
          ],
          teamStandings: [
            {
              teamName: 'Upshaw, Todd - Upshaw Plumbing Service',
              cvPointsMeanPerMember: 64.1,
            },
            {
              teamName: 'Santos, Ezequiel - Compete Apartment Care',
              cvPointsMeanPerMember: 37,
            },
            {
              teamName: 'Welsh, Jonathan - Fresh Food Market',
              cvPointsMeanPerMember: 30.9,
            },
            {
              teamName: 'Wiberley, TJ - Patriot Restoration TN',
              cvPointsMeanPerMember: 28.3,
            },
            {
              teamName: 'McFadden, Ted - Sureshine Care Network',
              cvPointsMeanPerMember: 25.6,
            },
            {
              teamName: 'Chetek, Aaron - Environmental Dynamics Limited',
              cvPointsMeanPerMember: 22.7,
            },
          ],
        },
        cacheDate: '2024-03-12T17:00:00',
        session: {
          userID: 2478041,
          userName: 'Owner Small Earthen Pot',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 2209853,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '1900-01-01T00:00:00+00:00',
          domainID: 1698652,
          timeOutMnts: 120,
          onCourseURL: 'https://cardoneventuresceo.com',
          teamRootID: 2478024,
          roleID: 449,
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
