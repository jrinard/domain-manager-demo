/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const PersonProfilePhotoEndpointResponses = {
  success: () => {
    return {
      url: 'https://testhost.mocaworks.local/tyto/api/Person/ProfilePhoto?personID=123&silhouette=dark',
    }
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
