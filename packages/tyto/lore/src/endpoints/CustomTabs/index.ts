/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const CustomTabsEndpointResponses = {
  get: {
    success: () => {
      return {
        tabs: [
          {
            traitID: 922,
            name: 'Test Tab',
            domainID: 2365525,
            seq: 0,
            methodType: 'ocVACANT',
            destinationURI: 'www.google.com',
            navigationTarget: '_blank',
            menuItemDescription: 'google',
            menuItemKeyPhrases: [''],
          },
          {
            traitID: 919,
            name: 'Test Tab 1',
            domainID: 2365525,
            seq: 0,
            iconUrl: '/v2/domains/2365525/traitIcons/trait919_hhselfiv.png',
            iconUrlLarge:
              '/v2/domains/2365525/traitIcons/traitLrg919_0te4bk1r.png',
            iconPathFull:
              '/v2/domains/2365525/traitIcons/trait919_hhselfiv.png',
            methodType: 'ocVACANT',
            destinationURI: 'www.google.com',
            navigationTarget: '_blank',
            menuItemDescription: 'google',
            menuItemKeyPhrases: [''],
          },
          {
            traitID: 921,
            name: 'Test Tab 2',
            domainID: 2365525,
            seq: 0,
            methodType: 'ocVACANT',
            destinationURI: 'www.google.com',
            navigationTarget: '_blank',
            menuItemDescription: 'google',
            menuItemKeyPhrases: [''],
          },
        ],
        session: {
          userID: 2043811,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2023-11-29T21:34:31.727+00:00',
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
          msg: '',
        },
        links: [
          {
            encType: 'application/json',
            contentType: 'application/json',
            href: 'api/person/customTab',
            media: '',
            method: 'post',
            targetPref: '',
            title: 'Add Menu Item to Person',
            parameters: [
              {
                paramName: 'traitID',
                paramType: 'int',
                functionParamMap: 'tabs[].traitID',
              },
            ],
            rel: ['http://kvau.lt/api/person/customtab+add'],
          },
          {
            encType: 'application/json',
            contentType: 'application/json',
            href: 'api/team/customTab',
            media: '',
            method: 'post',
            targetPref: '',
            title: 'Add Menu Item to Team',
            parameters: [
              {
                paramName: 'traitID',
                paramType: 'int',
                functionParamMap: 'tabs[].traitID',
              },
            ],
            rel: ['http://kvau.lt/api/team/customtab+add'],
          },
          {
            encType: 'application/json',
            contentType: 'application/json',
            href: 'api/customTab',
            media: '',
            method: 'post',
            targetPref: '',
            title: 'Add Menu Item',
            parameters: [],
            rel: ['http://kvau.lt/api/customtab+add'],
          },
          {
            encType: 'application/json',
            contentType: 'application/json',
            href: 'api/customTab',
            media: '',
            method: 'put',
            targetPref: '',
            title: 'Change Menu Item',
            parameters: [],
            rel: ['http://kvau.lt/api/customtab+change'],
          },
          {
            encType: 'application/json',
            contentType: 'application/json',
            href: 'api/customTab',
            media: '',
            method: 'delete',
            targetPref: '',
            title: 'Delete Menu Item',
            parameters: [],
            rel: ['http://kvau.lt/api/customtab+delete'],
          },
          {
            encType: 'application/x-www-form-urlencoded',
            contentType: 'text/plain',
            href: 'api/CustomTab/certificate/export',
            media: '',
            method: 'get',
            targetPref: '',
            title: 'Export Certificate',
            parameters: [
              {
                paramName: 'certGUID',
                paramType: 'guid',
                functionParamMap: 'tabs[].ssoCert.certGUID',
              },
            ],
            rel: ['http://kvau.lt/api/encryptioncertificate+get'],
          },
          {
            encType: 'application/x-www-form-urlencoded',
            contentType: 'text/xml',
            href: 'api/saml/meta/entity/{certGUID}',
            media: '',
            method: 'get',
            targetPref: '',
            title: 'SAML Meta Entity',
            parameters: [
              {
                paramName: 'certGUID',
                paramType: 'guid',
                functionParamMap: 'tabs[].ssoCert.certGUID',
              },
            ],
            rel: ['http://kvau.lt/api/samlmetaentity+get'],
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
