import type { SearchSectionData } from '@domain/schemas'
import type { SearchSection as SearchSectionType } from '@domain/configs'
import type { DomainUI } from '@spacedock/manifest'
import { useMatchingAttachment } from '../../hooks/useMatchingAttachment'
import { Icon } from '@falcon/icons'

export interface SearchMockDataProps {
  section: SearchSectionType
  sectionData: SearchSectionData
  attachments?: DomainUI.Attachment[]
}

export const SearchMockData = ({
  section,
  sectionData,
  attachments,
}: SearchMockDataProps) => {
  const {
    placeholder = 'Search',
    border_radius = '8px',
    header_image_width = '1/4',
  } = sectionData

  // Get header image from attachments
  const { pathURL: headerImageUrl } = useMatchingAttachment(
    sectionData.header_image ?? 0,
    attachments,
  )

  // Map border_radius values to styles
  const borderRadiusStyle = border_radius === 'none' ? '0' : border_radius

  // Map header_image_width to Tailwind classes
  const widthClassMap = {
    '1/4': 'w-1/4',
    '1/3': 'w-1/3',
    '1/2': 'w-1/2',
    '3/4': 'w-3/4',
    full: 'w-full',
  }
  const headerWidthClass = widthClassMap[header_image_width]

  return (
    <div className="flex h-full flex-col">
      {/* Header Image - show actual image if available, otherwise show placeholder */}
      {headerImageUrl ? (
        <div className={`mb-4 flex justify-start ${headerWidthClass}`}>
          <img
            src={headerImageUrl}
            alt="Search header"
            className="max-h-48 w-auto max-w-full object-contain"
          />
        </div>
      ) : (
        <div className={`mb-4 ${headerWidthClass}`}>
          <h1 className="text-grayscale-400 dark:text-grayscale-500 text-2xl font-bold">
            Optional Header Image
          </h1>
        </div>
      )}

      {/* Search Input - disabled in edit mode */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Icon
            icon="magnify"
            className="text-grayscale-400 dark:text-grayscale-500 h-5 w-5"
          />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="focus:border-primary focus:ring-primary/20 border-grayscale-300 text-grayscale-900 dark:border-grayscale-600 dark:bg-grayscale-900 dark:text-grayscale-100 w-full border bg-white py-3 pl-10 pr-4 text-lg focus:outline-none focus:ring-2"
          style={{ borderRadius: borderRadiusStyle }}
          disabled
        />
      </div>
    </div>
  )
}
