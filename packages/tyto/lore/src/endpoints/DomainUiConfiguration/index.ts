/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const DomainUIConfigurationEndpointResponses = {
  get: {
    success: () => {
      return {
        UIConfiguration: {},
        error: {
          logID: -1,
          sts: -1000,
          msg: 'initialized',
          technical: '',
        },
      }
    },
  },
  post: {
    success: () => {
      return {
        recordsAffected: -1,
        configName: '',
        UIconfigGUID: '',
        lastModifiedOfstDate: '',
        error: {
          logID: -1,
          sts: -1000,
          msg: 'initialized',
          technical: '',
        },
      }
    },
  },
  put: {
    success: () => {
      return {
        recordsAffected: -1,
        error: {
          logID: -1,
          sts: -1000,
          msg: 'initialized',
          technical: '',
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
