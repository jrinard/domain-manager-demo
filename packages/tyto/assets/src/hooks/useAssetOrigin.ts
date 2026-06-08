import { useTytoAssetClient } from '../client'

export function useAssetOrigin() {
  const tytoAssetClient = useTytoAssetClient()

  const origin = tytoAssetClient.getOrigin()

  return {
    origin,
    createAssetURLFromPath(path?: string): string {
      if (!path) {
        return ''
      }

      return pointPathAtAssetsServer(origin, path)
    },
  }
}

function pointPathAtAssetsServer(origin: string, path: string): string {
  return `${origin}${path}`
}
