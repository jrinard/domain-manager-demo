import type { LibraryTeamFeatured } from '@tyto/query'

/**
 * Mock data for Featured Content section in edit/mock mode
 * Based on real API response structure
 */
export const getMockFeaturedContentData = (): LibraryTeamFeatured[] => {
  return [
    {
      aboutName: 'Snickers',
      aboutType: 'ocLESSON',
      memberID: 19920,
      teamPathIDs: ',551,',
      subDomainTeamPathName: '\t',
      aboutID: 1555021,
      lib_modifiedDate: '2025-07-01T23:09:16.453+00:00',
      parentCatID: 0,
      categoryPathNames: 'Mocaworks Development (team)\t',
      assets: [
        {
          assetID: 1555022,
          assetName: 'caturday-shutterstock_149320799.jpg',
          assetDesc: '',
          assetType: 'ocPhoto',
          encodings: [
            {
              encodingType: 'ocDEFAULT',
              pathURL: '/viewAsset/?eid=1555022&encoding=ocDEFAULT',
              mimeType: 'image/jpeg',
              activeStatus: 'ocENABLED',
            },
            {
              encodingType: 'ocTHUMBNAIL',
              pathURL: '/v2/domains/551/assets/1555021_42xllis0nxu_th.jpg',
              mimeType: 'image/jpeg',
              activeStatus: 'ocENABLED',
            },
          ],
        },
      ],
    },
    {
      aboutName: 'New Hire Guide',
      aboutType: 'ocLIBCAT',
      memberID: 126909,
      teamPathIDs: ',551,4648,',
      subDomainTeamPathName: '\tOld Avengers Team\t',
      aboutID: 77030,
      lib_modifiedDate: '2023-12-13T00:24:50.227+00:00',
      parentCatID: 0,
      thumbnailPath: '/v2/images/icons/folder_blue_64px.png',
      categoryPathNames: 'Content Test Team (team)\t',
      thumbOverimage: {
        pathURL: '/v2/domains/551/assets/profilePhotos/126909_fhp2duno4mf.png',
        height: 274,
        width: 338,
        imageID: 2390168,
        imageSubType: 'ocLibCatIcon',
        imageName: 'Default Image',
      },
    },
    {
      aboutName: 'Sales Guide',
      aboutType: 'ocLESSON',
      memberID: 1672794,
      teamPathIDs: ',551,',
      subDomainTeamPathName: '\t',
      aboutID: 1682724,
      lib_modifiedDate: '2019-02-27T11:12:39.63+00:00',
      parentCatID: 49615,
      categoryPathNames: 'Baker (project team)\tApplication\t',
      assets: [
        {
          assetID: 1683051,
          assetName: 'Sales Guide',
          assetDesc: '',
          assetType: 'ocQuickDoc',
          encodings: [
            {
              encodingType: 'ocDEFAULT',
              pathURL: '/viewAsset/?eid=1683051&encoding=ocDEFAULT',
              mimeType: 'text/html',
              activeStatus: 'ocENABLED',
            },
          ],
        },
      ],
    },
    {
      aboutName: 'Annual Conference Guide',
      aboutType: 'ocLESSON',
      memberID: 501867,
      teamPathIDs: ',551,4648,9952,9953,501865,',
      subDomainTeamPathName: '\tOld Avengers Team\tLower than Avengers!\tunderitAll\tFront End Dev\t',
      aboutID: 281800,
      lib_modifiedDate: '2017-01-30T15:47:06.65+00:00',
      parentCatID: 42388,
      categoryPathNames: 'Articles, etc. (team)\tJS\tBlue Folder\t',
      assets: [
        {
          assetID: 281801,
          assetName: 'Annual Conference Guide.docx',
          assetDesc: 'Annual Conference Guide',
          assetType: 'ocWord',
          encodings: [
            {
              encodingType: 'ocTHUMBNAIL',
              pathURL: '/v2/domains/551/assets/281800_rad1B1D2.docx_th.jpg',
              mimeType: 'imgage/jpeg',
              activeStatus: 'ocENABLED',
            },
          ],
        },
      ],
    },
    {
      aboutName: 'Employee Handbook',
      aboutType: 'ocLESSON',
      memberID: 451059,
      teamPathIDs: ',551,',
      subDomainTeamPathName: '\t',
      aboutID: 453541,
      lib_modifiedDate: '2014-02-25T11:29:23.9+00:00',
      parentCatID: 0,
      categoryPathNames: 'Office Plugin Project (team)\t',
      assets: [
        {
          assetID: 453542,
          assetName: 'Employee Handbook.pdf',
          assetDesc: 'Employee Handbook',
          assetType: 'ocFile',
        },
      ],
    },
    {
      aboutName: 'New Text Document.txt',
      aboutType: 'ocLESSON',
      memberID: 4648,
      teamPathIDs: ',551,',
      subDomainTeamPathName: '\t',
      aboutID: 373693,
      lib_modifiedDate: '2014-02-12T11:19:50.48+00:00',
      parentCatID: 0,
      categoryPathNames: 'Old Avengers Team (team)\t',
      assets: [
        {
          assetID: 383600,
          assetName: 'New Text Document.txt',
          assetDesc: 'New Text Document',
          assetType: 'ocDoc',
        },
      ],
    },
  ]
}
