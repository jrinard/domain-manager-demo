import _ from 'lodash'
import { useCallback, useMemo } from 'react'
import { mapConfigToMastery, mapConfigToLegacy } from '@domain/configs'

import {
  useDomainUIConfigurationQuery,
  useDomainUIConfigurationCreateMutation,
  useDomainUIConfigurationUpdateMutation,
} from '@tyto/query'
import type { DomainUI } from '@spacedock/manifest'
import type { HomeConfig } from '@domain/configs'
import { isHomeConfig } from '@domain/configs'

export function useMasteryConfig({
  configID,
  disabled,
}: {
  configID: string
  disabled?: boolean
}) {
  const configQuery = useDomainUIConfigurationQuery({
    UIconfigGUID: configID,
    disabled: disabled || !configID,
  })

  const createConfigMutation = useDomainUIConfigurationCreateMutation({
    onSuccess: _.noop,
  })

  const updateConfigMutation = useDomainUIConfigurationUpdateMutation({
    onSuccess: _.noop,
  })

  const masteryConfig = useMemo(() => {
    const uiConfig = configQuery.data?.UIConfiguration
    if (uiConfig?.configType !== 'ocMASTERYSTART' || !uiConfig?.mainBody) {
      return null
    }
    try {
      const parsed = JSON.parse(uiConfig.mainBody) as any
      return mapConfigToMastery(parsed)
    } catch {
      return null
    }
  }, [configQuery.data?.UIConfiguration])

  const attachments = useMemo(() => {
    if (!configQuery.data?.UIConfiguration) {
      return []
    }

    return [
      ...(configQuery.data?.UIConfiguration?.libraryImages ?? []),
      ...(configQuery.data?.UIConfiguration?.libraryLessons ?? []),
    ]
  }, [configQuery.data?.UIConfiguration])

  const saveConfigChanges = useCallback(
    async (
      config: HomeConfig,
      opts: {
        lastModifiedOfstDate?: string
        attachmentsOverride?: DomainUI.UIConfigurationRequestAttachment[]
        configName?: string
      },
    ) => {
      const remoteConfigData = configQuery.data?.UIConfiguration
      if (!isHomeConfig(config)) {
        return
      } else if (!remoteConfigData) {
        return
      }

      const configID = remoteConfigData.UIconfigGUID
      const attachments =
        opts.attachmentsOverride ??
        convertSavedItemsToAttachments(remoteConfigData)
      // Convert in-memory mastery-prefixed section types back to legacy names before saving.
      const legacyConfig = mapConfigToLegacy(_.cloneDeep(config))
      const result = await createConfigMutation.mutateAsync({
        UIconfigGUID: configID,
        lastModifiedOfstDate:
          opts.lastModifiedOfstDate ?? remoteConfigData.modifiedDate,
        configType: remoteConfigData.configType,
        mainBody: JSON.stringify(legacyConfig),
        mimeType: 'application/json',
        mainBodyIsValid: true,
        attachments,
        domainID: remoteConfigData.domainID,
        configName: opts.configName,
      })

      return result
    },
    [createConfigMutation, configQuery],
  )

  const saveConfigMetadataChanges = useCallback(
    async (fields: {
      configName?: string
      configDescription?: string
      authorNote?: string
    }) => {
      const remoteConfigData = configQuery.data?.UIConfiguration
      if (!Object.keys(fields)) {
        return
      } else if (!remoteConfigData) {
        return
      }

      const configID = remoteConfigData.UIconfigGUID
      const attachments = convertSavedItemsToAttachments(remoteConfigData)

      const result = await createConfigMutation.mutateAsync({
        UIconfigGUID: configID,
        lastModifiedOfstDate: remoteConfigData.modifiedDate,
        configType: remoteConfigData.configType,
        mimeType: 'application/json',
        attachments,
        domainID: remoteConfigData.domainID,
        configName: fields.configName,
        configDescription: fields.configDescription,
        authorNote: fields.authorNote,
      })

      return result
    },
    [createConfigMutation, configQuery],
  )

  const publishConfig = useCallback(async () => {
    const remoteConfigData = configQuery.data?.UIConfiguration

    if (!remoteConfigData) {
      return
    }

    await updateConfigMutation.mutateAsync({
      UIconfigGUID: remoteConfigData.UIconfigGUID,
      activeStatus: 'ocENABLED',
    })
  }, [updateConfigMutation, configQuery])

  return {
    isPending: configQuery.isPending,
    isError: configQuery.isError,
    error: configQuery.error,
    data: configQuery.data?.UIConfiguration,
    masteryConfig: masteryConfig,
    attachments: attachments,
    refetch: configQuery.refetch,
    invalidate: configQuery.invalidate,
    saveConfigChanges,
    saveConfigMetadataChanges,
    cloneConfig: saveConfigChanges,
    publishConfig,
  }
}

function convertSavedItemsToAttachments(
  configItems: Pick<DomainUI.UIConfig, 'libraryLessons' | 'libraryImages'>,
) {
  const attachments: DomainUI.UIConfigurationRequestAttachment[] = []

  configItems.libraryLessons?.forEach?.((lesson) => {
    attachments.push({
      elementID: lesson.courseItemID,
      tag: lesson.tag,
    })
  })

  configItems.libraryImages?.forEach?.((image) => {
    attachments.push({
      elementID: image.courseItemID,
      tag: image.tag,
    })
  })

  return attachments
}
