/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TasksEndpointResponses = {
  put: {
    success: () => {
      return {
        recordsAffected: -1,
        taskID: 3451786,
        session: {
          userID: 2209853,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '1900-01-01T00:00:00+00:00',
          domainID: 1698652,
          timeOutMnts: 129600,
          onCourseURL: 'https://cardoneventuresceo.com',
          profileThumbPath:
            '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
          teamRootID: 1763850,
          roleID: 432,
          onlinePreference: 'ocAVAILABLE',
        },
        error: {
          sts: 0,
          msg: 'cmdPersistTask',
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
          userID: 2209853,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '1900-01-01T00:00:00+00:00',
          domainID: 1698652,
          timeOutMnts: 129600,
          onCourseURL: 'https://cardoneventuresceo.com',
          profileThumbPath:
            '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
          teamRootID: 1763850,
          roleID: 432,
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
  post: {
    successRequest: () => {
      return {
        body: {
          sessionKey:
            '1XH865GJSZSCNCS05HWN16ZCNMN54PBZT624XNXQYGR4Q7NT5CB5NC758L7B16L2',
          taskName: 'dsfg',
          memberID: 2427088,
          taskDesc: 'dsfg',
          dueDate: '1900-01-01T00:00:00-11:30',
          durationMinutes: -1,
          startDate: '1900-01-01T00:00:00-11:30',
          aboutID: 2427088,
          aboutType: 'ocEVENT',
          taskType: 'ocMEETINGAGENDA',
          displayInToDos: false,
          sendNotice: true,
          parentTaskID: 3450973,
        },
      }
    },
    success: () => {
      return {
        recordsAffected: -1,
        taskID: 3451786,
        session: {
          userID: 2209853,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '1900-01-01T00:00:00+00:00',
          domainID: 1698652,
          timeOutMnts: 129600,
          onCourseURL: 'https://cardoneventuresceo.com',
          profileThumbPath:
            '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
          teamRootID: 1763850,
          roleID: 432,
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
