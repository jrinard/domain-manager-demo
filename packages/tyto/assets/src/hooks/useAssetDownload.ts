import { Data } from '@spacedock/manifest'
import { useEffect, useState } from 'react'
import { useTytoAssetClient } from '../client'
import { NotDownloadable } from '../exceptions'
import { getScopedEncoding } from '../utils'

interface UseAssetDownloadProps {
  asset: Data.Asset
}

/**
 * Within the attachments on a Conversation Message the omission of a `ocORIGINAL` encoding is a result of a User setting `restrictOriginal` on the Lesson.
 * In other words, if the `ocORIGINAL` encoding is not found it is very likely because the owner of that Lesson explicitly
 * said "I don't want people to be able to download this." So, we probably should disallow Downloading that Attachment as opposed to falling back to the ocTHUMBNAIL.
 */
export const useAssetDownload = ({ asset }: UseAssetDownloadProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [assetInternal, setAssetInternal] = useState(asset)
  const client = useTytoAssetClient()
  useEffect(() => {
    setAssetInternal(asset)
  }, [asset])
  const download = () => {
    setIsLoading(true)
    const originalEncoding: Data.Encoding | undefined = getScopedEncoding({
      encodings: assetInternal.encodings || [],
      targetEncoding: 'ocORIGINAL',
    })
    if (originalEncoding) {
      client.downloadEncoding({
        encoding: originalEncoding,
        onSuccess: () => {
          setIsLoading(false)
        },
        filename: assetInternal.assetName,
      })
    } else {
      throw new NotDownloadable()
    }
  }
  return { isLoading, download }
}
