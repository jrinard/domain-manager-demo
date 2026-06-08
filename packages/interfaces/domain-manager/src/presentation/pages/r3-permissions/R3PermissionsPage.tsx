import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Switch,
  Label,
  Dialog,
  TextHeading,
  useToast,
} from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import {
  useTeamQuery,
  useTeamToolsConfigMutation,
  useTeamToolsConfigDeleteMutation,
} from '@tyto/query'
import type { TytoData } from '@spacedock/manifest'

interface R3PermissionsPageProps {
  domainID: number
}

type PermissionState =
  | 'onInitialize'
  | 'onDiscComplete'
  | 'onBasicTrainingComplete'
  | 'onAdvTrainingComplete'

type PermissionFlag =
  | 'mayTakeDisc'
  | 'mayImportDisc'
  | 'mayTakeBasicTrain'
  | 'mayTakeAdvTrain'
  | 'hasBasicViewDisc'
  | 'hasAdvViewDisc'
  | 'hasPermitChange'
  | 'hasGrantPermitChange'

// TODO Determine if we actually want to default all permission values to false
const DEFAULT_PERMISSION_STATE = {
  mayTakeDisc: false,
  mayImportDisc: false,
  mayTakeBasicTrain: false,
  mayTakeAdvTrain: false,
  hasBasicViewDisc: false,
  hasAdvViewDisc: false,
  hasPermitChange: false,
  hasGrantPermitChange: false,
}

