/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const DomainUIImageEndpointResponses = {
  delete: {
    success: () => {
      return {
        recordsAffected: 1,
        session: {
          userID: 1960713,
          userName: 'Joshua Rinard',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
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
