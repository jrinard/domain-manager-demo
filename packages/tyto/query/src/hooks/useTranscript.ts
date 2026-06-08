import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, Transcript } from '@tyto/client'

export interface UseTranscriptProps {
  forUserID: number
  disabled?: boolean
}

export const useTranscript = ({
  forUserID,
  disabled = false,
}: UseTranscriptProps): UseQueryResult<
  Awaited<ReturnType<typeof Transcript.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof Transcript.prototype.get>[0] = {
    forUserID,
  }

  return useQuery<Awaited<ReturnType<typeof Transcript.prototype.get>>, Error>({
    queryKey: [tytoClient.Transcript.endpoint, params],
    enabled: !disabled,
    queryFn: () => tytoClient.Transcript.get({ ...params }),
  })
}

export default useTranscript
