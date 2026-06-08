/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const LibraryCategoryIconEndpointResponses = {
  post: {
    success: () => {
      return {
        imageID: 1234,
      }
    },
  },
  delete: {
    success: () => {
      return {
        recordsAffected: 1,
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
