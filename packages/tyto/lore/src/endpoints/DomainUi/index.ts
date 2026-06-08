/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const DomainUIEndpointResponses = {
  get: {
    success: () => {
      return {
        domainUI: {
          domainID: 551,
          onCourseURL: 'https://cherry.mocaworks.com',
          loginDomainID: 'cherry',
          otherName: 'Knowledge Vault',
          loginURI: '',
          showKeepMeLoggedIn: true,
          forgotPWLabel: 'Forgot Password?',
          forgotPwURI: '/v2/user/email_register.asp',
          activateAccountLabel: '',
          activateAccountURI: '',
          loginNameLabel: 'Login Name',
          isSingleSignOn: false,
          contactName: 'Support',
          contactEmail: 'ewhite@knowledgevault.com',
          contactPhone: '(888) 428-0408',
          taglineLabel: 'Knowledge Vault',
          images: [],
          keyValues: [],
        },
      }
    },
  },
  put: {
    success: () => {
      return {
        uiImages: [],
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
