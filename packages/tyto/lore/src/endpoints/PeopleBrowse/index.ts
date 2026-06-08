/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const PeopleBrowseEndpointResponses = {
  get: {
    success: () => {
      return {
        people: [
          {
            userID: 1234,
            teamMemberships: [
              {
                teamID: 1234,
              },
            ],
          },
        ],
      }
    },
  },
  invalidPresentArguments: (propName: string) => {
    return {
      data: [],
      links: [],
      error: {
        logID: -1,
        sts: -1000,
        msg: `validation error: extra arguments found (${propName})`,
        technical: `This endpoint does not accept any arguments (apart from sessionKey)`,
      },
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
