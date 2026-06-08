/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const IdentityProvidersEndpointResponses = {
  get: {
    success: () => {
      return {
        identityProviders: [
          {
            identityProviderGUID: 'fake_string',
            name: 'fake_string',
            protocol: 'ABlainCI',
            developerEmail: 'fake_string@fake.local',
            htmlStyle: 'fake_string',
            onCourseURL: 'https://testing.mocaworks.com',
            entityID: 'fake_string',
            isAuthorizationProvider: false,
          },
        ],
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
