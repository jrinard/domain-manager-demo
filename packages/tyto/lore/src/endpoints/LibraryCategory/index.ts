/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const LibraryCategoryEndpointResponses = {
  post: {
    success: () => {
      return {
        libraryCategory: {
          libCategoryID: 1234,
          categoryName: 'Test Category',
        },
      }
    },
  },
  put: {
    success: () => {
      return {
        libraryCategory: {
          libCategoryID: 1234,
          categoryName: 'Test Category',
        },
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
