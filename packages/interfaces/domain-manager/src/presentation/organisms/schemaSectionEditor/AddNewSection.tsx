import { TextHeading, TextSubHeading, TextBody } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { getAllSectionMetadata } from '@domain/schemas'
import { mergeClasses } from '@falcon/style'

interface AddNewSectionProps {
  viewMode: 'sidebar' | 'bottom'
  setViewMode: (mode: 'sidebar' | 'bottom') => void
  configType?: 'tryyb' | 'mastery'
}

export const AddNewSection = ({
  viewMode,
  setViewMode,
  configType = 'tryyb',
}: AddNewSectionProps) => {
  const sectionMetadata = getAllSectionMetadata(configType).filter(
    (item) => !item.isLockedBecauseNeedsDevWork,
  )

  return (
    <div className="border-grayscale-600 bg-grayscale-800 w-64 rounded-lg border p-3">
      <div className="mb-2 flex items-center gap-2">
        <TextHeading size={4} className="text-white">
          Add New Section
        </TextHeading>
        <div className="flex gap-1">
          <button
            onClick={() =>
              setViewMode(viewMode === 'bottom' ? 'sidebar' : 'bottom')
            }
            className={mergeClasses(
              'rounded p-1 transition-colors',
              viewMode === 'bottom'
                ? 'bg-primary-600 text-white'
                : 'text-grayscale-400 hover:bg-grayscale-700 hover:text-white',
            )}
            title="Toggle bottom control bar"
          >
            <Icon icon="page-layout-footer" className="h-4 w-4" />
          </button>
        </div>
      </div>
      <TextSubHeading className="text-label mb-4 text-sm">
        Drag and drop a section into the grid
      </TextSubHeading>

      <div className="flex flex-col gap-2" style={{ position: 'relative' }}>
        {sectionMetadata.map((metadata) => (
          <div
            key={metadata.section_type}
            className={mergeClasses(
              'draggable-section-card',
              'grid-stack-item',
              'border-grayscale-600 bg-grayscale-700 hover:bg-grayscale-650',
              'flex cursor-move items-center gap-3 rounded-md border p-3',
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
            <div className="grid-stack-item-content flex max-w-full cursor-move items-center gap-3">
              {metadata.icon && (
                <div className="text-primary-500 flex-shrink-0">
                  <Icon icon={metadata.icon} className="h-5 w-5" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <TextBody className="truncate text-sm font-medium text-white">
                  {metadata.display_name}
                </TextBody>
                <TextBody className="text-grayscale-400 truncate text-xs">
                  {metadata.description}
                </TextBody>
              </div>
              <Icon
                icon="drag-indicator"
                className="text-grayscale-500 h-5 w-5 flex-shrink-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
