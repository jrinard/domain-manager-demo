/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const RobotAccountEndpointResponses = {
  put: {
    success: () => {
      return {
        recordsAffected: -1,
        error: {
          sts: 0,
          msg: 'initialized',
        },
      }
    },
  },
  post: {
    success: () => {
      return {
        newUserID: 1234,
        error: {
          sts: 0,
          msg: 'initialized',
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
