import _ from 'lodash'
import { useCallback, useEffect, useState, useMemo } from 'react'

// // import { useQuery } from '@tyto/query'
import type { MenuConfig } from '@domain/configs'
import {
  parseAndValidateTopMenuConfigString,
  isTopMenuConfig,
} from '@domain/configs'
import {
  useDomainUIConfigurationQuery,
  useDomainUIConfigurationCreateMutation,
  useDomainUIConfigurationUpdateMutation,
} from '@tyto/query'
import type { DomainUI } from '@spacedock/manifest'
import { ICON_OVERRIDES } from '../../presentation/organisms/menuBuilder/MenuDataFallback'

/**
 * Hook to load home configuration from remote using Tanstack Query
 * @param teamID - Domain Team ID or regular Team ID
 * @returns Query result with HomeConfig data, loading state, and error
 */
// export function useRemoteHomeConfig(teamID?: number) {
//   return useQuery({
//     queryKey: ['top-menu-config', { teamID }],
//     enabled: teamID !== undefined,
//     queryFn: () => {
//       if (!teamID) {
//         throw new Error('Team ID is required')
//       }
//       return readHomeConfig(teamID)
//     },
//   })
// }

export function useTopMenuConfig({ configID }: { configID: string }) {
  const configQuery = useDomainUIConfigurationQuery({
    UIconfigGUID: configID,
    disabled: !configID,
  })

  const createConfigMutation = useDomainUIConfigurationCreateMutation({
    onSuccess: _.noop,
  })

  const updateConfigMutation = useDomainUIConfigurationUpdateMutation({
    onSuccess: _.noop,
  })

  const { topMenuConfig, error } = useParsedTopMenuConfig(
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
      config: MenuConfig,
    opts: {
        lastModifiedOfstDate?: string
        attachmentsOverride?: DomainUI.UIConfigurationRequestAttachment[]
        configName?: string
        configDescription?: string
      },
    ) => {
      if (!isTopMenuConfig(config)) {
        return
      }

      const freshResult = await configQuery.refetch()
      const remoteConfigData = freshResult.data?.UIConfiguration
      if (!remoteConfigData) {
        return
      }

      const configID = remoteConfigData.UIconfigGUID
      const attachments =
        opts.attachmentsOverride ??
        convertSavedItemsToAttachments(remoteConfigData)

      _.set(config, 'iconOverrides', ICON_OVERRIDES)

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
        configDescription: opts.configDescription,
      })

      return result
    },
    [createConfigMutation, configQuery, topMenuConfig],
  )

  /**
   * Saves only the metadata (configName, configDescription, authorNote) for the menu config.
   * Preserves the existing mainBody and menu structure.
   */
  const saveConfigMetadataChangesForMenu = useCallback(
    async (
      fields: {
        configName?: string
        configDescription?: string
        authorNote?: string
      },
      targetUIconfigGUID?: string,
    ) => {
      const remoteConfigData = configQuery.data?.UIConfiguration
      if (!Object.keys(fields).length) {
        return
      } else if (!remoteConfigData && !targetUIconfigGUID) {
        return
      }

      const uiGuidToUse = targetUIconfigGUID ?? remoteConfigData!.UIconfigGUID
      const baseConfig = remoteConfigData ?? {
        modifiedDate: undefined,
        configType: 'ocTRYYBTOPMENU',
        mainBody: JSON.stringify({}),
        mainBodyIsValid: true,
        domainID: 0,
      }

      const result = await createConfigMutation.mutateAsync({
        UIconfigGUID: uiGuidToUse,
        lastModifiedOfstDate: baseConfig.modifiedDate,
        configType: baseConfig.configType,
        mainBody: baseConfig.mainBody, // Preserve existing mainBody when saving metadata
        mimeType: 'application/json',
        mainBodyIsValid: baseConfig.mainBodyIsValid,
        attachments: [], // Menu configs don't use attachments
        domainID: baseConfig.domainID,
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
  }, [updateConfigMutation, configQuery, topMenuConfig])

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

      await configQuery.invalidate()

      return {
        newAttachmentsList: attachments,
        lastModifiedOfstDate: result.lastModifiedOfstDate,
        configName: result.configName,
        UIconfigGUID: result.UIconfigGUID,
      }
    },
    [createConfigMutation, configQuery, topMenuConfig],
  )

  return {
    isPending:
      configQuery.isPending ||
      createConfigMutation.isPending ||
      updateConfigMutation.isPending,
    isError: configQuery.isError,
    error: configQuery.error,
    data: configQuery.data?.UIConfiguration,
    topMenuConfig: topMenuConfig,
    attachments: attachments,
    parsingError: error,
    refetch: configQuery.refetch,
    invalidate: configQuery.invalidate,
    saveConfigChanges,
    saveConfigMetadataChangesForMenu,
    cloneConfig: saveConfigChanges,
    publishConfig,
    addElementsAsAttachmentToConfig,
  }
}

function useParsedTopMenuConfig(uiConfig?: DomainUI.UIConfig) {
  const [parseData, setParseData] = useState(() => parseTopMenuConfig(uiConfig))

  useEffect(() => {
    setParseData(parseTopMenuConfig(uiConfig))
  }, [uiConfig])

  return parseData
}

function parseTopMenuConfig(uiConfig?: DomainUI.UIConfig) {
  if (uiConfig?.configType !== 'ocTRYYBTOPMENU' || !uiConfig?.mainBody) {
    return {
      topMenuConfig: null,
      error: 'Config Body found to be empty',
    }
  }

  const parsed = parseAndValidateTopMenuConfigString(uiConfig.mainBody)

  return {
    topMenuConfig: parsed,
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
