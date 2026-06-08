export const TimeZoneEndpointResponses = {
  success: () => {
    return {
      timeZones: [
        {
          timeZoneID: 30,
          nameGeneral: 'NZ-New Zealand',
          iCalTZID: 'Pacific/Auckland',
          nameObserved: 'NZST',
          observanceType: 'ocSTANDARD',
          modifiedDateUTC: '2023-09-22T16:54:16.683Z',
          iCalTZURL: 'https://www.iana.org/time-zones',
          startDate: '2008-04-06T03:00:00',
          offSetToMinutes: 780,
          offSetFromMinutes: 720,
          iCalRRule: 'FREQ=YEARLY;WKST=MO;INTERVAL=1;BYMONTH=4;BYDAY=1SU',
          filterDateTimeOffset: '2025-09-08T18:11:41.204+13:00',
        },
        {
          timeZoneID: 1,
          nameGeneral: 'Default 00',
          iCalTZID: 'Factory',
          nameObserved: 'UTC',
          observanceType: 'ocCONSTANT',
          modifiedDateUTC: '2023-09-22T16:54:19.527Z',
          iCalTZURL: 'https://www.iana.org/time-zones',
          startDate: '2009-05-17T00:00:00',
          offSetToMinutes: 0,
          offSetFromMinutes: 0,
          iCalRRule: '',
          filterDateTimeOffset: '2025-09-08T18:11:41.204+00:00',
        },
      ],
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
