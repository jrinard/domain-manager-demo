/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TrainingSummaryEndpointResponses = {
  get: {
    success: () => {
      return {
        trainingSummary: [
          {
            curriculumActivityDate: '2024-07-17T18:14:37.51+00:00',
            curriculumID: 2299250,
            curriculumTitle: 'Test Exam',
            email: 'tester@fake.local',
            inclusiveCatalogID: 0,
            inclusiveCatalogName: 'ANY',
            inclusiveCurriculumTitle:
              'REVIEW | Coaching Employees Using Feedback',
            inclusiveLastCurriculumActivityDate: '2024-07-09T13:49:16.78+00:00',
            inclusiveLastCurriculumID: 2054040,
            inclusivePointsAwardedExamsAttempted: 0,
            inclusivePointsExamsAttempted: 0,
            inclusiveVideoCount: 0,
            inclusivecountDistinctExamsPassed: 0,
            inclusivecountDistinctLessonsCompleted: 0,
            inclusivecountExamsAttempted: 0,
            inclusivecountExamsPassed: 0,
            inclusivecountLessonsCompleted: 0,
            lastLogon: '2024-07-17T18:22:02.273+00:00',
            lastSessionActivity: '2024-07-19T20:49:25.337+00:00',
            minutesVidPlayThrough: 0,
            outsideTerminateDate: '1900-01-01T00:00:00+00:00',
            personID: 123456789,
            personName: 'Fake TestUser',
            securityRoleName: 'CV Employees',
            teamRootName: 'Cardone Ventures Team',
            vidPlayCountDistinct: 0,
          },
        ],
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
