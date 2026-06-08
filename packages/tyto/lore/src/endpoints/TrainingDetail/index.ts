/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TrainingDetailEndpointResponses = {
  get: {
    success: () => {
      return {
        trainingSummary: [
          {
            memberID: 1234,
            blockID: 1234,
            blockName: 'Test Block',
            preReqID: 1234,
            curriculumID: 1234,
            cType: 'ocBLOCK',
            cSubType: 'ocITEM',
            stepName: 'Test Step',
            cntAttempts: 1,
            minutesVidPlayThrough: 10,
            passStatus: 'ocPASS',
            completeStatus: 'ocCOMPLETE',
            completedDate: '2024-01-01',
            lastDate: '2024-01-01',
          },
        ],
        daysActive: 30,
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
