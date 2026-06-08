/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TeamBannersEndpointResponses = {
  get: {
    success: () => {
      return {
        banners: [
          {
            isAbove: true,
            isBelow: false,
            isDirect: true,
            teamID: 551,
            assetID: 425278,
            height: 184,
            width: 920,
            assetPathUrl: '/v2/domains/551/assets/551_rad82B3E_920px.jpg',
            seq: 1,
            imageMaps: [
              {
                htmlBlob:
                  '<area data-element=\'{"eID":1914446,"eType":"Link","eName":"http:///v25/nl/#/mytodos","eIconPath":"https://leia.mocaworks.com/v25/images/icons/elementType/ocLESSON/ocLink_64px.png"}\' shape="rect" coords="0,0,900,180" target="_blank" href="/viewasset/?eid=1914446&sessionKey=CJ7TMCZGM0LRKD0Z5PYNJTLJB66WGXN396GJ3QFBDVWYLZD8ZJBN4ZL449TLYVCW" />',
              },
            ],
            mimeType: 'image/jpeg',
          },
          {
            isAbove: true,
            isBelow: false,
            isDirect: true,
            teamID: 551,
            assetID: 2051302,
            height: 180,
            width: 990,
            assetPathUrl: '/v2/domains/551/assets/551_htuphkzs35k_9200px.jpg',
            seq: 66,
            imageMaps: [],
            mimeType: 'image/jpeg',
          },
          {
            isAbove: false,
            isBelow: true,
            isDirect: false,
            teamID: 1964196,
            assetID: 1966161,
            height: 175,
            width: 900,
            assetPathUrl:
              '/v2/domains/1825957/assets/1964196_m5typ2fs1cx_9200px.jpg',
            seq: 1,
            imageMaps: [
              {
                eID: 1966168,
                href: '/viewasset/?eid=1966168',
                shape: 'rect',
                target: '_blank',
                coords: '0,0,900,180',
                htmlBlob:
                  '<area data-element=\'{"eID":1966168,"eType":"ocURL","eName":"Build an Empire Mastermind with Elena Cardone","eIconPath":""}\' shape="rect" coords="0,0,900,180" target="_blank" href="/viewasset/?eid=1966168">',
              },
            ],
            mimeType: 'image/jpeg',
          },
          {
            isAbove: false,
            isBelow: true,
            isDirect: false,
            teamID: 1815198,
            assetID: 2241004,
            height: 180,
            width: 990,
            assetPathUrl:
              '/v2/domains/1698652/assets/1815198_qmzmru4w31k_9200px.jpg',
            seq: 1,
            imageMaps: [
              {
                eID: 2245165,
                href: '#',
                shape: 'rect',
                target: '',
                coords: '0,0,990,180',
                htmlBlob:
                  '<area data-element=\'{"eID":2245165,"eType":"ocDOCUMENT","eName":"","eIconPath":""}\' shape="rect" href="#" coords="0,0,990,180" onclick="viewer = new SuperViewer(2245165)">',
              },
            ],
            mimeType: 'image/jpeg',
          },
        ],
        session: {
          userID: 1960713,
          userName: 'Joshua Rinard',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2023-12-19T19:36:02.927+00:00',
          domainID: 551,
          timeOutMnts: 129600,
          onCourseURL: 'https://cherry.mocaworks.com',
          profileThumbPath:
            '/v2/domains/551/assets/1960713_tsc3eykcizn_200px.jpg',
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
