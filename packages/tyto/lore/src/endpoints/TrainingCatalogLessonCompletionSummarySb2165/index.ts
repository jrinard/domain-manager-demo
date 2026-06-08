/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TrainingCatalogLessonCompletionSummarySb2165EndpointResponses = {
  get: {
    success: () => {
      return {
        TrainingCatalogLessonCompletionSummary_SB2165: [
          {
            catalog_seq: 1234,
            rootMainTitle: 'Test Root Main Title',
            rootBlockID: 1234,
            lessonTypeStatusSummary: [
              {
                itemType: 'ocVIDEO',
                count_ocCOMPLETE: 3,
                count_ocINCOMPLETE: 12,
                count_ocNOTSTARTED: 4,
              },
              {
                itemType: 'ocVIDEO',
                count_ocCOMPLETE: 7,
                count_ocINCOMPLETE: 9,
                count_ocNOTSTARTED: 0,
              },
              {
                itemType: 'ocVIDEO',
                count_ocCOMPLETE: 0,
                count_ocINCOMPLETE: 0,
                count_ocNOTSTARTED: 24,
              },
            ],
          },
        ],
        teamName: 'Test Team',
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
