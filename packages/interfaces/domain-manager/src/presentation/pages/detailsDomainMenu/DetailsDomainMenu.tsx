import { useParams, Link } from 'react-router-dom'
import { Icon } from '@falcon/icons'
import { useState, useEffect, useMemo } from 'react'
import {
  TextBody,
  TextHeading,
  Timestamp,
  useToast,
} from '@spacedock/falcon-ui'
import { TextAreaInput, TextInput } from '@falcon/inputs'
import { Button } from '@falcon/buttons'
import {
  SidebarNavigation,
  NavigationSection,
} from '../../organisms/sidebarNavigation'
import { CollapsibleDetails } from '../../organisms/collapsibleDetails'
import { MenuBuilderWrapper } from '../../organisms/menuBuilder'
import { useTopMenuConfig } from '../../../data/hooks/useTopMenuConfig'
import { useTopMenuConfigs } from '../../../data/hooks/useEditableUIConfig'
import { DOMAIN_MANAGER_PATHS } from '../../../data/constants'

type DetailsDomainMenuProps = {
  menuType?: string
}

export const DetailsDomainMenu = ({ menuType }: DetailsDomainMenuProps) => {
  const { domainID: domainIDString, configID } = useParams<{
    domainID: string
    configID: string
  }>()
  const toast = useToast()

  const {
    data: remoteUIConfig,
    saveConfigMetadataChangesForMenu,
    refetch: refetchUIConfig,
    isPending: isSavingConfig,
  } = useTopMenuConfig({ configID: configID || '' })

  const topMenuConfigsQuery = useTopMenuConfigs({
    domainID: Number(domainIDString),
  })

  const isTopMenu = (menuType ?? 'top')
    .split(',')
    .map((s) => s.trim())
    .includes('top')

  const [activeSection, setActiveSection] = useState('details')

  const navSections: NavigationSection[] = [
    { id: 'details', label: 'Details', required: true },
    { id: 'layout', label: 'Layout', required: false },
    { id: 'theme', label: 'Theme', required: false },
  ]

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  const targetConfig = useMemo(() => {
    return topMenuConfigsQuery.all_configs?.find(
      (c) => c.UIconfigGUID === configID,
    )
  }, [topMenuConfigsQuery.all_configs, configID])

  const configNameForBreadcrumb = targetConfig?.configName || configID

  const [configName, setConfigName] = useState<string>(
    () => targetConfig?.configName ?? '',
  )
  const [description, setDescription] = useState<string>(
    () => targetConfig?.configDescription ?? '',
  )

  // Check if there are changes from original data
  const hasChanges =
    targetConfig &&
    (targetConfig.configName !== configName ||
      targetConfig.configDescription !== description)

  const canChange = targetConfig && targetConfig.activeStatus !== 'ocENABLED'

  // Update state when target config data loads
  useEffect(() => {
    if (targetConfig) {
      setConfigName(targetConfig.configName || '')
      setDescription(targetConfig.configDescription || '')
    }
  }, [targetConfig])

  // Check if a section is required
  const isSectionRequired = (sectionId: string) => {
    const section = navSections.find((s) => s.id === sectionId)
    return section?.required || false
  }

  // Check if a section has a value in menuData
  const hasMetReq = (sectionId: string): boolean => {
    switch (sectionId) {
      case 'details':
        return Boolean(configName && configName.trim() !== '')
      default:
        return false
    }
  }

  return (
    <div className="bg-site-bg flex h-full w-full flex-col">
      {/* Breadcrumb - Sticky */}
      <div className="border-grayscale-600 bg-site-bg flex w-full flex-row justify-between border-b">
        <nav className="mt-2 flex items-center gap-2 px-2 py-2 text-sm text-gray-300">
          <Icon color="current" icon="chevron-double-left" size="2xl" />
          <Link
            to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${domainIDString}/menu`}
            className="opacity-70 hover:underline"
          >
            <span className="hidden sm:inline">
              Back to Menu Version Control
            </span>
            <span className="sm:hidden">Back</span>
          </Link>
          |<span className="text-primary"> {configNameForBreadcrumb}</span>
        </nav>
        <div className="flex items-center justify-end gap-4 px-6">
          <span className="mt-2 hidden text-xs opacity-50 sm:inline">
            Last modified:{' '}
            <Timestamp size="xs" date={targetConfig?.modifiedDate ?? ''} />
          </span>
          <Button
            size="tiny"
            disabled={
              !canChange ||
              !hasChanges ||
              targetConfig?.activeStatus === 'ocENABLED' ||
              isSavingConfig
            }
            variant="primary"
            onClick={async () => {
              if (hasChanges && remoteUIConfig && targetConfig) {
                const fields: {
                  configName?: string
                  configDescription?: string
                } = {}

                if (targetConfig.configName !== configName) {
                  fields['configName'] = configName
                }

                if (targetConfig.configDescription !== description) {
                  fields['configDescription'] = description
                }

                // Only save if there are actual field changes
                if (Object.keys(fields).length > 0) {
                  await saveConfigMetadataChangesForMenu(fields)

                  toast.toastSuccess({
                    description: 'Saving Changes to ' + targetConfig.configName,
                  })

                  // Refetch both the single config and the list of all configs
                  // This ensures the breadcrumb updates and Version Control shows correct data
                  await Promise.all([
                    refetchUIConfig(),
                    topMenuConfigsQuery.refetch(),
                  ])
                }
              }
            }}
          >
            Save Draft Details
          </Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-0 shrink grow flex-col lg:flex-row">
        {/* Left Sidebar - Fixed Position */}
        <div className="sticky top-[calc(var(--site-top-height)+170px)] h-auto w-full lg:h-auto lg:w-[250px] lg:self-start">
          <SidebarNavigation
            sections={navSections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
            hasMetReq={hasMetReq}
            scrollContainer="#menu-details-main-content"
          />
        </div>

        <main
          id="menu-details-main-content"
          className="flex-1 overflow-y-auto py-6 pt-2 lg:pt-4"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            scrollbarColor: '#525252 #262626',
          }}
        >
          <div className="flex gap-2 px-2">
            <div className="w-full space-y-4 pb-48 pl-4 pr-4 sm:min-w-[400px] sm:flex-1 sm:space-y-6 sm:pr-6 lg:space-y-8">
              {/* Details Section */}
              <section id="details">
                <div className="border-grayscale-600 mb-2 gap-2 border-b pb-2 sm:mb-4 sm:pb-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <TextHeading size={3}>Details</TextHeading>
                    {isSectionRequired('details') ? (
                      <Icon
                        color={hasMetReq('details') ? 'success' : 'current'}
                        icon={
                          hasMetReq('details')
                            ? 'checkbox-blank-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                    <CollapsibleDetails
                      label={configName || 'Config Name'}
                      description={description}
                      defaultOpen={false}
                    >
                      <div className="flex flex-1 flex-col gap-1">
                        <TextBody>Config Name</TextBody>
                        <TextInput
                          placeholder="Config Name"
                          value={configName}
                          onChange={(e) => {
                            setConfigName(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <TextBody>Description</TextBody>
                        <TextAreaInput
                          placeholder="Description"
                          value={description}
                          className="min-h-[60px]"
                          onChange={(e) => {
                            setDescription(e.target.value)
                          }}
                        />
                      </div>
                    </CollapsibleDetails>
                  </div>
                </div>
              </section>

              <section id="layout">
                <div className="border-grayscale-600 mb-4 gap-4 border-b pb-2 sm:mb-6 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Layout</TextHeading>
                    {isSectionRequired('layout') ? (
                      <Icon
                        color={hasMetReq('layout') ? 'success' : 'current'}
                        icon={
                          hasMetReq('layout')
                            ? 'checkbox-blank-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        size="xl"
                      />
                    ) : (
                      <div className="h-6 w-6" />
                    )}
                  </div>
                </div>

                {isTopMenu ? (
                  <MenuBuilderWrapper
                    configID={configID}
                    domainID={Number(domainIDString)}
                  />
                ) : (
                  <div className="bg-bg-contrast-low rounded-md p-4">
                    <TextBody>
                      This menu editor only supports Top Menu. You have a side
                      menu currently active.
                    </TextBody>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
