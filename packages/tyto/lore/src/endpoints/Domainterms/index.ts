export const DomaintermsEndpointResponses = {
  success: () => {
    return {
      policy: {
        PolicyID: 259,
        domainID: 2365525,
        language: '',
        PolicyText: 'Test Terms of TOS',
        createdUser: 2043811,
        createdDate: '2023-11-14T22:34:49.487',
        modifiedUser: 1960713,
        modifiedDate: '2024-07-19T18:52:56.053',
      },
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
