/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const EventAgendaEndpointResponses = {
  post: {
    success: () => {
      return {
        parentTaskID: 3455416,
        recordsAffected: -1,
        taskID: 3455417,
        session: {
          userID: 2209853,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2024-02-07T01:08:56.36+00:00',
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
          msg: '',
        },
        links: [
          {
            encType: 'application/x-www-form-urlencoded',
            contentType: 'application/json',
            href: 'api/task/meta',
            media: '',
            method: 'get',
            targetPref: '',
            title: 'Task help',
            parameters: [],
            rel: ['http://kvau.lt/api/task/meta'],
          },
        ],
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
