import { useQuery } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import { SANE_REACT_QUERY_DEFAULTS } from '../constants'

interface GetParams {
  teamRoot: number
}

interface UseTeamToolsConfigQueryProps extends GetParams {
  isEnabled?: boolean
}

export const useTeamToolsConfigQuery = ({
  isEnabled = true,
  ...args
}: UseTeamToolsConfigQueryProps) => {
  const tytoClient = useTytoClient()
  const config = tytoClient.TeamTools.Config

  return useQuery({
    ...SANE_REACT_QUERY_DEFAULTS,
    enabled: isEnabled && !!args.teamRoot && !!config,
    queryKey: [config?.endpoint, { teamRoot: args.teamRoot }],
    queryFn: () => {
      if (!config) {
        throw new Error('TeamTools.Config is not available')
      }
      return config.get({ ...args })
    },
  })
}

export default useTeamToolsConfigQuery
