/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const InboxConversationsEndpointResponses = {
  invalidUnauthenticated: () => {
    return {
      error: {
        sts: -297,
        msg: 'The request failed authentication',
        logID: 225291190,
        technical: 'Session request is malformed missing',
      },
      links: [],
    }
  },
  get: {
    success: () => {
      return {
        notices: [
          {
            catalogIDs: [],
            name: 'testing',
            locID: 6707296,
            ocType: 'ocNOTICE',
            noticeID: 6707296,
            noticeType: 'ocPrivateIN',
            actionType: 'ocNewMessage',
            toElementID: 2209853,
            fromElementID: 2048276,
            noticeText: 'testing',
            noticeDate: '2023-07-14T22:04:14.743+00:00',
            isNew: true,
            isCritical: false,
            isCascade: false,
            aboutType: 'ocNOTICE',
            aboutID: 6707287,
            functionID: 37,
            param1: '6707287',
            param2: '',
            param3: '',
            param4: '',
            lastCommentDate: '2023-07-14T22:04:14.743+00:00',
            sortDate: '2023-07-14T22:04:14.743+00:00',
            toElementType: 'ocPERSON',
            about: {
              locID: 6707287,
              ocType: 'ocNOTICE',
              name: 'Testing - 9 recipients',
              noticeID: 6707287,
              noticeType: 'ocPrivateThread',
              actionType: 'ocNewThread',
              activeStatus: 'ocENABLED',
              aboutID: 0,
              aboutType: '',
              noticeDate: '2023-07-14T22:04:14.74',
              isCritical: false,
              noticeText: 'Testing - 9 recipients',
              commentCount: 1,
              commentCountNew: 1,
              attachmentCount: 0,
              members: [],
            },
            comments: [
              {
                commentID: 17079299,
                noticeID: 6707287,
                commentText: 'testing',
                userID: 2048276,
                createdDate: '2023-07-14T22:04:14.743+00:00',
                activeStatus: 'ocENABLED',
              },
            ],
            activeStatus: 'ocENABLED',
          },
        ],
        participants: [],
        session: {
          userID: 1,
          userName: 'Name Name',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2023-07-17T23:39:40.073+00:00',
          domainID: 1,
          timeOutMnts: 90,
          onCourseURL: 'https://cardoneventuresceo.com',
          teamRootID: 1,
          roleID: 432,
          onlinePreference: 'ocAVAILABLE',
        },
        error: { sts: 0, msg: 'initialized' },
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
