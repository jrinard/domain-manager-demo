/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const EnrollmentHistoryEndpointResponses = {
  success: () => {
    return {
      enrollmentHistory: [
        {
          enrollmentHistoryID: 37892019,
          memberID: 1577139,
          curriculumID: 2056640,
          activeStatus: 'ocENABLED',
          completeStatus: 'ocNOTATTEMPTED',
          completedDate: '1900-01-01T00:00:00-08:00',
          passStatus: 'ocVACANT',
          score: 0,
          cummAttempts: 0,
          cummTime: '1900-01-01T00:00:00-08:00',
          sessionTime: '1900-01-01T00:00:00-08:00',
          lastDate: '2023-04-05T14:52:09.563-07:00',
          entryMode: 'ocNORMAL',
          launchBehavior: 'ocSEQUENTIAL',
          isEnrolled: true,
          enrolledDate: '2023-04-05T14:52:09.563-07:00',
          isRegistered: true,
          registeredDate: '2023-04-05T14:52:09.563-07:00',
          isLaunchable: false,
          isPaid: false,
          paidDate: '1900-01-01T00:00:00-08:00',
          mentorID: 0,
          comment: '',
          verifiedUserID: 0,
          prerequisiteID: 0,
          enrollmentID: 7629136,
          creditID: 0,
          enrollmentHistoryDate: '2023-04-05T14:55:02.75-07:00',
          location: '',
          registeredBy: 1960713,
          recertDate: '1900-01-01T00:00:00-08:00',
          bookMark: '',
        },
      ],
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
