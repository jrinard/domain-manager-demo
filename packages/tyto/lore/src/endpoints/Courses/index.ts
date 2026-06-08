/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const CoursesEndpointResponses = {
  success: () => {
    return {
      result: {
        blocks: [
          {
            blockID: 118279,
            courseIdentifier: '',
            teamRoot: 114581,
            expirationDate: '1900-01-01T00:00:00-08:00',
            hasChangeAccess: true,
            hasDeleteAccess: true,
            isContainerUnit: false,
            countRequisite: 1,
            internalTitle: '',
            name: 'Intel Xeon',
            locID: 118279,
            ocType: 'ocBLOCK',
            elementID: 118279,
            elementName: 'Intel Xeon',
            elementDesc: '',
            elementType: 'ocBLOCK',
            elementSubType: 'ocITEM',
            domainID: 114581,
            outsideID: '',
            createdByID: 114603,
            createdDate: '2011-08-19T15:54:36.04-07:00',
            primaryElementID: 114581,
            modifiedByID: 114603,
            modifiedDate: '2011-08-19T15:54:59.153-07:00',
            shareChangedDate: '2012-09-17T16:51:56.553-07:00',
            shareChangedByID: 0,
            activeStatus: 'ocENABLED',
          },
          {
            blockID: 179361,
            courseIdentifier: '',
            teamRoot: 149643,
            expirationDate: '1900-01-01T00:00:00-08:00',
            hasChangeAccess: true,
            hasDeleteAccess: true,
            isContainerUnit: false,
            countRequisite: 2,
            internalTitle: '',
            name: 'WebPT: Adding Procedure Codes in RevFlow',
            locID: 179361,
            ocType: 'ocBLOCK',
            elementID: 179361,
            elementName: 'WebPT: Adding Procedure Codes in RevFlow',
            elementDesc: 'To correctly add Procedure codes in RevFlow',
            elementType: 'ocBLOCK',
            elementSubType: 'ocITEM',
            domainID: 149643,
            outsideID: '',
            createdByID: 154383,
            createdDate: '2012-06-06T09:51:26.697-07:00',
            primaryElementID: 149643,
            modifiedByID: 154383,
            modifiedDate: '2019-10-04T15:54:46.483-07:00',
            shareChangedDate: '2012-09-17T16:51:56.553-07:00',
            shareChangedByID: 0,
            activeStatus: 'ocENABLED',
          },
        ],
        authors: [
          {
            elementID: 2,
            elementName: 'Oca Hoeflein',
            activeStatus: 'ocENABLED',
            elementType: 'ocPERSON',
          },
          {
            elementID: 551,
            elementName: 'Knowledge Vault',
            activeStatus: 'ocENABLED',
            elementType: 'ocTEAM',
          },
        ],
      },
      session: {
        adminID: 0,
        changePassword: false,
        domainID: 551,
        koPermissionSyncDate: '2023-09-29T15:25:54.27+00:00',
        onCourseURL: 'https://cherry.mocaworks.com',
        onlinePreference: 'ocHIDDEN',
        profileThumbPath:
          '/v2/domains/551/assets/1960713_tsc3eykcizn_200px.jpg',
        roleID: 1,
        teamRootID: 551,
        teamListSyncDate: '1900-01-01T00:00:00+00:00',
        termsOfServiceSignatureRequired: false,
        timeOutMnts: 129600,
        userID: 1960713,
        userName: 'Joshua Rinard',
      },
      error: {
        sts: 0,
        msg: 'initialized',
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
