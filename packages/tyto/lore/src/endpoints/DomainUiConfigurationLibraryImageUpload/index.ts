/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const DomainUIConfigurationLibraryImageUploadEndpointResponses = {
  post: {
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
