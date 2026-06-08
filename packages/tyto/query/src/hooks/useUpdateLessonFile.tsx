import { useSaveForLessonMutation } from './useSaveForLessonMutation'

/**
 * Wrapper around `useSaveForLessonMutation` that forces one to pass
 * a `lessonID` to the mutation hook, the equivalent of updating an existing
 * `Lesson` but replacing the existing `Asset` inside the `Lesson` with a new `File`
 */
const useUpdateLessonFile = useSaveForLessonMutation<{ lessonID: number }>;

export { useUpdateLessonFile }
export default useUpdateLessonFile
