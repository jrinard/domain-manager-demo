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
import { DEFAULT_CONFIGS } from '@domain/configs'

import { useHomeConfigs } from '../../../data/hooks/useEditableUIConfig'
import {
  SidebarNavigation,
  NavigationSection,
} from '../../organisms/sidebarNavigation'
import { CollapsibleDetails } from '../../organisms/collapsibleDetails'
import { LayoutBuilder } from '../../organisms/layoutBuilder'
import { SecurityRoles } from '../../organisms/securityRoles'
import { useHomeConfig, useEditableHomeConfig } from '../../../data/hooks/'
import { useTeamAdminPermissions } from '../../../data/hooks'
import { homeTabPath } from '../../../data/constants'
import { useDomainQuery } from '@tyto/query'

export const DetailsDomain = () => {
  const { domainID, configID } = useParams<{
    domainID: string
    configID: string
  }>()
  const toast = useToast()
  const [activeSection, setActiveSection] = useState('details')
  const [selectedRoleID, setSelectedRoleID] = useState(0)

  const numericDomainID = Number(domainID)
  const domainQuery = useDomainQuery({ domainID: numericDomainID })
  const teamAdminPerms = useTeamAdminPermissions(numericDomainID)
  const hasDomainChange = teamAdminPerms?.admin?.permissions?.some(
    (permission: { functionName: string; changeAccess: boolean }) =>
      permission.functionName === 'Domain' && permission.changeAccess,
  )

  const {
    homeConfig,
    saveConfigMetadataChanges,
    refetch: refetchUIConfig,
    isPending: isSavingConfig,
  } = useHomeConfig({ configID: configID ?? '' })

  // Use editable state to track sections in real-time (updates when homeConfig changes)
  const editable = useEditableHomeConfig(
    homeConfig ?? DEFAULT_CONFIGS.HOME_CONFIG,
  )

  const homeConfigsQuery = useHomeConfigs({
    domainID: Number(domainID),
  })

  const navSections: NavigationSection[] = [
    { id: 'details', label: 'Details', required: true },
    { id: 'layout', label: 'Layout', required: true },
    { id: 'security-roles', label: 'Security Roles', required: false },
  ]

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  const targetConfig = useMemo(() => {
    return homeConfigsQuery.all_configs?.find(
      (c) => c.UIconfigGUID === configID,
    )
  }, [homeConfigsQuery.all_configs, configID])

  const [configName, setConfigName] = useState<string>(
    () => targetConfig?.configName ?? '',
  )
  const [configDescription, setConfigDescription] = useState<string>(
    () => targetConfig?.configDescription ?? '',
  )
  const [authorNote, setAuthorNote] = useState<string>(
    () => targetConfig?.authorNote ?? '',
  )

  useEffect(() => {
    setConfigName(targetConfig?.configName ?? '')
    setConfigDescription(targetConfig?.configDescription ?? '')
    setAuthorNote(targetConfig?.authorNote ?? '')
  }, [targetConfig])

  useEffect(() => {
    if (domainQuery.data?.domain) {
      setSelectedRoleID(domainQuery.data.domain.defaultRoleID)
    }
  }, [domainQuery.data?.domain])

  // Check if a section is required
  const isSectionRequired = (sectionId: string) => {
    const section = navSections.find((s) => s.id === sectionId)
    return section?.required || false
  }

  // Check if a section has a value in singleData
  const hasMetReq = (sectionId: string): boolean => {
    switch (sectionId) {
      case 'details':
        return Boolean(
          (targetConfig?.configName && targetConfig.configName.trim() !== '') ||
          (targetConfig?.authorNote && targetConfig.authorNote.trim() !== ''),
        )
      case 'layout': {
        // Requirement: at least 1 section that is placed on the grid (has areaName) and is not the default "title" one
        // Use editable.config.sections which updates when homeConfig changes
        const sections = editable.config.sections ?? []
        const placedNonTitleSections = sections.filter(
          (section) =>
            section.section_type !== 'title' &&
            section.layout_position?.areaName,
        )
        return placedNonTitleSections.length > 0
      }
      // // case 'security-roles':
      // //   return Boolean(
      // //     singleData.securityRoles && singleData.securityRoles.trim() !== '',
      // //   )
      // // case 'download':
      // //   return Boolean(singleData.download && singleData.download.trim() !== '')
      default:
        return false
    }
  }

  const configNameForBreadcrumb = targetConfig?.configName || configID

  const canChange = targetConfig && targetConfig.activeStatus !== 'ocENABLED'

  const hasChanges =
    targetConfig &&
    (targetConfig?.configName !== configName ||
      targetConfig?.authorNote !== authorNote ||
      targetConfig?.configDescription !== configDescription)

  return (
    <div className="bg-site-bg flex h-full w-full flex-col">
      {/* Breadcrumb - Sticky */}
      <div className="border-grayscale-600 bg-site-bg  flex w-full flex-row justify-between border-b">
        <nav className="mt-2 flex items-center gap-2 px-2 py-2 text-sm text-gray-300">
          <Icon color="current" icon="chevron-double-left" size="2xl" />
          <Link
            to={homeTabPath('domain', Number(domainID))}
            className="opacity-70 hover:underline"
          >
            <span className="hidden sm:inline">Back to Version Control</span>
            <span className="sm:hidden">Back</span>
          </Link>
          |<span className="text-primary"> {configNameForBreadcrumb}</span>
        </nav>
        <div className="flex items-center justify-end gap-4 px-6">
          <span className="hidden text-xs opacity-50 sm:inline">
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
              if (hasChanges && homeConfig) {
                const fields: {
                  configName?: string
                  configDescription?: string
                  authorNote?: string
                } = {}

                if (targetConfig?.configName !== configName) {
                  fields['configName'] = configName
                }

                if (targetConfig?.configDescription !== configDescription) {
                  fields['configDescription'] = configDescription
                }

                if (targetConfig?.authorNote !== authorNote) {
                  fields['authorNote'] = authorNote
                }

                await saveConfigMetadataChanges(fields)

                toast.toastSuccess({
                  description: 'Saving Changes to ' + targetConfig?.authorNote,
                })

                // Refetch both the single config and the list of all configs
                // This ensures the breadcrumb updates and Version Control shows correct data
                await Promise.all([
                  refetchUIConfig(),
                  homeConfigsQuery.refetch(),
                ])
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
            scrollContainer="#details-main-content"
          />
        </div>

        <main
          id="details-main-content"
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
                      description={configDescription}
                      defaultOpen={false}
                    >
                      <div className="flex flex-1 flex-col gap-1">
                        <TextBody>Config Name</TextBody>
                        <TextInput
                          placeholder="Config Name"
                          readOnly={!canChange}
                          value={configName}
                          onChange={(e) => {
                            setConfigName(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <TextBody>Config Description</TextBody>
                        <TextAreaInput
                          placeholder="Config Description"
                          value={configDescription}
                          readOnly={!canChange}
                          className="min-h-[60px]"
                          onChange={(e) => {
                            setConfigDescription(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <TextBody>Config Notes</TextBody>
                        <TextAreaInput
                          placeholder="Config Notes"
                          value={authorNote}
                          readOnly={!canChange}
                          className="min-h-[60px]"
                          onChange={(e) => {
                            setAuthorNote(e.target.value)
                          }}
                        />
                      </div>
                    </CollapsibleDetails>
                  </div>
                </div>
              </section>

              {/* Layout Section */}
              <section id="layout">
                <div className="my-8 mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <TextHeading size={3}>Layout</TextHeading>
                    {isSectionRequired('layout') && (
                      <Icon
                        color={hasMetReq('layout') ? 'success' : 'current'}
                        icon={
                          hasMetReq('layout')
                            ? 'checkbox-blank-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        size="xl"
                      />
                    )}
                  </div>
                </div>
                <LayoutBuilder
                  domainID={Number(domainID)}
                  configID={configID}
                />
              </section>

              {/* Security Roles Section */}
              <section id="security-roles">
                <div className="mb-2 gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    {isSectionRequired('security-roles') && (
                      <Icon
                        color={
                          hasMetReq('security-roles') ? 'success' : 'current'
                        }
                        icon={
                          hasMetReq('security-roles')
                            ? 'checkbox-blank-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        size="xl"
                      />
                    )}
                    <TextHeading size={3}>Security Roles</TextHeading>
                  </div>
                </div>
                <SecurityRoles
                  domainID={numericDomainID}
                  roleID={selectedRoleID}
                  onRoleIDChange={setSelectedRoleID}
                  canChange={!!hasDomainChange}
                />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
