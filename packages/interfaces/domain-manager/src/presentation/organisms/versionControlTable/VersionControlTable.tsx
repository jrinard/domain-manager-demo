import * as React from 'react'
import { useMemo, useState } from 'react'
import { Table } from '@falcon/table'
import {
  Timestamp,
  IconButton,
  useToast,
  ToggleGroup,
  TextHeading,
} from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { useCurrentUser } from '@spacedock/chaincode'
import { Link } from '@spacedock/navigator'
import { Button } from '@falcon/buttons'
import type { DomainUI, TytoData } from '@spacedock/manifest'
import { PublishConfigDialog } from '../publishConfigDialog'
import { usePublishConfig } from '../../../data/hooks/usePublishConfig'
//// import { useNavigate } from 'react-router-dom'

export interface LiveVersionItem {
  type: 'Main' | 'Preview' | string
  name: string
  description: string
  releaseDate?: string
  lastModified?: string
  modifiedBy: string
}

export interface VersionControlTableProps {
  isLoading: boolean
  data?: DomainUI.ListUIConfiguration[]
  canDelete?: boolean
  canEdit?: boolean
  page:
    | 'tryyb'
    | 'menu'
    | 'mastery'
    | 'images'
    | 'custom-names'
    | 'r3'
    | 'services'
  version: 'live' | 'history'
  onDelete: (configID: string) => void
  onPreview?: (configGUID: string, configName: string, deviceMode: 'desktop' | 'tablet' | 'mobile') => void
  refetch: () => void
  menuType?: TytoData.DomainProperties['menuType']
}