export const R3PermissionsPage: React.FC<R3PermissionsPageProps> = ({
  domainID,
}) => {
  const toast = useToast()

  const teamQuery = useTeamQuery({ teamID: domainID })
  const team = teamQuery.data?.team
  const config = team?.teamToolsConfig

  const parentTeamQuery = useTeamQuery({
    teamID: team?.primaryElementID || 0,
    isEnabled: !!team?.primaryElementID,
  })
  const parentTeam = parentTeamQuery.data?.team
  const inheritedConfig = parentTeam?.teamToolsConfig

  const [formData, setFormData] = useState<TytoData.TeamToolsTeamConfig | null>(
    null,
  )
  const [hasChanges, setHasChanges] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showInheritedConfig, setShowInheritedConfig] = useState(false)

  useEffect(() => {
    if (config && !formData) {
      setFormData(config)
    }
  }, [config, formData])

  const updateMutation = useTeamToolsConfigMutation({
    onSuccess: () => {
      toast.toastSuccess({ description: 'R3 permissions updated successfully' })
      setHasChanges(false)
    },
    onError: (error) => {
      toast.toastError({
        description: `Failed to update permissions: ${String(error)}`,
      })
    },
  })

  const deleteMutation = useTeamToolsConfigDeleteMutation({
    onSuccess: () => {
      toast.toastSuccess({
        description: 'Config deleted. Domain will inherit from parent.',
      })
      setShowDeleteDialog(false)
      setFormData(null)
      setHasChanges(false)
    },
    onError: (error) => {
      toast.toastError({
        description: `Failed to delete config: ${String(error)}`,
      })
    },
  })

  const handleSave = () => {
    if (!formData) return

    updateMutation.mutate({
      teamRoot: domainID,
      advTrainingID: formData.advTrainingID,
      basicTrainingID: formData.basicTrainingID,
      onInitialize: formData.onInitialize,
      onDiscComplete: formData.onDiscComplete,
      onBasicTrainingComplete: formData.onBasicTrainingComplete,
      onAdvTrainingComplete: formData.onAdvTrainingComplete,
    })
  }

  const handleDelete = () => {
    deleteMutation.mutate({ teamRoot: domainID })
  }

  const handleCopyJson = async () => {
    if (!config) return

    try {
      const jsonString = JSON.stringify(config, null, 2)
      await navigator.clipboard.writeText(jsonString)
      toast.toastSuccess({ description: 'Config file copied to clipboard' })
    } catch (err) {
      toast.toastError({
        description: 'Failed to copy config file to clipboard',
      })
    }
  }

  const handleCreateCustomConfig = () => {
    if (inheritedConfig) {
      setFormData({
        ...inheritedConfig,
        teamRoot: domainID,
        teamName: team?.teamName || '',
      })
    } else {
      setFormData({
        teamRoot: domainID,
        teamName: team?.teamName || '',
        advTrainingID: 0,
        basicTrainingID: 0,
        modifiedByID: 0,
        modifiedDate: new Date().toISOString(),
        onInitialize: DEFAULT_PERMISSION_STATE,
        onDiscComplete: DEFAULT_PERMISSION_STATE,
        onBasicTrainingComplete: DEFAULT_PERMISSION_STATE,
        onAdvTrainingComplete: DEFAULT_PERMISSION_STATE,
      })
    }
    setHasChanges(true)
  }

  const handleToggle = (
    state: PermissionState,
    flag: PermissionFlag,
    value: boolean,
  ) => {
    if (!formData) {
      handleCreateCustomConfig()
      return
    }

    setFormData((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        [state]: {
          ...prev[state],
          [flag]: value,
        },
      }
    })

    setHasChanges(true)
  }

  const renderPermissionSection = (
    state: PermissionState,
    title: string,
    description: string,
  ) => {
    const stateData = formData?.[state]

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-grayscale-500 text-sm">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="flex items-center justify-between rounded border border-gray-200 p-3">
            <Label htmlFor={`${state}-hasBasicViewDisc`}>Basic View DISC</Label>
            <Switch
              id={`${state}-hasBasicViewDisc`}
              checked={stateData?.hasBasicViewDisc ?? false}
              onCheckedChange={(val) =>
                handleToggle(state, 'hasBasicViewDisc', val)
              }
            />
          </div>
          <div className="flex items-center justify-between rounded border border-gray-200 p-3">
            <Label htmlFor={`${state}-hasAdvViewDisc`}>
              Advanced View DISC
            </Label>
            <Switch
              id={`${state}-hasAdvViewDisc`}
              checked={stateData?.hasAdvViewDisc ?? false}
              onCheckedChange={(val) =>
                handleToggle(state, 'hasAdvViewDisc', val)
              }
            />
          </div>
        </div>
      </div>
    )
  }

  if (teamQuery.isLoading) {
    return (
      <div className="mt-8 p-8 text-center">
        <p>Loading domain configuration...</p>
      </div>
    )
  }

  if (teamQuery.isError) {
    return (
      <div className="mt-8 p-8 text-center">
        <p className="text-red-600">
          Error loading domain: {String(teamQuery.error)}
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <main className="flex-1 overflow-y-auto py-6 pt-4">
        <div className="w-full space-y-6 pb-48 pl-4 pr-4">
          {/* Header */}
          <div className="border-grayscale-600 mb-4 gap-4 border-b pb-2">
            <TextHeading size={3}>
              R3 (DISC) Permissions - Domain {domainID}
            </TextHeading>
            <p className="text-grayscale-500 mt-1 text-sm">
              Configure when users can view R3/DISC assessment results
            </p>
          </div>

          {/* Configuration Display */}
          {config ? (
            /* Local Custom Config exists */
            <Card>
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Domain Configuration</CardTitle>
                    <Button
                      variant="ghost-primary"
                      size="small"
                      onClick={handleCopyJson}
                    >
                      Copy Config File
                    </Button>
                  </div>
                  {parentTeam && (
                    <div className="text-grayscale-500 flex items-center gap-2 text-sm">
                      <span>
                        Overriding inherited config from{' '}
                        <strong>{parentTeam.teamName}</strong> (#
                        {parentTeam.teamID})
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <pre
                  className="max-h-64 overflow-auto rounded p-4 text-xs"
                  style={{
                    backgroundColor: 'var(--site-bg, #f3f4f6)',
                    color: 'var(--site-fg, #000000)',
                  }}
                >
                  {JSON.stringify(config, null, 2)}
                </pre>

                {/* Expandable inherited config */}
                {inheritedConfig && (
                  <button
                    onClick={() => setShowInheritedConfig(!showInheritedConfig)}
                    className="text-primary mt-4 hover:underline"
                  >
                    {showInheritedConfig ? '▲' : '▼'} Show inherited config
                  </button>
                )}
                {showInheritedConfig && inheritedConfig && (
                  <div className="mt-4">
                    <div className="mb-2 text-sm font-semibold">
                      Inherited from {parentTeam?.teamName}:
                    </div>
                    <pre
                      className="max-h-64 overflow-auto rounded p-4 text-xs"
                      style={{
                        backgroundColor: 'var(--site-bg, #f3f4f6)',
                        color: 'var(--site-fg, #000000)',
                      }}
                    >
                      {JSON.stringify(inheritedConfig, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            /* No local config - show inherited */
            <Card>
              <CardHeader>
                <CardTitle>
                  Currently Inheriting Config
                  {parentTeam && (
                    <span className="text-grayscale-500 ml-2 text-sm font-normal">
                      from {parentTeam.teamName} (#{parentTeam.teamID})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {inheritedConfig ? (
                  <>
                    <pre
                      className="max-h-64 overflow-auto rounded p-4 text-xs"
                      style={{
                        backgroundColor: 'var(--site-bg, #f3f4f6)',
                        color: 'var(--site-fg, #000000)',
                      }}
                    >
                      {JSON.stringify(inheritedConfig, null, 2)}
                    </pre>
                    <div className="mt-4">
                      <Button
                        variant="primary"
                        size="small"
                        onClick={handleCreateCustomConfig}
                      >
                        Create Custom Config for This Domain
                      </Button>
                    </div>
                  </>
                ) : (
                  <div
                    className="rounded p-4"
                    style={{
                      backgroundColor: 'var(--warning, #fef3c7)',
                      color: 'var(--site-fg, #000000)',
                    }}
                  >
                    <p className="text-sm">
                      <strong>No inherited configuration found.</strong> No
                      parent domain has a config. System defaults will be used.
                      You can create a custom configuration below.
                    </p>
                    <div className="mt-4">
                      <Button
                        variant="primary"
                        size="small"
                        onClick={handleCreateCustomConfig}
                      >
                        Create Custom Config for This Domain
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {config ? 'Edit Custom Config' : 'Create Custom Config'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {renderPermissionSection(
                  'onInitialize',
                  'On Initialize',
                  'Permissions granted when user first joins the domain',
                )}

                {renderPermissionSection(
                  'onDiscComplete',
                  'On DISC Complete',
                  'Permissions granted after user completes DISC assessment',
                )}

                {renderPermissionSection(
                  'onBasicTrainingComplete',
                  'On Basic Training Complete',
                  'Permissions granted after completing basic R3 training',
                )}

                {renderPermissionSection(
                  'onAdvTrainingComplete',
                  'On Advanced Training Complete',
                  'Permissions granted after completing advanced R3 training',
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              variant="shadow"
              size="small"
              disabled={!hasChanges || updateMutation.isPending}
              onClick={handleSave}
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>

            {config && (
              <Button
                variant="danger"
                size="small"
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleteMutation.isPending}
              >
                Delete Config
              </Button>
            )}
          </div>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            title="Delete Configuration"
            description="This will remove the custom R3 permissions configuration for this domain."
            destructiveLabel="Delete"
            closeLabel="Cancel"
            action={{
              onClick: handleDelete,
              disabled: deleteMutation.isPending,
            }}
          >
            <div className="space-y-4">
              <p>
                Are you sure you want to delete this configuration? The domain
                will inherit R3 permissions from its parent domain instead.
              </p>

              {/* Show what will be inherited */}
              {parentTeam && inheritedConfig ? (
                <div>
                  <p className="mb-2 text-sm font-semibold">
                    Will inherit from {parentTeam.teamName} (#
                    {parentTeam.teamID}):
                  </p>
                  <pre
                    className="max-h-64 overflow-auto rounded p-4 text-xs"
                    style={{
                      backgroundColor: 'var(--site-bg, #f3f4f6)',
                      color: 'var(--site-fg, #000000)',
                    }}
                  >
                    {JSON.stringify(inheritedConfig, null, 2)}
                  </pre>
                </div>
              ) : (
                <div
                  className="rounded p-3 text-sm"
                  style={{
                    backgroundColor: 'var(--warning, #fef3c7)',
                    color: 'var(--site-fg, #000000)',
                  }}
                >
                  <strong>Warning:</strong> No parent configuration found.
                  System defaults will be used.
                </div>
              )}

              <p className="text-sm text-gray-600">
                This action cannot be undone, but you can always create a new
                configuration later.
              </p>
            </div>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
