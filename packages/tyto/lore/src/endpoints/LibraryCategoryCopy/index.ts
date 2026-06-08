/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const LibraryCategoryCopyEndpointResponses = {
  post: {
    success: () => {
      return {
        result: {
          libraryCategoryID: 1234,
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
