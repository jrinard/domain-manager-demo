/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const CurriculumSubcomponentSummaryReportEndpointResponses = {
  get: {
    success: () => {
      return {
        results: {
          totalParticipants: 10,
          curriculumID: 1234,
          curriculumName: 'Test Curriculum',
          curriculumType: 'ocBLOCK',
          steps: [],
        },
      }
    },
  },
  post: {
    success: () => {
      return {
        results: {
          totalParticipants: 10,
          curriculumID: 1234,
          curriculumName: 'Test Curriculum',
          curriculumType: 'ocBLOCK',
          steps: [],
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