export const VersionControlTable = ({
  isLoading,
  data,
  canDelete,
  canEdit,
  version,
  page,
  onDelete,
  onPreview,
  refetch,
  menuType,
}: VersionControlTableProps) => {
  const currentSession = useCurrentUser()
  const onCourseURL = currentSession?.onCourseURL
  const toast = useToast()
  const [expandedRows, setExpandedRows] = React.useState<Set<number>>(new Set())
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [selectedConfigToPublish, setSelectedConfigToPublish] =
    useState<DomainUI.ListUIConfiguration | null>(null)

  const configType = page === 'menu' ? 'ocTRYYBTOPMENU' : 'ocTRYYBSTART'

  const { publishConfig, isPublishing } = usePublishConfig({
    configID: selectedConfigToPublish?.UIconfigGUID || '',
    configType,
    onSuccess: () => {
      toast.toastSuccess({
        description: 'Configuration published successfully',
      })
      refetch()
      setShowPublishDialog(false)
      setSelectedConfigToPublish(null)
    },
    onError: (err: any) => {
      const errorMessage =
        err?.message ||
        err?.technical ||
        err?.response?.data?.message ||
        'Failed to publish configuration'
      toast.toastError({
        description: errorMessage,
      })
    },
  })

  // Find the most recent draft config
  const mostRecentDraftConfig = useMemo(() => {
    if (!data) return null

    const drafts = data
      .filter((config) => config.activeStatus === 'ocDRAFT')
      .sort((a, b) => {
        const dateA = new Date(a.modifiedDate || 0).getTime()
        const dateB = new Date(b.modifiedDate || 0).getTime()
        return dateB - dateA
      })

    return drafts[0] || null
  }, [data])

  const handlePublishConfig = async () => {
    if (!selectedConfigToPublish) return
    await publishConfig()
  }

  //// const navigate = useNavigate()

  const allColumns = [
    {
      accessorKey: 'activeStatus',
      header: 'Type',
      order: 1,
      cell: ({ cell }: any) => (
        <span>{cell.getValue() === 'ocENABLED' ? 'Live' : 'Draft'}</span>
      ),
      showIn: ['live'],
    },
    {
      accessorKey: 'activeStatus',
      header: 'Status',
      order: 1,
      cell: ({ cell, row }: any) => {
        const status = cell.getValue()
        const config = row.original as DomainUI.ListUIConfiguration
        const isMostRecentDraft =
          mostRecentDraftConfig?.UIconfigGUID === config.UIconfigGUID

        if (status === 'ocDISABLED') {
          return (
            <span className="text-grayscale-400 text-sm">Previously Live</span>
          )
        }
        if (status === 'ocDRAFT') {
          return (
            <span className="text-primary text-sm">
              Draft{isMostRecentDraft ? '(Preview)' : ''}
            </span>
          )
        }
        return <span>{status}</span>
      },
      showIn: ['history'],
    },
    {
      accessorKey: 'modifiedDate',
      header: 'Last Modified',
      order: 2,
      showIn: ['history'],
      cell: ({ cell }: any) => (
        <div className="text-sm">
          <Timestamp
            date={cell.getValue()?.toString()}
            relativeTimeLanguageBehavior="never"
            showTime
            color="secondary"
          />
        </div>
      ),
    },
    {
      accessorKey: 'configName',
      header: 'Name',
      order: 2,
      showIn: ['live', 'history'],
      cell: ({ cell, row }: any) => {
        const configID = row.original.UIconfigGUID
        const name = cell.getValue() || row.original.authorNote || 'No Name'

        return (
          <div className="flex items-center gap-1">
            {configID && (
        <Link
                // // onClick={() => {
                ////   navigate(`${configID}`)
                ////   // navigate(`/team/${teamID}/tryyb/${configID}`);
                // // }}
                className="bolder text-md hover:text-primary ml-2 cursor-pointer underline"
                target="_self"
          to={`${configID}`}
          state={{ name, page, menuType }} // pass menuType so details page can read it
              >
                <TextHeading>
                  <span className="hover:text-primary">{name}</span>
                </TextHeading>
              </Link>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'configDescription',
      header: 'Description',
      order: 3,
      showIn: ['live', 'history'],
      cell: ({ cell, row }: any) => {
        const value = (cell.getValue() as string) ?? ''
        const isExpanded = expandedRows.has(row.original.id)

        return (
          <div className="flex items-center">
            <span
              className={`text-sm opacity-30 ${
                isExpanded
                  ? 'whitespace-normal'
                  : 'inline-block overflow-hidden text-ellipsis whitespace-nowrap'
              }`}
              style={{ maxWidth: isExpanded ? undefined : 200 }}
            >
              {value}
            </span>

            {value.length > 50 && (
              <button
                className="hover:text-primary ml-1 flex-shrink-0 text-sm"
                onClick={() => {
                  const newSet = new Set(expandedRows)
                  if (isExpanded) newSet.delete(row.original.id)
                  else newSet.add(row.original.id)
                  setExpandedRows(newSet)
                }}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        )
      },
    },

    {
      accessorKey: 'modifiedDate',
      header: 'Released',
      order: 4,
      showIn: ['live'],
      cell: ({ cell }: any) => (
        <Timestamp
          date={cell.getValue()?.toString()}
          relativeTimeLanguageBehavior="never"
          showTime
          color="secondary"
          size="sm"
        />
      ),
    },

    {
      accessorKey: 'moveTo',
      header: 'Move To',
      order: 5,
      showIn: ['history'],
      cell: ({ row }: any) => {
        const config = row.original as DomainUI.ListUIConfiguration

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="shadow"
              className="rounded-xl bg-black px-4 py-1.5 text-sm text-white"
              disabled={isPublishing}
              onClick={() => {
                setSelectedConfigToPublish(config)
                setShowPublishDialog(true)
              }}
            >
              Live
            </Button>
          </div>
        )
      },
    },
    {
      accessorKey: 'preview',
      header: 'Preview',
      order: 6,
      showIn: ['live', 'history'],
      cell: ({ row }: any) => {
        const config = row.original as DomainUI.ListUIConfiguration
        const configGUID = config.UIconfigGUID
        const configName = config.configName || config.authorNote || 'Unnamed'

        const handlePreview = (deviceMode: 'desktop' | 'tablet' | 'mobile') => {
          onPreview?.(configGUID, configName, deviceMode)
        }

        const options = [
          {
            value: 'desktop',
            label: (
              <IconButton
                hover="none"
                color="current"
                icon="desktop-windows"
                size="lg"
                onClick={() => handlePreview('desktop')}
              />
            ),
          },
          {
            value: 'tablet',
            label: (
              <IconButton
                hover="none"
                color="current"
                icon="tablet"
                size="lg"
                onClick={() => handlePreview('tablet')}
              />
            ),
          },
          {
            value: 'mobile',
            label: (
              <IconButton
                hover="none"
                color="current"
                icon="mobile-phone"
                size="lg"
                onClick={() => handlePreview('mobile')}
              />
            ),
          },
        ]
        return (
          <div className={onPreview ? '' : 'opacity-30'}>
            <ToggleGroup variant="shadow" options={options} />
          </div>
        )
      },
    },
    // {
    //   accessorKey: 'errorCheck',
    //   header: 'Error Check',
    //   order: 7,
    //   showIn: ['live', 'history'],
    //   cell: ({ cell, row }: any) => {
    //     return (
    //       <Badge variant="default">
    //         <Button
    //           variant="ghost-primary"
    //           className="active:bg-grayscale-700 rounded text-sm text-white"
    //           onClick={() => {
    //             //TODO Make call to error check the config
    //           }}
    //         >
    //           {row.original.errorCheckPass === 'Done' ? (
    //             <IconButton color="success" icon="success-circle" size="lg" />
    //           ) : row.original.errorCheckPass === 'Pending' ? (
    //             <IconButton color="muted" icon="dots-circle" size="lg" />
    //           ) : row.original.errorCheckPass === 'Failed' ? (
    //             <IconButton color="warn" icon="warning-circle" size="lg" />
    //           ) : null}
    //           <span className="">{row.original.errorCheckPass}</span>
    //         </Button>
    //       </Badge>
    //     )
    //   },
    // },

    {
      accessorKey: 'memberName',
      header: 'Modified By',
      order: 8,
      showIn: ['live', 'history'],
      cell: ({ cell, row }: any) => {
        return (
          <span className="text-sm">
            {row.original.modifiedBy.memberName ?? ''}
          </span>
        )
      },
    },
    {
      accessorKey: 'share',
      header: 'Share',
      order: 9,
      showIn: ['live', 'history'],
      cell: ({ cell, row }: any) => {
        if (!canEdit) return null

        const config = row.original as DomainUI.ListUIConfiguration
        const isMostRecentDraft =
          mostRecentDraftConfig?.UIconfigGUID === config.UIconfigGUID

        // Only show share for live configs or the most recent draft (Preview)
        if (version === 'history' && !isMostRecentDraft) {
          return null
        }

        const type = cell.row.original.type
        const url =
          type === 'Preview' || isMostRecentDraft
            ? `${onCourseURL}/v25/nl/#/home/preview`
            : `${onCourseURL}/v25/nl/#/home`

        const handleCopy = async () => {
          try {
            await navigator.clipboard.writeText(url)
            toast.toastSuccess({ description: `Share url copied ${url}` })
          } catch (err) {
            toast.toastError({ description: 'Share url NOT copied' })
          }
        }

        return (
          <IconButton
            color="current"
            icon="ios-share"
            size="2xl"
            onClick={handleCopy}
          />
        )
      },
    },

    {
      accessorKey: 'delete',
      header: 'Delete',
      order: 9,
      showIn: ['history'],
      cell: ({ row }: any) => {
        const config = row.original as DomainUI.ListUIConfiguration
        // Hide delete button for ocDISABLED configs (Previously Live)
        if (config.activeStatus === 'ocDISABLED') {
          return null
        }
        return canDelete ? (
          <IconButton
            color="secondary"
            icon="trash-can-outline"
            size="2xl"
            onClick={() => {
              onDelete(row?.original?.UIconfigGUID)
            }}
          />
        ) : (
          <Icon
            className="text-bg-contrast-medium hover:cursor-not-allowed"
            color="current"
            icon="cancel"
          />
        )
      },
    },
  ]

  // Filter and sort columns based on version
  const columns = allColumns
    .filter((c) => c.showIn.includes(version))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // Custom empty message for live version with primary color
  const getEmptyMessage = () => {
    if (version !== 'live' || (data && data.length > 0)) {
      return 'No results.'
    }

    // Page-specific messages
    const itemName = page === 'menu' ? 'menu' : 'layout'
    return (
      <span className="text-primary">
        There is no active {itemName} in production. Please promote one from
        Other Versions when it is ready.
      </span>
    )
  }

  const emptyMessage = getEmptyMessage()

  return (
    <>
      <Table
        isLoading={isLoading}
        data={data || []}
        columns={columns}
        emptyMessage={emptyMessage}
      />
      <PublishConfigDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        onConfirm={handlePublishConfig}
      />
    </>
  )
}

VersionControlTable.displayName = 'VersionControlTable'
