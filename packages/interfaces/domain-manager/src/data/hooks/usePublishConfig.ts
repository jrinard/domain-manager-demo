import { useCallback, useState } from 'react'
import { useTytoClient } from '@tyto/client'
import {
  useDomainUIConfigurationCreateMutation,
  useDomainUIConfigurationUpdateMutation,
} from '@tyto/query'

export interface UsePublishConfigOptions {
  configID: string
  configType?: 'ocTRYYBTOPMENU' | 'ocTRYYBSTART' | 'ocMASTERYSTART'
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

/**
 * Hook to publish a configuration.
 * Ensures the config is saved first (POST) before publishing (PUT),
 * following the pattern used in MenuBuilder and LayoutBuilder.
 */
export function usePublishConfig({
  configID,
  configType,
  onSuccess,
  onError,
}: UsePublishConfigOptions) {
  const tytoClient = useTytoClient()
  const [isPublishing, setIsPublishing] = useState(false)

  const createConfigMutation = useDomainUIConfigurationCreateMutation({
    onSuccess: () => {
      // Mutation handled in publishConfig function
    },
  })

  const updateConfigMutation = useDomainUIConfigurationUpdateMutation({
    onSuccess: () => {
      // Mutation handled in publishConfig function
    },
  })

  const publishConfig = useCallback(async () => {
    if (!configID) {
      throw new Error('Config ID is required to publish')
    }

    setIsPublishing(true)

    try {
      // Get the full config to ensure we have the latest version
      const configResult = await tytoClient.DomainUIConfiguration.get({
        UIconfigGUID: configID,
      })

      if (!configResult?.UIConfiguration) {
        throw new Error('Configuration not found')
      }

      if (!configResult.UIConfiguration.mainBody) {
        throw new Error('Configuration has no main body')
      }

      // Save the config first to ensure mainBodyIsValid is true
      const mainBodyData =
        typeof configResult.UIConfiguration.mainBody === 'string'
          ? configResult.UIConfiguration.mainBody
          : JSON.stringify(configResult.UIConfiguration.mainBody)

      await createConfigMutation.mutateAsync({
        UIconfigGUID: configID,
        lastModifiedOfstDate: configResult.UIConfiguration.modifiedDate,
        configType: configType || configResult.UIConfiguration.configType,
        mainBody: mainBodyData,
        mimeType: 'application/json',
        mainBodyIsValid: true,
        attachments: [], // Attachments are preserved automatically on save
        domainID: configResult.UIConfiguration.domainID,
      })

      // Then publish it (PUT to set activeStatus to ocENABLED)
      await updateConfigMutation.mutateAsync({
        UIconfigGUID: configID,
        activeStatus: 'ocENABLED',
      })

      onSuccess?.()
    } catch (err: unknown) {
      onError?.(err)
      throw err // Re-throw so caller can handle if needed
    } finally {
      setIsPublishing(false)
    }
  }, [
    configID,
    configType,
    tytoClient,
    createConfigMutation,
    updateConfigMutation,
    onSuccess,
    onError,
  ])

  return {
    publishConfig,
    isPublishing,
  }
}
