export const PersonAbsenceEndpointResponses = {
  get: {
    success: () => {
      return {
        personAbsences: [
          {
            startTimeUTC: '2022-05-28T13:00:00Z',
            endTimeUTC: '2022-06-06T04:16:00Z',
            timeZoneNameGeneral: 'US-Central',
            message: '',
            modifiedDateUTC: '2022-05-23T16:17:01.64Z',
            modifiedByID: 2043811,
            startTime: '2022-05-28T08:00:00-05:00',
            endTime: '2022-06-05T23:16:00-05:00',
          },
        ],
        session: {
          userID: 2043811,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2024-01-16T16:07:48.23+00:00',
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
        iCalUID: '0E938EDC-F683-4F5F-B33B-0A70D38B9E75',
        session: {
          userID: 2043811,
          userName: 'Johann Loch',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2024-01-16T16:07:48.23+00:00',
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
