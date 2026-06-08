import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, LoginResetPasswordValidate } from '@tyto/client'

export const useLoginResetPasswordValidateReadQuery = (): UseQueryResult<
  Awaited<ReturnType<typeof LoginResetPasswordValidate.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  return useQuery<
    Awaited<ReturnType<typeof LoginResetPasswordValidate.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.LoginResetPasswordValidate.endpoint],
    queryFn: () => tytoClient.LoginResetPasswordValidate.get(),
  })
}

export default useLoginResetPasswordValidateReadQuery
