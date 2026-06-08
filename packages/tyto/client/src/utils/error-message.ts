/**
 * Pulls a message from an Error, handling Tyto's specific means of returning an error message in it's responses
 * @param error either `resp.error` **Tyto** object, JavaScript `Error`, or `String` that is the error reason
 * @returns `String`; the Error Message to use and/or Display
 * #### Examples...
 * ### Example 1: Pass the `error` object in a Tyto Response
 * ```
 * const resp = await Tyto.SomeCall.get({ ... })
 *
 * const message = pullErrorMsg(resp?.error)
 * // * message = "Unauthorized. You do not have permission to view this thing."
 * ```
 * ### Example 2: Pass `useQuerry.error` for displaying in the UI
 * ```
 * const { isError, error } = useSomeQuery({ ... })
 *
 * const errorMessage = isError ? pullErrorMsg(error) : undefined
 * // * errorMessage = "Network Connection Issue"
 * // * errorMessage = "Unauthorized. You do not have permission to view this thing."
 * ```
 * ### Example 3: Pass caught error for displaying in the UI
 * ```
 * try {
 *   const definitelyAnObject = undefined;
 *   const propertyValue = definitelyAnObject.someNested.value
 * } catch (err) {
 *   const errorMessage = isError ? pullErrorMsg(error) : undefined
 *   // * errorMessage = "Cannot read 'someNested' of Undefined"
 * }
 * ```
 */
export function pullErrorMsg(
  error: unknown,
  opts?: { tytoMessagePreference?: 'msg' | 'technical' },
) {
  if (typeof error === 'string') {
    return error
  } else if (error instanceof Error) {
    return error.message
  } else if (error && typeof error === 'object') {
    // * If there is a `technical` message and it is the preference, use it. Otherwise fallback to the `msg` property.
    if (
      opts?.tytoMessagePreference === 'technical' &&
      'technical' in error &&
      typeof error.technical === 'string'
    ) {
      return `${error.technical}`
    }

    if ('msg' in error && typeof error.msg === 'string') {
      return `${error.msg}`
    }
  }

  return 'Unknown error'
}
