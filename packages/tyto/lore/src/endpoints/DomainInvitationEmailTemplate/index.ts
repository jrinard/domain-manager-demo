/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const DomainInvitationEmailTemplateEndpointResponses = {
  get: {
    success: () => {
      return {
        template: {
          autoMailURI: 'noReply@cherry.mocaworksmail.com',
          contactEmail: 'ewhite@knowledgevault.com',
          contactName: 'Support',
          contactPhone: '(888) 428-0408',
          domainID: 551,
          inviteMessage: '',
          inviteSubject: '',
          isSingleSignOn: false,
          loginDomainID: 'cherry',
          loginNameLabel: 'Login Name',
          onCourseURL: 'https://cherry.mocaworks.com',
          otherName: 'Knowledge Vault',
        },
        links: [],
        error: {
          logID: -1,
          sts: 0,
          msg: '',
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
