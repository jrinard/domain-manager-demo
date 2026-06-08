/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const RobotAccountsEndpointResponses = {
  get: {
    success: () => {
      return {
        robotAccounts: [
          {
            userID: 1234,
            givenName: 'John',
            familyName: 'Doe',
            roleID: 808,
            nativeLanguage: 'en',
            company: 'openai',
            jobTitle: 'test',
            experience: 'Exam_Evaluation',
            outsideType: '',
            outsideID: '',
            pwRedacted: '******',
            bio: 'test',
            personal1: '',
            personal2: '',
            personal3: '',
            personal4: '',
            createdDate: '2024-01-01',
            createdByID: 1234,
            modifiedDate: '2024-01-01',
            modifiedByID: 1234,
            domainID: 1234,
            domain: {
              otherName: 'test',
              onCourseURL: 'test',
            },
            primaryTeam: {
              teamName: 'test',
              subDomainParentNamePath: '\tCherry\ttest\t',
            },
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
