/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TeamDefaultEnrollmentEndpointResponses = {
  delete: {
    success: () => {
      return {
        recordsAffected: -1,
        data: [],
        links: [],
        error: {
          logID: -1,
          sts: 0,
          msg: 'success',
          technical: 'success',
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
