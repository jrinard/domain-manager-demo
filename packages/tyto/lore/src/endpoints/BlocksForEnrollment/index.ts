/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const BlocksForEnrollmentEndpointResponses = {
  get: {
    success: () => {
      return {
        result: {
          blocks: [],
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
