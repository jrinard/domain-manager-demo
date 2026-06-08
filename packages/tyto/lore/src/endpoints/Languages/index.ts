export const LanguagesEndpointResponses = {
  success: () => {
    return {
      languages: [
        {
          languageTagBCP47: 'en',
          lableNaitive: 'English',
          lableFrench: 'anglais',
          lableEnglish: 'English',
          isTextDesignation: true,
          isAudioDesignation: true,
        },
        {
          languageTagBCP47: 'es',
          lableNaitive: 'español',
          lableFrench: 'espagnol; castillan',
          lableEnglish: 'Spanish; Castilian',
          isTextDesignation: true,
          isAudioDesignation: true,
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
