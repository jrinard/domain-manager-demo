import GetSuccessCourse10XEmployeeWeek1JSON from './get.success.course10XEmployeeWeek1.json'
import GetSuccessCoursePlatformReviewJSON from './get.success.coursePlatformReview.json'
import GetSuccessCourseSimple from './get.success.courseSimple.json'
/**
 * To populate this please run
 * px g @tyto/scribe:postman
 */
export const PrerequisiteEnrollmentsEndpointResponses = {
  get: {
    success: (
      example:
        | 'simple'
        | '10XEmployeeWeek1'
        | 'EmployeePlatformReview' = 'simple',
    ) => {
      if (example === '10XEmployeeWeek1') {
        return GetSuccessCourse10XEmployeeWeek1JSON
      } else if (example === 'EmployeePlatformReview') {
        return GetSuccessCoursePlatformReviewJSON
      }
      return GetSuccessCourseSimple
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
