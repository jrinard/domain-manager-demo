/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const DomainUIConfigurationsEndpointResponses = {
  get: {
    success: () => {
      return {
        UIConfigurations: [],
        error: {
          logID: -1,
          sts: 200,
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
