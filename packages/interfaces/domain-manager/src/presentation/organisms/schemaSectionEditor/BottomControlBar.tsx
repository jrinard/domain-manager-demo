import { TextHeading, TextBody } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { Button } from '@falcon/buttons'
import { getAllSectionMetadata } from '@domain/schemas'
import { mergeClasses } from '@falcon/style'

interface BottomControlBarProps {
  showAddNew: boolean
  setShowAddNew: () => void
  setControlBarMode: (mode: 'sidebar' | 'bottom') => void
  configType?: 'tryyb' | 'mastery'
  // Props for edit mode
  editSectionContent?: React.ReactNode
  editSectionName?: string
  onSave?: () => void
  onRemoveSection?: () => void
  onRemoveAllSections?: () => void
}

export const BottomControlBar = ({
  showAddNew,
  setShowAddNew,
  setControlBarMode,
  configType = 'tryyb',
  editSectionContent,
  editSectionName,
  onSave,
  onRemoveSection,
  onRemoveAllSections,
}: BottomControlBarProps) => {
  const sectionMetadata = getAllSectionMetadata(configType).filter(
    (item) => !item.isLockedBecauseNeedsDevWork,
  )

  return (
    <div className="border-grayscale-600 bg-grayscale-800 fixed bottom-0 left-0 right-0 z-50 border-t px-4 py-1.5 shadow-lg max-h-[45vh] overflow-hidden">
      {showAddNew ? (
        // Show section list when in "Add New Section" mode
        <div className="mx-auto flex max-w-full items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <TextHeading size={5} className="whitespace-nowrap text-white">
              Add Section:
            </TextHeading>
            <button
              onClick={() => setControlBarMode('sidebar')}
              className="text-grayscale-400 rounded p-1 transition-colors hover:text-white"
              title="Switch to sidebar view"
            >
              <Icon icon="page-layout-sidebar-right" className="h-4 w-4" />
            </button>
          </div>
          {sectionMetadata.map((metadata) => (
            <div
              key={metadata.section_type}
              className={mergeClasses(
                'draggable-section-card',
                'grid-stack-item',
                'border-grayscale-600 bg-grayscale-700 hover:bg-grayscale-650',
                'flex cursor-move items-center gap-2 rounded-md border px-3 py-2',
                'transition-colors duration-150',
                metadata.isLockedBecauseNeedsDevWork
                  ? 'pointer-events-none cursor-not-allowed opacity-20'
                  : '',
              )}
              style={{ position: 'relative' }}
              data-section-type={metadata.section_type}
              data-default-column-span={metadata.default_column_span}
              gs-w={String(metadata.default_column_span)}
              gs-h="1"
              aria-disabled={metadata.isLockedBecauseNeedsDevWork}
            >
              <div className="grid-stack-item-content flex cursor-move items-center gap-2">
                {metadata.icon && (
                  <div className="text-primary-500 flex-shrink-0">
                    <Icon icon={metadata.icon} className="h-4 w-4" />
                  </div>
                )}
                <TextBody className="whitespace-nowrap text-sm font-medium text-white">
                  {metadata.display_name}
                </TextBody>
                <Icon
                  icon="drag-indicator"
                  className="text-grayscale-500 h-4 w-4 flex-shrink-0"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Show edit options when in "Edit Section" mode
        <div className="mx-auto flex max-w-full gap-4 overflow-x-auto pb-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TextHeading size={5} className="whitespace-nowrap text-white">
                Edit Section
              </TextHeading>
              <button
                onClick={() => setControlBarMode('sidebar')}
                className="text-grayscale-400 rounded p-1 transition-colors hover:text-white"
                title="Switch to sidebar view"
              >
                <Icon icon="page-layout-sidebar-right" className="h-4 w-4" />
              </button>
            </div>
            <Button
              variant={'ghost-primary'}
              size="small"
              onClick={setShowAddNew}
              className="whitespace-nowrap"
            >
              <Icon icon="plus" className="h-4 w-4" />
              Add New Section
            </Button>
            {onRemoveSection && (
              <Button
                variant={'shadow'}
                size="small"
                onClick={onRemoveSection}
                className="whitespace-nowrap !rounded"
              >
                <Icon icon="close" className="h-4 w-4" />
                Remove Section
              </Button>
            )}
            {onRemoveAllSections && (
              <Button
                variant={'shadow'}
                size="small"
                onClick={onRemoveAllSections}
                className="whitespace-nowrap !rounded"
              >
                <Icon icon="close" className="h-4 w-4" />
                Remove All
              </Button>
            )}
          </div>

          {/* Horizontal form fields */}
          {editSectionContent && (
            <div className="flex max-h-[35vh] h-full flex-1 gap-3 flex-wrap items-start overflow-y-auto pr-2 w-full">
              {editSectionContent}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
