/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const PeopleSearchEndpointResponses = {
  success: () => {
    return {
      cmdTimeSpan: '00:00:00',
      people: [
        {
          securityHash:
            'kvv1_0\tNTI1MDExMzcxOTkxNzUyODg1OAlCbG9jayBFbnJvbGwJb2NBREQJa3ZHZXRQZW9wbGUyUmVzcG9uc2UJRFNSUUxSOFBGUFo1R1FRRDdZMjhLNlZffhdjksaFDSAfhjkiTDI0NlM1NzNUVFhYODdZR1FXQ1BKNTAzUglvY1BFUlNPTi8y\tKH7s3QG/xfLjmz74ZfjAXj8zsfbNAaTzGFK+laHTueB0E4AcO06bImtHPXPVDWumePRmhkpYCt87IWyXnwPbdA==',
          personID: 2,
          personName: 'Oca Hoeflein',
          domainName: 'Cherry',
          primaryElementName: 'Old Avengers Team',
          thumbnailPath: '/v2/domains/551/assets/2_ig3rn1ywux3_200px.jpg',
          outsideTerminateDate: '1900-01-01T00:00:00+00:00',
        },
        {
          securityHash:
            'kvv1_0\tNTI1MDExMzcxOTkxNzUyODg1OAlCbG9jayBFbnJvbGwJb2NBREQJa3ZHZXRQZW9wbGUyUcdscy7893NSUUxSOFBGUFo1R1FRRDdZMjhLNlZXVFpRWlhMNFNTNzQxSjhaTDI0NlM1NzNUVFhYODdZR1FXQ1BKNTAzUglvY1BFUlNPTi8xMjI2MjQ=\tE2y5xuQ78urTcnnsazvdUqSR4XjfwixGMs1j8e3KWjRuTGekwFlk8fTmw9/yK/wxM8bb+vbDmvb4/E1RTdH/GA==',
          personID: 122624,
          personName: 'Jay2 kerr',
          domainName: 'Cherry',
          primaryElementName: 'Cherry',
          outsideTerminateDate: '1900-01-01T00:00:00+00:00',
        },
        {
          securityHash:
            'kvv1_0\tNTI1MDExMzcxOTkxNzUyODg1OAlCbG9jayBFbnJvbGwJb2NBREQJa3ZHzcG9uc2UJRFNSUUxSOFBGUFo1R1FRRDdZMjhLNlZXVFpRWlhMNFNTNzQxSjhaTDI0NlM1NzNUVFhYODdZR1FXQ1BKNTAzUglvY1BFUlNPTi8xNjcxNTM0\ty62la8LGXo/kX2qO/IWgIiHTeyAq+60vck9+ki8IkARIpr7vO58ylFjTkn6YGE3OrC2CUjh16P3aM3xZ95l2Kg==',
          personID: 1671534,
          personName: 'Deactivate Test',
          domainName: 'Cherry',
          primaryElementName: 'Cherry',
          outsideTerminateDate: '1900-01-01T00:00:00+00:00',
        },
        {
          securityHash:
            'kvv1_0\tNTI1MDExMzcxOTkxNzUyODg1OAlCbG9jayBFbnJvbGwJbVzcG9uc2UJRFNSUUxSOFBGUFo1R1FRRDdZMjhLNlZXVFpRWlhMNFNTNzQxSjhaTDI0NlM1NzNUVFhYODdZR1FXQ1BKNTAzUglvY1BFUlNPTi8xNzgwMDQ2\twziPv1TiXY/hZvkxpHVfn7F/bKUozKI9lwo9xfkFJXOWOK/a1P6eyD/XURYuWYURI2NqS0BPnXOh4Npsqjq2gw==',
          personID: 1780046,
          personName: 'ttiimport test1312',
          domainName: 'Cherry',
          primaryElementName: 'Cherry',
          outsideTerminateDate: '1900-01-01T00:00:00+00:00',
        },
      ],
      links: [],
      error: {
        logID: 0,
        sts: 0,
        msg: '',
      },
    }
  },
  invalidMissingRequired: (propName: string) => {
    return {
      cmdTimeSpan: '00:00:00',
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
