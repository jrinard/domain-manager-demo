/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const PersonOutsideIdentityAllEndpointResponses = {
  get: {
    success: () => {
      return {
        outsideIdentity: [
          {
            personID: 1234,
            identityProviderGUID: 'guid',
            outsideID: 'id',
            assertions: 'assertions',
            assertionMD5: 'md5',
            lastLoginDateUTC: new Date().toISOString(),
            createdDateUTC: new Date().toISOString(),
          },
        ],
      }
    },
  },
  invalidMissingRequired: (propName: string) => {
    return {
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
