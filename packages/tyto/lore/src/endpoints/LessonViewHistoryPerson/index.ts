/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const LessonViewHistoryPersonEndpointResponses = {
  get: {
    success: () => {
      return {
        history: [
          {
            viewSessionCount: 1,
            viewPageCount: 1,
            minHistDateUTC: '2021-01-01',
            maxHistDateUTC: '2021-01-01',
            personID: 1,
            givenName: 'John',
            familyName: 'Doe',
            lessonID: 1,
            itemType: 'lesson',
            lessonName: 'Lesson 1',
            assetID: 1,
            assetType: 'lesson',
          },
        ],
        data: [],
        links: [],
        error: null,
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
