/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const CatalogCurriculumPublicationEnhancedPermissionsPersonEndpointResponses =
  {
    get: {
      success: () => {
        return {
          catalogPermisssions: [
            {
              catalogID: 2448275,
              catalogName: 'new Category folder name',
              catalogType: 'ocCURRICULUMPUB',
              CatalogItemType: 'ocCATALOG',
              CatalogPathIDs: ',',
              CatalogPathName: '\t',
              personID: 1960713,
              personName: 'Joshua Rinard',
              outsideTerminateDate: '1900-01-01T00:00:00+00:00',
              outsideType: '',
              hasView: true,
              hasAdd: false,
              hasChange: false,
              hasDelete: false,
              hasShare: false,
              modifiedByID: 1960713,
              modifiedDate: '2025-03-19T19:15:29.237+00:00',
            },
          ],
          session: {
            userID: 1960713,
            userName: 'Joshua Rinard',
            changePassword: false,
            termsOfServiceSignatureRequired: false,
            adminID: 0,
            teamListSyncDate: '1900-01-01T00:00:00+00:00',
            koPermissionSyncDate: '2024-06-02T16:31:53.75+00:00',
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
