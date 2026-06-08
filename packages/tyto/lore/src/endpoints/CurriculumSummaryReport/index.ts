/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const CurriculumSummaryReportEndpointResponses = {
  get: {
    success: () => {
      return {
        results: {
          curriculum: [
            {
              activeStatus: 'ocENABLED',
              curriculumID: 1234,
              name: 'Test Curriculum',
              statusSummary: [
                {
                  completeStatus: 'ocCOMPLETE',
                  participantCount: 10,
                },
              ],
              type: 'ocBLOCK',
            },
          ],
          graphs: [
            {
              label: 'Test Graph',
              points: [
                {
                  dy: 10,
                  mth: 1,
                  x: 1,
                  yr: 2025,
                },
              ],
            },
            {
              label: 'Test Graph 2',
              points: [
                {
                  dy: 10,
                  mth: 2,
                  x: 1,
                  yr: 2025,
                },
              ],
            },
          ],
          recentMemberCompletions: [
            {
              completeStatus: 'ocCOMPLETE',
              curriculumID: 1234,
              curriculumName: 'Test Curriculum',
              curriculumType: 'ocBLOCK',
              memberID: 1234,
              memberName: 'Test Member',
              memberType: 'ocPERSON',
              registeredDate: '2025-01-01',
              statusDate: '2025-01-01',
              taskID: 0,
            },
          ],
        },
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
