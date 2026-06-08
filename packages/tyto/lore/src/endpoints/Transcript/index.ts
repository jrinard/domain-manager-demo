/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const TranscriptEndpointResponses = {
  success: () => {
    return {
      Transcript: [
        {
          userID: 1960713,
          familyName: 'Rinard',
          givenName: 'Joshua',
          isEnrolled: true,
          isRegistered: true,
          completeStatus: 'ocCOMPLETE',
          curriculumName: "Oca's Test Course",
          curriculumType: 'ocBLOCK',
          passStatus: 'ocVACANT',
          score: 0,
          isCredit: 0,
          creditUnitDesc: '',
          creditUnits: 0,
          approvalCode: '',
          lastDate: '2023-10-23T20:27:26.667+00:00',
          registeredDate: '2022-08-12T12:21:02.293+00:00',
          curriculumID: 15522,
          completedDate: '2023-10-23T20:27:26.667+00:00',
          elementName: '',
          blockExpirationDate: '1900-01-01T00:00:00+00:00',
          activeStatus: 'ocENABLED',
          blockActiveStatus: 'ocENABLED',
          memberName: 'Joshua Rinard',
        },
        {
          userID: 1960713,
          familyName: 'Rinard',
          givenName: 'Joshua',
          isEnrolled: true,
          isRegistered: true,
          completeStatus: 'ocCOMPLETE',
          curriculumName: 'Spacedock',
          curriculumType: 'ocBLOCK',
          passStatus: 'ocVACANT',
          score: 0,
          isCredit: 0,
          creditUnitDesc: '',
          creditUnits: 0,
          approvalCode: '',
          lastDate: '2023-10-18T22:45:00.963+00:00',
          registeredDate: '2023-10-11T17:38:28.707+00:00',
          curriculumID: 2262102,
          completedDate: '2023-10-18T22:45:00.963+00:00',
          elementName: '',
          blockExpirationDate: '1900-01-01T00:00:00+00:00',
          activeStatus: 'ocENABLED',
          blockActiveStatus: 'ocENABLED',
          memberName: 'Joshua Rinard',
        },
      ],
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
