export const LoginTOSEndpointResponses = {
  success: () => {
    return {
      termsOfService: 'Test Terms of Service',
      error: {
        sts: 0,
        msg: '',
      },
      links: [],
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
