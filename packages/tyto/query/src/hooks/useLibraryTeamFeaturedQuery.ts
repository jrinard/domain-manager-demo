import { useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query'
import {
  useTytoClient,
  LibraryTeamFeatured as LibraryTeamFeaturedResource,
  type LibraryTeamFeaturedItem,
  type GetParameters,
} from '@tyto/client'

export interface UseLibraryTeamFeaturedQueryProps {
  assetMode?: 'ocALL' | 'ocLESSON' | 'ocLIBCAT'
  top?: number
  isEnabled?: boolean
}

// Re-export for convenience (matching the interface name used in components)
export type { LibraryTeamFeaturedItem as LibraryTeamFeatured }
export type { GetParameters as UseLibraryTeamFeaturedQueryParams }

export const useLibraryTeamFeaturedQuery = ({
  assetMode = 'ocALL',
  top = 12,
  isEnabled = true,
}: UseLibraryTeamFeaturedQueryProps = {}) => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: Parameters<
    typeof LibraryTeamFeaturedResource.prototype.get
  >[0] = {
    assetMode,
    top,
  }

  const queryKey: QueryKey = [tytoClient.LibraryTeamFeatured.endpoint, params]

  return {
    ...useQuery<LibraryTeamFeaturedItem[], Error>({
      enabled: isEnabled,
      queryKey,
      queryFn: async () => {
        const response = await tytoClient.LibraryTeamFeatured.get(params)
        const items = response.libraryTeamFeatured || []
        return items
      },
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({ queryKey })
    },
  }
}

export default useLibraryTeamFeaturedQuery
