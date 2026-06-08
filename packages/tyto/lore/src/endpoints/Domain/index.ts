export const DomainEndpointResponses = {
  get: {
    success: () => {
      return {
        domain: {
          domainID: 551,
          onCourseURL: 'https://cherry.mocaworks.com',
          personEditURL: '/v2/user/editmyAccount.asp',
          labelPersonal1: 'Favorite Activities...',
          labelPersonal2: 'Job Skills',
          labelPersonal3: 'Favorite Quotes',
          labelPersonal4: 'Favorite Books',
          certificateAssetID: 0,
          loginDomainID: 'cherry',
          otherName: 'Knowledge Vault',
          defaultRoleID: 770,
          autoMailURI: 'noReply@cherry.mocaworksmail.com',
          portalURI: 'Additional Features\t',
          outsideTeamTypes:
            '\t1T\t2Ts\tAvenger\tchangelogType\tComics\tfacility\tFED\tMay Day\tThe Best Ever\tTop',
          passwordExpiresDays: 0,
          loginURI: '',
          logoutURI: '',
          achievementIconAlbumID: 0,
          showKeepMeLoggedIn: true,
          forgotPWLabel: 'Forgot Password?',
          forgotPWURI: '/v2/user/email_register.asp',
          activateAccountLabel: '',
          activateAccountURI: '',
          inviteMessage: '',
          inviteSubject: '',
          generalMessage: '',
          generalSubject: '',
          loginNameLabel: 'Login Name',
          isSingleSignOn: false,
          emailNoticeScreen: 'ocDISABLED',
          skinPath: '',
          contactName: 'Support',
          contactEmail: 'ewhite@knowledgevault.com',
          contactPhone: '(888) 428-0408',
          pkApiAuthID: 9,
          expectationDescLabel: 'Expectation',
          audienceDescLabel: 'Audience',
          difficultyDescLabel: 'Difficulty',
          outsideJoinDateLabel: 'Member Since',
          domainType: 'ocKVAULT',
          ttChartVersion: 'ocBAR',
          ttSpoilerMode: 'ocVACANT',
          ttUrl: 'https://app.teamtools.com',
          ttAutomailUri: 'noreply@teamtools.com',
        },
        session: {
          userID: 2043811,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2023-11-15T17:36:20.313+00:00',
          domainID: 551,
          timeOutMnts: 90,
          onCourseURL: 'https://cherry.mocaworks.com',
          profileThumbPath:
            '/v2/domains/551/assets/2043811_sxuwdy5uwwo_200px.jpg',
          teamRootID: 551,
          roleID: 1,
          onlinePreference: 'ocHIDDEN',
        },
        error: {
          sts: 0,
          msg: 'initialized',
        },
        links: [],
      }
    },
  },
  put: {
    success: () => {
      return {
        recordsAffected: -1,
        session: {
          userID: 1960713,
          userName: 'Joshua Rinard',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00-08:00',
          koPermissionSyncDate: '2024-01-02T11:22:30.897-08:00',
          domainID: 551,
          timeOutMnts: 129600,
          onCourseURL: 'https://oc.mocaworks.com',
          profileThumbPath:
            '/v2/domains/551/assets/1960713_lqzzjhduv2h_200px.jpg',
          teamRootID: 551,
          roleID: 1,
          onlinePreference: 'ocHIDDEN',
        },
        error: {
          sts: 0,
          msg: 'initialized',
        },
        links: [],
      }
    },
  },

  success: () => {
    return {
      recordsAffected: -2,
      domainID: 2365525,
      session: {
        userID: 2043811,
        userName: 'Johann Loch',
        changePassword: false,
        termsOfServiceSignatureRequired: false,
        adminID: 0,
        teamListSyncDate: '1900-01-01T00:00:00+00:00',
        koPermissionSyncDate: '2023-11-14T00:28:15.823+00:00',
        domainID: 551,
        timeOutMnts: 90,
        onCourseURL: 'https://cherry.mocaworks.com',
        profileThumbPath:
          '/v2/domains/551/assets/2043811_sxuwdy5uwwo_200px.jpg',
        teamRootID: 551,
        roleID: 1,
        onlinePreference: 'ocHIDDEN',
      },
      error: {
        sts: 0,
        msg: 'initialized',
      },
      links: [],
    }
  },
  /**
   * To populate this please run
   * px g @tyto/scribe:postman
   */

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
