/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const CatalogNewsEndpointResponses = {
  get: {
    success: () => {
      return {
        catalogs: [
          {
            activeStatus: 'ocENABLED',
            catalogID: 1234,
            catalogItemID: 1234,
            catalogItemSubType: 'ocCONTAINER',
            catalogItemType: 'ocCATALOG',
            catalogType: 'ocNEWS',
            childContainers: [],
            childItems: [
              {
                about: {
                  catalogIDs: [1234],
                  bannerImageAsset: null,
                  photoAsset: null,
                  ocType: 'ocNEWS',
                  summary: 'summary',
                  newsType: 'ocITEM2015',
                  newsID: 1234,
                },
                catalogID: 1234,
                description: 'description',
                catalogType: 'ocNEWS',
                parentCatalogID: 1234,
                primaryElementTreeSerialLeft: 1,
                pathName: '\t',
                pathIDs: ',551,',
                thumbnailPath: 'thumbnailPath',
                catalogItemID: 1234,
                catalogItemType: 'ocNEWS',
                catalogItemSubType: 'ocITEM2015',
                hasChange: true,
                hasAdd: true,
                hasDelete: true,
                siblingSeq: 1,
                name: 'Example News Name',
                locID: 1234,
                ocType: 'ocELEMENT',
                domainID: 551,
                outsideID: 'outsideID',
                createdByID: 1503800,
                createdDate: '2024-01-01',
                primaryElementID: 551,
                modifiedByID: 1503800,
                modifiedDate: '2024-01-01',
                activeStatus: 'ocENABLED',
              },
            ],
            createdByID: 1503800,
            createdDate: '2024-01-01',
            description: 'description',
            domainID: 551,
            hasAdd: true,
            hasChange: true,
            hasDelete: true,
            images: [],
            locID: 1234,
            modifiedByID: 1503800,
            modifiedDate: '2024-01-01',
            name: 'Breaking',
            ocType: 'ocELEMENT',
            outsideID: 'outsideID',
            parentCatalogID: 1234,
            pathIDs: ',1234,',
            pathName: '\t',
            primaryElementID: 551,
            primaryElementTreeSerialLeft: 1,
            siblingSeq: 1,
            thumbnailPath: 'thumbnailPath',
          },
        ],
        primaryElements: [
          {
            teamID: 551,
            subDomainParentNamePath: '\t',
            parentNamePath: '\t',
            teamName: 'Cherry',
            iPath: ',551,',
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
