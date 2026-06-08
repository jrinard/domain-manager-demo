export const EnrollmentCurriculumCompleteJobsEndpointResponses = {
  success: () => {
    return {
      curriculumCompleteJobs: [
        {
          curriculumCompleteJobID: 65,
          jobName: '2N Systems - 10X week 1-5',
          createdByID: 1960713,
          createdDate: '2025-02-03T21:46:12.877+00:00',
          notifyParticipants: false,
          discardEnrollmentBeforeDate: '1900-01-01T00:00:00+00:00',
          completeAsOfDate: '1900-01-01T00:00:00+00:00',
          estimatedEnrollmentCount: 609,
          execDate: '2025-02-03T22:00:20.097+00:00',
          execResult: 0,
          actualEnrollmentCount: 319,
        },
        {
          curriculumCompleteJobID: 34,
          jobName: '24DF412F-B67E-451E-9C6C-018D40BA469B',
          createdByID: 1960713,
          createdDate: '2024-11-14T17:12:56.11+00:00',
          notifyParticipants: false,
          discardEnrollmentBeforeDate: '1900-01-01T00:00:00+00:00',
          completeAsOfDate: '1900-01-01T00:00:00+00:00',
          estimatedEnrollmentCount: 5,
          execDate: '2024-11-15T08:22:27.177+00:00',
          execResult: 1,
          actualEnrollmentCount: 0,
        },
      ],
      session: {
        userID: 2043811,
        userName: 'Clark Kent',
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
