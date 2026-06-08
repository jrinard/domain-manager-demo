import _ from 'lodash'
import { useCallback, useEffect, useState, useMemo } from 'react'

import { useQuery } from '@tyto/query'
import type { HomeConfig } from '@domain/configs'
import {
  readHomeConfig,
  parseAndValidateHomeConfigString,
  isHomeConfig,
} from '@domain/configs'
import {
  useDomainUIConfigurationQuery,
  useDomainUIConfigurationCreateMutation,
  useDomainUIConfigurationUpdateMutation,
} from '@tyto/query'
import type { DomainUI } from '@spacedock/manifest'

/**
 * Hook to load home configuration from remote using Tanstack Query
 * @param teamID - Domain Team ID or regular Team ID
 * @returns Query result with HomeConfig data, loading state, and error
 */
export function useRemoteHomeConfig(teamID?: number) {
  return useQuery({
    queryKey: ['home-config', { teamID }],
    enabled: teamID !== undefined,
    queryFn: () => {
      if (!teamID) {
        throw new Error('Team ID is required')
      }
      return readHomeConfig(teamID)
    },
  })
}

export function useHomeConfig({
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

  const { homeConfig, error } = useParsedHomeConfig(
    configQuery.data?.UIConfiguration,
  )

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

      const result = await createConfigMutation.mutateAsync({
        UIconfigGUID: configID,
        lastModifiedOfstDate:
          opts.lastModifiedOfstDate ?? remoteConfigData.modifiedDate,
        configType: remoteConfigData.configType,
        mainBody: JSON.stringify(config),
        mimeType: 'application/json',
        mainBodyIsValid: true,
        attachments,
        domainID: remoteConfigData.domainID,
        configName: opts.configName,
      })

      return result
    },
    [createConfigMutation, configQuery, homeConfig],
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
        // // mainBody: config ? JSON.stringify(config) : undefined,
        mimeType: 'application/json',
        attachments,
        domainID: remoteConfigData.domainID,
        configName: fields.configName,
        configDescription: fields.configDescription,
        authorNote: fields.authorNote,
      })

      return result
    },
    [createConfigMutation, configQuery, homeConfig],
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
  }, [updateConfigMutation, configQuery, homeConfig])

  /**
   * Primarily, `"Element"` refers to a `Lesson` and never a `DomainUI Image`.
   * It *could* refer to another type of Element such as `Block`, or `Event` that one wants to associate with a config.
   */
  const addElementsAsAttachmentToConfig = useCallback(
    async (lessons: { tag?: string; lessonID: number }[]) => {
      const remoteConfigData = configQuery.data?.UIConfiguration
      if (!lessons?.length) {
        return null
      } else if (!remoteConfigData) {
        return null
      }

      const configID = remoteConfigData.UIconfigGUID
      const attachments = [
        ...convertSavedItemsToAttachments(remoteConfigData),
        ...lessons.map((lesson) => ({
          elementID: lesson.lessonID,
          tag: lesson.tag ?? '',
        })),
      ]

      const result = await createConfigMutation.mutateAsync({
        UIconfigGUID: configID,
        lastModifiedOfstDate: remoteConfigData.modifiedDate,
        configType: remoteConfigData.configType,
        mimeType: 'application/json',
        attachments,
        domainID: remoteConfigData.domainID,
      })

      return {
        newAttachmentsList: attachments,
        lastModifiedOfstDate: result.lastModifiedOfstDate,
        configName: result.configName,
        UIconfigGUID: result.UIconfigGUID,
      }
    },
    [createConfigMutation, configQuery, homeConfig],
  )

  return {
    isPending: configQuery.isPending,
    isError: configQuery.isError,
    error: configQuery.error,
    data: configQuery.data?.UIConfiguration,
    homeConfig: homeConfig,
    attachments: attachments,
    parsingError: error,
    refetch: configQuery.refetch,
    invalidate: configQuery.invalidate,
    saveConfigChanges,
    saveConfigMetadataChanges,
    cloneConfig: saveConfigChanges,
    publishConfig,
    addElementsAsAttachmentToConfig,
  }
}

function useParsedHomeConfig(uiConfig?: DomainUI.UIConfig) {
  const [parseData, setParseData] = useState(() => parseHomeConfig(uiConfig))

  useEffect(() => {
    setParseData(parseHomeConfig(uiConfig))
  }, [uiConfig])

  return parseData
}

function parseHomeConfig(uiConfig?: DomainUI.UIConfig) {
  if (uiConfig?.configType !== 'ocTRYYBSTART' || !uiConfig?.mainBody) {
    return {
      homeConfig: null,
      error: 'Config Body found to be empty',
    }
  }

  const parsed = parseAndValidateHomeConfigString(uiConfig.mainBody)

  return {
    homeConfig: parsed,
    error: !parsed ? 'Config Body found to be invalid' : null,
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
