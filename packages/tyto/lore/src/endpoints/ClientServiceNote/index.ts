/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const ClientServiceNoteEndpointResponses = {
  get: {
    success: () => {
      return {
        clientServiceNote: {
          noteText: 'This is the Note Text',
          attachments: [],
          clientServiceNoteID: 3,
          createdDate: '2024-06-03T21:57:21+00:00',
          modifiedDate: '2024-06-03T21:57:21+00:00',
          subjectText: 'Subject Text',
          activeStatus: 'ocENABLED',
          attachmentCount: 0,
          client: {
            elementID: 182571,
            primaryElementID: 0,
            domainID: 551,
          },
          permission: {
            hasChange: true,
            hasDelete: true,
          },
          createdBy: {
            memberName: 'Joshua Rinard',
            memberID: 1960713,
          },
          modifiedBy: {
            memberName: 'Joshua Rinard',
            memberID: 1960713,
          },
        },
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

  post: {
    success: () => {
      return {
        recordsAffected: -1,
        clientServiceNoteID: 3,
        session: {
          userID: 1960713,
          userName: 'Joshua Rinard',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00-08:00',
          koPermissionSyncDate: '2024-01-16T08:59:27.27-08:00',
          domainID: 551,
          timeOutMnts: 90,
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
  },
  delete: {
    success: () => {
      return {
        recordsAffected: -1,
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
